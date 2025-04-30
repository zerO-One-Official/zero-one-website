import Skeleton from "@/components/skeleton/skeleton";

const loading = () => {
  return (
    <>
      <section className="grid gap-4 sm:gap-2">
        <Skeleton className={`mx-auto w-5/6 h-28 mt-6 mb-20`} />
        <Skeleton className={`w-full h-20`} />
        <Skeleton className={`w-full h-20`} />
        <Skeleton className={`w-full h-20`} />
        <Skeleton className={`w-full h-20`} />
      </section>
    </>
  );
};

export default loading;
