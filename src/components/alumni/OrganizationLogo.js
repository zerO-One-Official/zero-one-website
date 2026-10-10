"use client";

import { useState } from "react";
import Image from "next/image";
import * as Dialog from "@radix-ui/react-dialog";
import { Building2, GraduationCap, X } from "lucide-react";

export default function OrganizationLogo({ src, alt, organizationType }) {
  const [failedSrc, setFailedSrc] = useState(null);
  const FallbackIcon = organizationType === "company" ? Building2 : GraduationCap;
  if (!src || failedSrc === src) {
    return (
      <span
        role="img"
        aria-label={alt}
        className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg border bg-white"
      >
        <FallbackIcon aria-hidden="true" className="h-5 w-5 text-muted-foreground" />
      </span>
    );
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button
          type="button"
          aria-label={`Enlarge ${alt}`}
          className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg border bg-white transition hover:ring-2 hover:ring-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <Image
            src={src}
            alt={alt}
            width={40}
            height={40}
            unoptimized
            className="h-full w-full object-contain"
            onError={() => setFailedSrc(src)}
          />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/80" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[min(90vw,42rem)] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-8 shadow-xl focus:outline-none">
          <Dialog.Title className="sr-only">{alt}</Dialog.Title>
          <Dialog.Description className="sr-only">Enlarged organization logo preview.</Dialog.Description>
          <Dialog.Close aria-label="Close enlarged logo" className="absolute right-3 top-3 rounded-full p-2 text-gray-700 hover:bg-gray-100">
            <X className="h-5 w-5" />
          </Dialog.Close>
          <Image
            src={src}
            alt={alt}
            width={900}
            height={900}
            unoptimized
            className="mx-auto max-h-[75vh] w-full object-contain"
            onError={() => setFailedSrc(src)}
          />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
