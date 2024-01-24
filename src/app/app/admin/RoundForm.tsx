"use client";

import React from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { Address, parseEther, hexToSignature } from "viem";
import { useAccount, useBalance } from "wagmi";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePermit } from "@/hooks/tx/usePermit";
import { useOperateDamWithPermit } from "@/hooks/tx/useOperateDam";
import { CONTRACT_ADDRESSES, DEADLINE } from "@/utils/constants";
import { getDeadline, daysToSeconds } from "@/utils/times";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Separator } from "@/components/ui/Seperator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { Slider } from "@/components/ui/Slider";
import Spinner from "@/components/ui/Spinner";

interface IProps {}

const formSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .max(50, { message: "Name should be less than 50 characters" }),
  period: z.preprocess(
    (val) => Number(val),
    z.number().min(1).max(500, { message: "Epoch length is too long" }),
  ),
  reinvestmentRatio: z.number().array().min(0).max(10000), // expressed in bp
  autoStreamRatio: z.number().array().min(0).max(10000), // expressed in bp
  depositAmount: z.preprocess(
    (val) => Number(val),
    z.number().min(0.1, { message: "Deposit amount is required" }),
  ),
});

/**
 * TODO:
 * 4. permit and operate dam in one action useSignMessage
 * 5. fix vercel deployment
 * 6. save name to database
 */
const deadline = getDeadline(DEADLINE);

const RoundForm: React.FC<IProps> = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      period: 30,
      reinvestmentRatio: [500],
      autoStreamRatio: [5000],
      depositAmount: 0,
    },
  });
  const depositAmount = form.watch("depositAmount");

  const account = useAccount();
  const balance = useBalance({
    address: account?.address,
    token: CONTRACT_ADDRESSES.mockYbToken, // TODO: change to mETH
  });

  const approval = usePermit({
    owner: account?.address as Address,
    spender: CONTRACT_ADDRESSES.protocol.dam,
    token: CONTRACT_ADDRESSES.mockYbToken,
    amount: parseEther(depositAmount.toString()),
    deadline,
  });

  const damOperationWithPermit = useOperateDamWithPermit();

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (!balance.data) {
      form.setError("depositAmount", { message: "Please connect wallet first" });
      return;
    }

    const amount = parseEther(values.depositAmount.toString());

    if (amount > balance.data.value) {
      form.setError("depositAmount", {
        message: "Don't have enough mETH",
      });
    }

    const { v, r, s } = hexToSignature(approval.data as Address);

    damOperationWithPermit.write?.({
      args: [
        amount,
        BigInt(daysToSeconds(values.period)),
        BigInt(values.reinvestmentRatio[0]),
        BigInt(values.autoStreamRatio[0]),
        deadline,
        v,
        r,
        s,
      ],
    });
  };

  const handleClickApprove = () => {
    approval.write();
  };

  const isApprovalDisabled = () => {
    return (
      !form.getValues("depositAmount") ||
      !!form.formState.errors.depositAmount ||
      !account?.address ||
      approval.isLoading ||
      approval.isSuccess
    );
  };

  const isStartRoundDisabled = () => {
    return (
      !depositAmount ||
      !!form.formState.errors.depositAmount ||
      !!form.formState.errors.period ||
      !!form.formState.errors.name ||
      damOperationWithPermit.isLoading
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mx-auto w-full max-w-[673px]">
        <h2 className="text-xl font-semibold leading-[28px]">Settings</h2>
        <Separator className="my-[16px]" />
        <fieldset className="flex flex-col space-y-[34px] pb-[16px]">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="space-y-[11px]">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Name of the grant program"
                    {...field}
                    className="rounded-sm"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="period"
            render={({ field }) => (
              <FormItem className="space-y-[11px]">
                <FormLabel>Epoch length</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Epoch length in days" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="reinvestmentRatio"
            render={({ field }) => (
              <FormItem className="space-y-[10px]">
                <FormLabel>Reinvestment Ratio</FormLabel>
                <FormControl>
                  <>
                    <div className="flex items-center">
                      <Input
                        type="number"
                        value={field.value[0] / 100}
                        readOnly
                        className="w-[48px] py-[8px] text-center"
                      />
                      <span className="mx-[5px] inline-block text-sm">:</span>
                      <Input
                        type="number"
                        value={100 - field.value[0] / 100}
                        readOnly
                        className="w-[48px] py-[8px] text-center"
                      />
                      <span className="ml-[25px] text-xs font-medium">Reinvestment : DAM</span>
                    </div>
                    <Slider
                      step={100}
                      min={0}
                      max={10000}
                      onValueChange={field.onChange}
                      value={field.value}
                    />
                  </>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="autoStreamRatio"
            render={({ field }) => (
              <FormItem className="space-y-[10px]">
                <FormLabel>{"Auto <> Community Ratio"}</FormLabel>
                <FormControl>
                  <>
                    <div className="flex items-center">
                      <Input
                        type="number"
                        value={field.value[0] / 100}
                        readOnly
                        className="w-[48px] py-[8px] text-center"
                      />
                      <span className="mx-[5px] inline-block text-sm">:</span>
                      <Input
                        type="number"
                        value={100 - field.value[0] / 100}
                        readOnly
                        className="w-[48px] py-[8px] text-center"
                      />
                      <span className="ml-[25px] text-xs font-medium">Auto : Community</span>
                    </div>
                    <Slider
                      step={100}
                      min={0}
                      max={10000}
                      onValueChange={field.onChange}
                      value={field.value}
                    />
                  </>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="depositAmount"
            render={({ field }) => (
              <FormItem className="space-y-[11px]">
                <FormLabel>Deposit amount</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Deposit amount in $mETH" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </fieldset>
        <Separator className="my-[18px]" />
        <div className="flex w-full items-center justify-between">
          <Button type="button" disabled={isApprovalDisabled()} onClick={handleClickApprove}>
            {approval.isLoading && <Spinner className="mr-[6px]" />}
            Approve mETH
          </Button>
          <Button
            type="submit"
            className="bg-mantle-teal hover:bg-mantle-pale"
            disabled={isStartRoundDisabled()}
          >
            {damOperationWithPermit.isLoading && <Spinner className="mr-[6px]" />}
            Start Round
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default RoundForm;
