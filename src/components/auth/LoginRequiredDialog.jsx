"use client";

import * as Dialog from "@radix-ui/react-dialog";
import Link from "next/link";
import { LogIn, UserRoundPlus, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LoginRequiredDialog({
  open,
  onOpenChange,
  callbackUrl,
}) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[100] bg-black/80" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-[100] w-[min(92vw,30rem)] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-3xl border border-white/10 bg-background text-foreground shadow-2xl focus:outline-none">
          <div className="bg-gradient-to-br from-accent/15 via-background to-background p-6 sm:p-7">
            <div className="flex items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-accent/20 bg-accent/10 text-accent">
                <LogIn aria-hidden="true" className="h-6 w-6" />
              </span>
              <div className="min-w-0 pt-0.5">
                <Dialog.Title className="text-xl font-semibold tracking-tight sm:text-2xl">
                  Sign in to continue
                </Dialog.Title>
                <Dialog.Description className="mt-2 text-sm leading-6 text-foreground/70">
                  Sign in to run code and check quiz answers.
                </Dialog.Description>
              </div>
            </div>
            <div className="mt-6 flex gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <UserRoundPlus
                aria-hidden="true"
                className="mt-0.5 h-5 w-5 shrink-0 text-accent"
              />
              <div>
                <p className="text-sm font-semibold">New to the club?</p>
                <p className="mt-1 text-sm leading-6 text-foreground/70">
                  Ask your club lead to register you as a club member, then
                  come back to sign in.
                </p>
              </div>
            </div>
          </div>
          <Dialog.Close
            aria-label="Close sign-in dialog"
            className="absolute right-3 top-3 rounded-full p-2 text-foreground/70 transition-colors hover:bg-white/10 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <X className="h-4 w-4" />
          </Dialog.Close>
          <div className="flex justify-end gap-3 border-t border-white/10 px-6 py-4 sm:px-7">
            <Dialog.Close asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </Dialog.Close>
            <Button asChild>
              <Link href={`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`}>
                <LogIn aria-hidden="true" />
                Sign in
              </Link>
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
