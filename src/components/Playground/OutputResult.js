"use client";
import { usePlayground } from "@/context/playground";
import { BiLoader } from "react-icons/bi";

const OutputResult = () => {
  const { output, loading, executionTime } = usePlayground();

  return (
    <div className="col-span-6 h-auto flex gap-4 overflow-hidden">
      <div className="overflow-hidden w-full flex-1 flex flex-col gap-4 p-4">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-left font-semibold text-white/40 text-xl">
            Console
          </h3>
          <span className="ml-auto inline-block text-sm text-green-400">
            {executionTime ?? null}
          </span>
        </div>
        {loading ? (
          <div className="w-full h-20 flex items-center justify-center">
            <BiLoader className="animate-spin fill-accent" size={30} />
          </div>
        ) : (
          <>
            <textarea
              readOnly
              className="overflow-auto font-semibold bg-transparent outline-none h-full resize-none text-sm"
              rows={4}
              value={output}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default OutputResult;
