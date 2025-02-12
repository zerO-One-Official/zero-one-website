"use client";

import { useState, useEffect } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Image from "next/image";

export const GalleryImages = ({ gallery: gl }) => {
  const [images, setImages] = useState([]);
  const [index, setIndex] = useState(-1);
  const handleClick = (index, item) => setIndex(index);

  useEffect(() => {
    const parsedGallery = JSON.parse(gl);

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
          <Image
            key={index}
            src={img.src}
            width={300}
            height={300}
            alt={img.caption}
            onClick={handleClick}
            className="w-full h-full object-cover cursor-pointer rounded-lg"
          />
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
