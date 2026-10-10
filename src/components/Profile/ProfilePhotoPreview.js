"use client";

import Image from "next/image";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";

export default function ProfilePhotoPreview({ src, alt, className, width = 160, height = 160 }) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button
          type="button"
          aria-label={`Enlarge ${alt}`}
          className="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <Image
            src={src}
            width={width}
            height={height}
            alt={alt}
            className={`${className} cursor-zoom-in`}
          />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/80" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[min(90vw,42rem)] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-black p-8 shadow-xl focus:outline-none">
          <Dialog.Title className="sr-only">{alt}</Dialog.Title>
          <Dialog.Description className="sr-only">Enlarged profile photo preview.</Dialog.Description>
          <Dialog.Close aria-label="Close enlarged profile photo" className="absolute right-3 top-3 rounded-full p-2 text-white hover:bg-white/10">
            <X className="h-5 w-5" />
          </Dialog.Close>
          <Image
            src={src}
            width={900}
            height={900}
            alt={alt}
            className="mx-auto max-h-[75vh] w-full rounded-lg object-contain"
          />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
