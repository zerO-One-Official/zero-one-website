"use client";

import { useState, useEffect } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";

export const GalleryImages = ({ gallery: gl }) => {
  const [images, setImages] = useState([]);
  const [loadedImages, setLoadedImages] = useState({});
  const [index, setIndex] = useState(-1);
  const handleClick = (index, item) => setIndex(index);

  useEffect(() => {
    const parsedGallery = JSON.parse(gl);
    setLoadedImages({});

    setImages(
      parsedGallery.map((img) => {
        return {
          caption: `${img.eventName}`,
          src: img.url,
          // tags: [{ value: img.eventName, title: img.eventName }],
        };
      })
    );
  }, [gl]);

  return (
    <div className="p-10 pl-0 grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
      {images.map((img, index) => {
        return (
          <div key={`${img.src}-${index}`} className="relative aspect-square overflow-hidden rounded-lg">
            {!loadedImages[img.src] && (
              <Skeleton className="absolute inset-0 h-full w-full rounded-lg" aria-hidden="true" />
            )}
            <Image
              src={img.src}
              width={300}
              height={300}
              alt={img.caption}
              onClick={() => handleClick(index, img)}
              onLoad={() =>
                setLoadedImages((loaded) => ({ ...loaded, [img.src]: true }))
              }
              className="h-full w-full cursor-pointer rounded-lg object-cover"
            />
          </div>
        );
      })}
      <Lightbox
        slides={images}
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
      />
    </div>
  );
};
