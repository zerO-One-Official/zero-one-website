import Skeleton from "@/components/skeleton/skeleton";
const loading = () => {
  return (
    <>
      <div className="container-70 flex flex-col gap-4 min-h-[calc(100vh-88px)] pt-16">
        <section className="flex flex-col w-full items-center gap-6 border border-white/5 shadow-cus shadow-black p-6 rounded-3xl relative">
          <div className="flex w-full md:gap-6 gap-10 items-center sm:flex-col">
            <div className="p-2 shrink-0">
              <Skeleton className={`w-40 h-40 rounded-full`} />
            </div>
            <div className="p-4 space-y-2 ">
              <Skeleton className="w-80 h-10" />
              <Skeleton className="w-96 h-6" />
              <Skeleton className="w-28 h-6" />
            </div>
          </div>

          <div className="w-full flex flex-col mt-16 gap-16">
            <div className="flex flex-col gap-6 border border-white/5 shadow-cus shadow-black p-6 rounded-3xl">
              <div className="flex flex-row lg:flex-col gap-2 items-center justify-center w-full">
                <Skeleton className={"flex-1 h-16"} />
              </div>
              <div className="flex flex-row lg:flex-col gap-2 items-center justify-center w-full">
                <Skeleton className={"flex-1 h-16"} />
              </div>
              <div className="flex flex-row lg:flex-col gap-2 items-center justify-center w-full">
                <Skeleton className={"flex-1 h-16"} />
                <Skeleton className={"flex-1 h-16"} />
              </div>
              <div className="flex flex-row lg:flex-col gap-2 items-center justify-center w-full">
                <Skeleton className={"flex-1 h-16"} />
                <Skeleton className={"flex-1 h-16"} />
              </div>
            </div>
            <div className="flex flex-col gap-6 border border-white/5 shadow-cus shadow-black p-6 rounded-3xl">
              <div className="flex flex-row lg:flex-col gap-2 items-center justify-center w-full">
                <Skeleton className={"flex-1 h-16"} />
              </div>
              <div className="flex flex-row lg:flex-col gap-2 items-center justify-center w-full">
                <Skeleton className={"flex-1 h-16"} />
                <Skeleton className={"flex-1 h-16"} />
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default loading;
