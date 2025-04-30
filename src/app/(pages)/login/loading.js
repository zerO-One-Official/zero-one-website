import Skeleton from "@/components/skeleton/skeleton";

const loading = () => {
  return (
    <>
      <section className="container-70 grid place-items-center h-[calc(100vh-88px)] ">
        <Skeleton className="w-4/5 md:w-ful h-[515px]" />
      </section>
    </>
  );
};

export default loading;
