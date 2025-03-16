"use client";

import React, { useState, useEffect } from "react";

export default function Subtopic({ data }) {
  console.log("data:", data);

  const [selectedResource, setSelectedResource] = useState(null);
  const [selectedTitle, setSelectedTitle] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    // Check screen width
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex h-screen w-full bg-gray-100 dark:bg-neutral-900">
      {/* Mobile View - Show only subtopics initially */}
      {isMobile ? (
        showPreview ? (
          // PDF Preview Page
          <div className="flex flex-col items-center justify-center w-full p-5">
            <button
              onClick={() => setShowPreview(false)}
              className="mb-3 px-4 py-2 bg-gray-700 text-white rounded-lg"
            >
              Back to Topics
            </button>
            <h2 className="text-2xl font-semibold text-center mb-4 text-white">
              {selectedTitle}
            </h2>
            <div className="w-full max-w-4xl h-[500px] bg-gray-800 dark:bg-neutral-700 rounded-lg flex items-center justify-center shadow-md border">
              <iframe
                src={selectedResource}
                className="w-full h-full rounded-lg"
                title="Resource Preview"
              />
            </div>
            <a
              href={selectedResource}
              download
              className="mt-4 px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
            >
              Download Resource
            </a>
          </div>
        ) : (
          // Subtopics List Page
          <div className="w-full flex flex-col items-center p-5">
            <h2 className="text-xl font-semibold text-center mb-4 text-white">
              Resources
            </h2>
            <div className="space-y-3 w-full max-w-sm">
              {data.subtopics?.length === 0 ? (
                <p className="text-red-600 text-center">No Resources Found</p>
              ) : (
                data.subtopics?.map((item, subIdx) => (
                  <button
                    key={`${item._id}-${subIdx}`}
                    onClick={() => {
                      setSelectedResource(item.resourceUrl);
                      setSelectedTitle(item.title);
                      setShowPreview(true);
                    }}
                    className="w-full text-left p-3 bg-gray-900 text-white rounded-lg border border-gray-700 
                    hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500 transition-all"
                  >
                    {item.title}
                  </button>
                ))
              )}
            </div>
          </div>
        )
      ) : (
        // Desktop View - Sidebar + Preview Panel
        <>
          {/* Sidebar */}
          <div className="w-1/4 min-w-[270px] bg-black text-white shadow-lg  p-4 overflow-y-auto  left-0 top-0 bottom-0">
            <h2 className="text-xl font-semibold text-center mb-4">Resources</h2>
            <div className="space-y-3">
              {data.subtopics?.length === 0 ? (
                <p className="text-red-600 text-center">No Resources Found</p>
              ) : (
                data.subtopics?.map((item, subIdx) => (
                  <button
                    key={`${item._id}-${subIdx}`}
                    onClick={() => {
                      setSelectedResource(item.resourceUrl);
                      setSelectedTitle(item.title);
                    }}
                    className="w-full text-left p-3 bg-gray-900 text-white rounded-lg border border-gray-700 
                    hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500 transition-all"
                  >
                    {item.title}
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Preview Panel */}
          <div className="flex-1  flex flex-col items-center justify-center  bg-gray-900">
            {selectedResource ? (
              <>
                <h2 className="text-2xl font-semibold text-center mb-4 text-white">
                  {selectedTitle}
                </h2>
                <div className="w-full max-w-5xl h-[600px] bg-gray-800 dark:bg-neutral-700 rounded-lg flex items-center justify-center shadow-md border">
                  <iframe
                    src={selectedResource}
                    className="w-full h-full rounded-lg"
                    title="Resource Preview"
                  />
                </div>
                <a
                  href={selectedResource}
                  download
                  className="mt-4 px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
                >
                  Download Resource
                </a>
              </>
            ) : (
              <p className="text-gray-600 dark:text-gray-400">
                Select a resource to preview
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
