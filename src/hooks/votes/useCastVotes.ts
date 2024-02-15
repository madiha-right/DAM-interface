import { type MutationOptions, useMutation } from "@tanstack/react-query";
import { requestPostCastVote, type CastVoteArgsType } from "@/actions/votes";
import { useToast } from "@/hooks/useToast";
import { TOAST_ERROR, TOAST_SUCCESS } from "@/utils/constants";

export const useCastVotes = (options?: MutationOptions<void, Error, CastVoteArgsType, void>) => {
  const { toast, dismiss } = useToast();

  return useMutation({
    ...options,
    mutationFn: requestPostCastVote,
    onSuccess() {
      toast(TOAST_SUCCESS);
      setTimeout(() => {
        dismiss();
      }, 3000);
    },
    onError(error) {
      console.error(error);
      toast(TOAST_ERROR);
      setTimeout(() => {
        dismiss();
      }, 3000);
    },
  });
};
