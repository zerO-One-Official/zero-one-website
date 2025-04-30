"use client";
import { useRef, useState, useEffect, useMemo } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import Skeleton from "../skeleton/skeleton";
import Button from "../button/Button";

// pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@4.8.69/legacy/build/pdf.worker.min.mjs`;
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.mjs`;

const RenderPdf = ({ url, thumbnailMode = false, download = false }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [containerWidth, setContainerWidth] = useState(null);
  const containerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  // Memoize the options to prevent unnecessary reloads
  const renderOptions = useMemo(
    () => ({
      ...(thumbnailMode && {
        disableAutoFetch: true,
        disableStream: true,
        disableFontFace: true,
      }),
    }),
    [thumbnailMode]
  ); // Only recreate when these dependencies change

  // Memoize page options as well
  const pageOptions = useMemo(
    () => ({
      ...(thumbnailMode && {
        renderTextLayer: false,
        renderAnnotationLayer: false,
        scale: 1.0,
      }),
    }),
    [thumbnailMode]
  );

  // Set up resize observer for container
  useEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      const width = entries[0].contentRect.width;
      setContainerWidth(width);
    });

    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setIsLoading(false);
  };

  const onDocumentLoadError = (error) => {
    console.error("PDF load error:", error);
    setIsLoading(false);
  };

  return (
    <div
      className={`relative w-full overflow-hidden rounded-2xl pointer-events-none ${
        thumbnailMode ? "aspect-video" : ""
      }`}
      ref={containerRef}
    >
      {isLoading && !url && <Skeleton className="w-full aspect-video" />}

      {url && (
        <Document
          file={url}
          options={renderOptions}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={onDocumentLoadError}
          loading={<Skeleton className="w-full aspect-video " />}
        >
          <Page
            pageNumber={pageNumber}
            width={containerWidth}
            loading={<Skeleton className="w-full aspect-video" />}
            {...pageOptions}
          />
        </Document>
      )}

      {download && url && (
        <div className="absolute bottom-4 right-4">
          <Button onClick={() => window.open(url, "_blank")} size="sm">
            Download
          </Button>
        </div>
      )}
    </div>
  );
};

export default RenderPdf;
