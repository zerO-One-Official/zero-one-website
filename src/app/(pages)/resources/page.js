import { getResources } from "@/action/resource";
import BottomGlitter from "@/components/StyledText/BottomGlitter";
import Image from "next/image";
import Link from "next/link";

const ResourcesPage = async () => {
  const resources = await getResources();

  return (
    <>
      <div className="container-70 mb-8 sm:my-8 flex">
        <div className="flex flex-col mt-10 mx-auto justify-between items-center w-full">
          <BottomGlitter text={"Club Resources"} />
          <div className=" md:mt-10 mt-20 grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-5 w-full">
            {resources?.length === 0 ? (
              <p className="flex w-full col-span-full items-center justify-center p-2 text-2xl text-red-600">
                No Resources Found
              </p>
            ) : (
              resources?.map((resource) => {
                return (
                  <Link
                    href={`resources/${resource.slug}`}
                    className="flex flex-col items-center hover:scale-105 transition-all ease-in-out duration-300 shadow-cus border border-white/5 rounded-3xl"
                    key={resource._id}
                  >
                    <div className="p-5 py-10">
                      <Image
                        src={resource.image}
                        width={200}
                        height={200}
                        alt={resource.domain}
                        className="w-32 h-auto transition-all"
                      />
                    </div>
                    <div className="text-center p-2">
                      <h2 className="text-lg font-semibold transition-all capitalize">
                        {resource.domain}
                      </h2>
                    </div>
                  </Link>
                );
              })
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default ResourcesPage;
