import Skeleton from "@/components/skeleton/skeleton";

const loading = () => {
  return (
    <>
      <div className="container-70 min-h-screen pt-10 flex flex-col">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between mb-6 gap-2">
            <Skeleton className={"w-full h-14"} />
            <Skeleton className={"w-full h-14"} />
            <Skeleton className={"w-full h-14"} />
          </div>

          <Skeleton className="w-full h-96"></Skeleton>
        </div>
      </div>
    </>
  );
};

export default loading;
