import Skeleton from "@/components/skeleton/skeleton";

const loading = () => {
  return (
    <>
      <section className="relative container-70 flex flex-col">
        <div className=" h-[81vh] w-full flex gap-6 justify-center items-center flex-wrap md:justify-center md:w-full sm:static sm:transform-none sm:my-10 sm:px-3">
          <Skeleton className={`w-64 h-20`} />
          <Skeleton className={`w-64 h-20`} />
          <Skeleton className={`w-64 h-20`} />
        </div>
        <div className="flex flex-col gap-6">
          <Skeleton className={`w-64 h-20`} />
          <Skeleton className={"w-4/5 h-96"} />
        </div>
      </section>
    </>
  );
};

export default loading;
