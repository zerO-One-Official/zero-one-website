"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Button from "../button/Button";

export default function Subtopic({ data,domain,topic }) {
  console.log("data:", data);
  const router = useRouter();
  const searchParams = useSearchParams();
  const titleFromUrl = searchParams.get("title");

  const [selectedResource, setSelectedResource] = useState(null);
  const [selectedTitle, setSelectedTitle] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (titleFromUrl) {
      const matchedItem = data.subtopics?.find((item) => item.title === titleFromUrl);
      if (matchedItem) {
        setSelectedResource(matchedItem.resourceUrl);
        setSelectedTitle(matchedItem.title);
        setShowPreview(true);
      }
    }else if (data.subtopics?.length > 0) {
      // Set default first PDF if no title is in URL
      setSelectedResource(data.subtopics[0].resourceUrl);
      setSelectedTitle(data.subtopics[0].title);
      setShowPreview(true);
    }
  }, [titleFromUrl, data.subtopics]);

  const handleClick = (item) => {
    const encodedTitle = encodeURIComponent(item.title);
    router.push(`/resources/${domain}/${topic}?title=${encodedTitle}`);

    setSelectedResource(item.resourceUrl);
    setSelectedTitle(item.title);
    setShowPreview(true);
  };

  return (
    <div className="flex h-screen w-full bg-black">
      {isMobile ? (
        showPreview ? (
          <div className="flex flex-col items-center justify-center w-full p-5">
            <Button
              onClick={() => setShowPreview(false)}
              className="mb-3 px-4 py-2 bg-oklch(0.13 0.028 261.692) text-white bordershadow-cus border border-white/5 rounded-3xl"
            >
              Back to Topics
            </Button>
            <h2 className="text-2xl font-semibold text-center mb-4 text-white ">{selectedTitle}</h2>
            <div className="w-full max-w-4xl h-[500px] bg-black rounded-lg flex items-center justify-center shadow-md border border-white">
              <iframe src={selectedResource} className="w-full h-full rounded-lg" title="Resource Preview" />
            </div>
            <a
              href={selectedResource}
              download
              className="mt-4 px-5 py-2 bg-oklch(0.13 0.028 261.692) text-white bordershadow-cus border border-white/5 rounded-3xl hover:bg-white hover:text-black transition-all"
            >
              Download Resource
            </a>
          </div>
        ) : (
          <div className="w-full flex flex-col items-center p-5">
            <h2 className="text-xl font-semibold text-center mb-4 text-white">Resources</h2>
            <div className="space-y-3 w-full max-w-sm">
              {data.subtopics?.length === 0 ? (
                <p className="text-red-600 text-center">No Resources Found</p>
              ) : (
                data.subtopics?.map((item, subIdx) => (
                  <Button
                    onClick={() => handleClick(item)}
                    key={`${item._id}-${subIdx}`}
                   className='text-center'
                  >
                    {item.title}
                  </Button>
                ))
              )}
            </div>
          </div>
        )
      ) : (
        <>
          <div className="w-1/4 min-w-[270px] bg-black text-white shadow-lg p-4 overflow-y-auto">
            <h2 className="text-xl font-semibold text-center mb-4 border-b-2 border-red-500  border-spacing-3">Resources</h2>
            <div className="space-y-3">
              {data.subtopics?.length === 0 ? (
                <p className="text-red-600 text-center">No Resources Found</p>
              ) : (
                data.subtopics?.map((item, subIdx) => (
                  <Button
                    key={`${item._id}-${subIdx}`}
                    onClick={() => handleClick(item)}
                    className="w-full text-center p-3
                   "
                  >
                    {item.title}
                  </Button>
                ))
              )}
            </div>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center bg-black">
            {selectedResource ? (
              <>
                <h2 className="text-2xl font-semibold text-center mb-4 text-white">{selectedTitle}</h2>
                <div className="w-full max-w-5xl h-[600px] bg-black rounded-lg flex items-center justify-center shadow-md border border-white">
                  <iframe src={selectedResource} className="w-full h-full rounded-lg" title="Resource Preview" />
                </div>
                <Button className="mt-4">                <a
                  href={selectedResource}
                  download
                
                >
                  Download Resource
                </a>
                </Button>

              </>
            ) : (
              <p className="text-gray-400">Select a resource to preview</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
