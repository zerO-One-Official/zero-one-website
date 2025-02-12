"use client";
import Styles from '@/components/input/StyledInput'
import Button from '../button/Button';
import { useDropzone } from "@uploadthing/react";
import { UploadButton } from '@/utils/uploadthing ';
import {
  generateClientDropzoneAccept,
  generatePermittedFileTypes,
} from "uploadthing/client";
import { useUploadThing,Uploader } from "@/utils/uploadthing";
import { Upload } from "lucide-react";


import { useState,useCallback} from "react";
import  {addResource}  from "@/action/resources"; // Adjust the path to your Server Actions

export default function 


AddResourceForm() {
  const [file, setFile] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    domains: [
      {
        title: "",
        description: "",
        image:"",
        topics: [
          {
            title: "",
            description: "",
            image: "",
            
            subtopics: [
              {
                title: "",
                description: "",
                image: "",
                resourceUrl:"",
              },
            ],
          },
        ],
      },
    ],
  });
  
  const onDrop = useCallback((acceptedFiles) => {
    setFile(acceptedFiles);
  }, []);

  // const { startUpload, routeConfig,permittedFileInfo } = useUploadThing("resoucepdf", {
  //   onClientUploadComplete: () => {
  //     const subtopicpdf = res[0].url; 
  //   startUploaded();

 

  const {startUpload, routeConfig } = useUploadThing("testUploader", {
    onClientUploadComplete: (res) => {
      console.log("UploadThing Response:", res);
      
    try {
      const titleimageurl = res[0].url; 
      // const topicimageurl = res[1].url; 

      console.log( "sp",titleimageurl);
      setFormData({
         domains: [
      {
        title: "",
        description: "",
        image: titleimageurl,
        topics: [
          {
            title: "",
            description: "",
            image: "",
            
            subtopics: [
              {
                title: "",
                description: "",
                image: "",
                resourceUrl: "",
              },
            ],
          },
        ],
      },
    ],
      })

      const result=  addResource(formData);
      console.log(  "data",formData)

      


       
      

      alert("uploaded successfully!",result.message);
      
    } catch (error) {
      console.log(error);
      
    }
    },
    onUploadError: (error) => {
      setLoading(false);
      console.error("UploadThing Error:", error);
      alert(`Upload failed: ${error.message}`);
    },
    onUploadBegin: () => {
      setLoading(true);
      console.log("Uploading started");
    },
  });
// } });

  
const { getRootProps, getInputProps } = useDropzone({
  onDrop,
  accept: { "image/*": [] }, // Accepts all image types
});


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    // Check if any domain title is empty
    if (formData.domains.some(domain => !domain.title.trim())) {
      alert("Please provide a valid title for all domains.");
      return;
    }
  
    console.log("Form Data:", JSON.stringify(formData, null, 2)); // Log the form data
    try {
      if (!file.length)
        return console.log("Please select image of domain section ");
      console.log(file)
      startUpload([file]);
     
    } catch (error) {
      console.log("Error adding resource by handlesubmit:", error);
    }
    finally {
      setLoading(false);
    }
  };
  

  const handleChange = (e, domainIndex, topicIndex, subtopicIndex) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData };

    if (subtopicIndex !== undefined) {
      updatedFormData.domains[domainIndex].topics[topicIndex].subtopics[subtopicIndex][name] = value;
    } else if (topicIndex !== undefined) {
      updatedFormData.domains[domainIndex].topics[topicIndex][name] = value;
    } else {
      updatedFormData.domains[domainIndex][name] = value;
    }

    setFormData(updatedFormData);
  };

  return (
    <>
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <useDropzone
        endpoint="testUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res);
          alert("Upload Completed");
        }}
        onUploadError={(error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
    </main>
     
    
      

      {/* <div
        {...getRootProps()}
        className={` w-28 h-[3rem] flex items-center justify-center  m-14 border-2 border-dashed border-spacing-6 border-slate-500 ${loading ? 'opacity-50' : 'cursor-pointer'} rounded-xl mx-[42%] bg-gray-600`}
      >
        <input {...getInputProps()} id="uploader" disabled={loading} />
        <label
          htmlFor="uploader"
          className="text-center pointer-events-none flex flex-col gap-4 items-center justify-center"
        >
          {files.length >1 ? (
            files[1].name
          ) : (
            <>
              Upload domain image   in PDF format maxSize:4MB
              <Upload />
            </>
          )}
        </label>
      </div>

      <div
        {...getRootProps()}
        className={`w-28 h-[3rem] flex items-center justify-center m-4 border-2 border-dashed border-spacing-6 border-slate-500 ${loading ? 'opacity-50' : 'cursor-pointer'} rounded-xl mx-[42%] bg-gray-600`}
      >
        <input {...getInputProps()} id="uploader" disabled={loading} />
        <label
          htmlFor="uploader"
          className="text-center pointer-events-none flex flex-col gap-4 items-center justify-center"
        >
          {files.length >2 ? (
            files[2].name
          ) : (
            <>
              Upload topic image in PDF format maxSize:4MB
              <Upload />
            </>
          )}
        </label>
      </div> */}


    <form
    onSubmit={handleSubmit}
    className="max-w-4xl mx-auto bg-gray-900 p-8 rounded-xl shadow-2xl space-y-8"
  >
    {formData?.domains.map((domain, domainIndex) => (
      <div
        key={domainIndex}
        className="relative p-6 z-10 bg-gray-800 shadow-lg border border-gray-700 rounded-2xl"
      >
        <h2 className="text-2xl font-bold text-gray-300 mb-4">
          Domain {domainIndex + 1}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="text"
            name="title"
            value={domain.title}
            onChange={(e) => handleChange(e, domainIndex)}
            placeholder="Domain Title"
            className="w-full p-3 border border-gray-700 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 transition-all"
            required
          />
          <input
            type="text"
            name="description"
            value={domain.description}
            onChange={(e) => handleChange(e, domainIndex)}
            placeholder="Domain Description"
            className="w-full p-3 border border-gray-700 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 transition-all"
          />
          {/* <input
            type="text"
            name="image"
            value={domain.image}
            onChange={(e) => handleChange(e, domainIndex)}
            placeholder="Domain Image URL"
            className="w-full p-3 border border-gray-700 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 transition-all"
            required
          /> */}
        </div>
  
        {/* Topics */}
        {domain.topics.map((topic, topicIndex) => (
          <div
            key={topicIndex}
            className="mt-6 p-5 border border-gray-700 rounded-lg bg-gray-800 hover:bg-gray-700 transition-all"
          >
            <h3 className="text-xl font-semibold text-gray-300 mb-3">
              Topic {topicIndex + 1}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="title"
                value={topic.title}
                onChange={(e) => handleChange(e, domainIndex, topicIndex)}
                placeholder="Topic Title"
                className="w-full p-2 border border-gray-700 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 transition-all"
                
              />
              <input
                type="text"
                name="description"
                value={topic.description}
                onChange={(e) => handleChange(e, domainIndex, topicIndex)}
                placeholder="Topic Description"
                className="w-full p-2 border border-gray-700 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 transition-all"
              />
              {/* <input
                type="text"
                name="image"
                value={topic.image}
                onChange={(e) => handleChange(e, domainIndex, topicIndex)}
                placeholder="Topic Image URL"
                className="w-full p-2 border border-gray-700 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 transition-all"
              /> */}
              {/* <input
                type="text"
                name="resourceUrl"
                value={topic.resourceUrl}
                onChange={(e) => handleChange(e, domainIndex, topicIndex)}
                placeholder="Topic Resource URL"
                className="w-full p-2 border border-gray-700 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 transition-all"
              /> */}
            </div>
  
            {/* Subtopics */}
            {topic.subtopics.map((subtopic, subtopicIndex) => (
              <div
                key={subtopicIndex}
                className="mt-4 p-4 border border-gray-700 rounded-lg bg-gray-800 hover:bg-gray-700 transition-all"
              >
                <h4 className="text-lg font-medium text-gray-400 mb-2">
                  Subtopic {subtopicIndex + 1}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="title"
                    value={subtopic.title}
                    onChange={(e) =>
                      handleChange(e, domainIndex, topicIndex, subtopicIndex)
                    }
                    placeholder="Subtopic Title"
                    className="w-full p-2 border border-gray-700 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 transition-all"
                    
                  />
                  <input
                    type="text"
                    name="description"
                    value={subtopic.description}
                    onChange={(e) =>
                      handleChange(e, domainIndex, topicIndex, subtopicIndex)
                    }
                    placeholder="Subtopic Description"
                    className="w-full p-2 border border-gray-700 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                  {/* <input
                    type="text"
                    name="image"
                    value={subtopic.image}
                    onChange={(e) =>
                      handleChange(e, domainIndex, topicIndex, subtopicIndex)
                    }
                    placeholder="Subtopic Image URL"
                    className="w-full p-2 border border-gray-700 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 transition-all"
                  /> */}
                  {/* <input
                    type="text"
                    name="resourceUrl"
                    value={subtopic.resourceUrl}
                    onChange={(e) =>
                      handleChange(e, domainIndex, topicIndex, subtopicIndex)
                    }
                    placeholder="Subtopic Resource URL"
                    className="w-full p-2 border border-gray-700 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 transition-all"
                  /> */}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    ))}
  
    {/* Submit Button */}
    <div className="text-center">
      <Button
        type="submit"
        className=" text-white px-6 py-3 rounded-lg font-semiboldl"
      >
        Add Resource
      </Button>
    </div>
  </form>
  </>
  
  
  );
} 