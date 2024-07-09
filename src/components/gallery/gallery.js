"use client";

import { useState, useEffect } from "react";
import { Gallery } from "react-grid-gallery";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

export const GalleryImages = ({ gallery: gl }) => {

  const [images, setImages] = useState([]);
  const [index, setIndex] = useState(-1);
  const handleClick = (index, item) => setIndex(index);

  useEffect(() => {
    const parsedGallery = JSON.parse(gl)

    setImages(parsedGallery.map((img) => {
      return {
        caption: `${img.eventName}`,
        src: img.url,
        // tags: [{ value: img.eventName, title: img.eventName }],
      };
    }))
  }, [gl])


  return (
    <div className="p-10">
      <Gallery
        images={images}
        onClick={handleClick}
        enableImageSelection={false}
      // thumbnailImageComponent={ImageComponent}
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
