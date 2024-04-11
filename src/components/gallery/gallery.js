"use client";

import { useState } from "react";
import { Gallery } from "react-grid-gallery";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

export const GalleryImages = ({ gallery }) => {
  const [index, setIndex] = useState(-1);
  const handleClick = (index, item) => setIndex(index);

  const images = gallery.map((img) => {
    return {
      caption: `${img.eventName}`,
      src: img.url,
      tags: [{ value: img.eventName, title: img.eventName }],
    };
  });

  return (
    <div className="mt-10 p-10">
      <Gallery
        images={images}
        onClick={handleClick}
        enableImageSelection={false}
      />
      <Lightbox
        slides={images}
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
      />
    </div>
  );
};
