import React from "react";
import { Button } from "@/components/ui/Button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/Drawer";
import { Separator } from "@/components/ui/Seperator";
import { IconClose, IconExpand, IconExternalLink } from "@/components/icons";
import SiteList from "./SiteList";

interface IProps {}

const ProjectDrawer: React.FC<IProps> = () => {
  return (
    <Drawer>
      <DrawerTrigger asChild className="absolute right-[10px] top-[10px]">
        <Button variant="ghost" className="h-auto p-[6px]">
          <IconExpand />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerClose asChild>
          <Button
            variant="ghost"
            className="absolute right-[19px] top-[14px] h-[30px] w-[30px] p-[4px]"
          >
            <IconClose />
          </Button>
        </DrawerClose>
        <div className="mx-auto w-full max-w-[496px] py-[24px]">
          <DrawerHeader>
            <DrawerTitle className="mb-[8px] text-2xl">Very Kind project</DrawerTitle>
            <DrawerDescription className="mb-[15px] text-sm text-foreground">
              This is a one liner of the project
            </DrawerDescription>
            <SiteList
              twitterLink="https://twitter.com/verykindprotocol"
              websiteLink="https://verykind.io/"
            />
          </DrawerHeader>
          <Separator className="my-[15px]" />
          <div className="mb-[24px] max-h-[514px] overflow-y-scroll pb-[20px]">
            <section className="mb-[20px]">
              <h3 className="mb-[8px] text-xl font-semibold">Description</h3>
              <p className="text-xs font-medium">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est laborum.
              </p>
            </section>
            <section className="mb-[20px]">
              <h3 className="mb-[8px] text-xl font-semibold">Contribution</h3>
              <dl className="rounded-lg border border-border px-[20px] py-[8px]">
                <div className="mb-[5px] flex items-center justify-between text-sm font-medium last:mb-0">
                  <dt># of users</dt>
                  <dd className="flex items-center">
                    <span>23</span>
                    <Button asChild variant="ghost" className="ml-[8px] h-auto p-[2px]">
                      <a href="" target="_blank">
                        <IconExternalLink />
                      </a>
                    </Button>
                  </dd>
                </div>
                <div className="mb-[5px] flex items-center justify-between text-sm font-medium last:mb-0">
                  <dt># of users</dt>
                  <dd className="flex items-center">
                    <span>23</span>
                    <Button asChild variant="ghost" className="ml-[8px] h-auto p-[2px]">
                      <a href="" target="_blank">
                        <IconExternalLink />
                      </a>
                    </Button>
                  </dd>
                </div>
                <div className="mb-[5px] flex items-center justify-between text-sm font-medium last:mb-0">
                  <dt># of users</dt>
                  <dd className="flex items-center">
                    <span>23</span>
                    <Button asChild variant="ghost" className="ml-[8px] h-auto p-[2px]">
                      <a href="" target="_blank">
                        <IconExternalLink />
                      </a>
                    </Button>
                  </dd>
                </div>
                <div className="mb-[5px] flex items-center justify-between text-sm font-medium last:mb-0">
                  <dt># of users</dt>
                  <dd className="flex items-center">
                    <span>23</span>
                    <Button asChild variant="ghost" className="ml-[8px] h-auto p-[2px]">
                      <a href="" target="_blank">
                        <IconExternalLink />
                      </a>
                    </Button>
                  </dd>
                </div>
                <div className="mb-[5px] flex items-center justify-between text-sm font-medium last:mb-0">
                  <dt># of users</dt>
                  <dd className="flex items-center">
                    <span>23</span>
                    <Button asChild variant="ghost" className="ml-[8px] h-auto p-[2px]">
                      <a href="" target="_blank">
                        <IconExternalLink />
                      </a>
                    </Button>
                  </dd>
                </div>
                <div className="mb-[5px] flex items-center justify-between text-sm font-medium last:mb-0">
                  <dt># of users</dt>
                  <dd className="flex items-center">
                    <span>23</span>
                    <Button asChild variant="ghost" className="ml-[8px] h-auto p-[2px]">
                      <a href="" target="_blank">
                        <IconExternalLink />
                      </a>
                    </Button>
                  </dd>
                </div>
              </dl>
            </section>
            <section>
              <h3 className="mb-[8px] text-xl font-semibold">Metrics / Links</h3>
              <dl className="rounded-lg border border-border px-[20px] py-[8px]">
                <div className="mb-[5px] flex items-center justify-between text-sm font-medium last:mb-0">
                  <dt># of users</dt>
                  <dd className="flex items-center">
                    <span>23</span>
                    <Button asChild variant="ghost" className="ml-[8px] h-auto p-[2px]">
                      <a href="" target="_blank">
                        <IconExternalLink />
                      </a>
                    </Button>
                  </dd>
                </div>
                <div className="mb-[5px] flex items-center justify-between text-sm font-medium last:mb-0">
                  <dt># of users</dt>
                  <dd className="flex items-center">
                    <span>23</span>
                    <Button asChild variant="ghost" className="ml-[8px] h-auto p-[2px]">
                      <a href="" target="_blank">
                        <IconExternalLink />
                      </a>
                    </Button>
                  </dd>
                </div>
                <div className="mb-[5px] flex items-center justify-between text-sm font-medium last:mb-0">
                  <dt># of users</dt>
                  <dd className="flex items-center">
                    <span>23</span>
                    <Button asChild variant="ghost" className="ml-[8px] h-auto p-[2px]">
                      <a href="" target="_blank">
                        <IconExternalLink />
                      </a>
                    </Button>
                  </dd>
                </div>
                <div className="mb-[5px] flex items-center justify-between text-sm font-medium last:mb-0">
                  <dt># of users</dt>
                  <dd className="flex items-center">
                    <span>23</span>
                    <Button asChild variant="ghost" className="ml-[8px] h-auto p-[2px]">
                      <a href="" target="_blank">
                        <IconExternalLink />
                      </a>
                    </Button>
                  </dd>
                </div>
                <div className="mb-[5px] flex items-center justify-between text-sm font-medium last:mb-0">
                  <dt># of users</dt>
                  <dd className="flex items-center">
                    <span>23</span>
                    <Button asChild variant="ghost" className="ml-[8px] h-auto p-[2px]">
                      <a href="" target="_blank">
                        <IconExternalLink />
                      </a>
                    </Button>
                  </dd>
                </div>
                <div className="mb-[5px] flex items-center justify-between text-sm font-medium last:mb-0">
                  <dt># of users</dt>
                  <dd className="flex items-center">
                    <span>23</span>
                    <Button asChild variant="ghost" className="ml-[8px] h-auto p-[2px]">
                      <a href="" target="_blank">
                        <IconExternalLink />
                      </a>
                    </Button>
                  </dd>
                </div>
              </dl>
            </section>
          </div>
          <DrawerFooter className="relative w-full">
            <div className="absolute left-0 top-0 h-[36px] w-full -translate-y-full backdrop-blur-sm" />
            <Button className="h-[41px] w-full bg-mantle-teal hover:bg-mantle-pale">
              Add to Candidate List
            </Button>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default ProjectDrawer;
