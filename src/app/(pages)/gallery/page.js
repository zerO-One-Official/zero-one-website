import { getGallery } from "@/action/gallery";
import BottomGlitter from "@/components/StyledText/BottomGlitter";
import { GalleryImages } from "@/components/gallery/gallery";



const GalleryPage = async () => {
  const gallery = await getGallery() || [];

  const groupedGallery = {};

  gallery.forEach(gal => {
    if (!groupedGallery[gal.eventName]) {
      groupedGallery[gal.eventName] = []
    }
    groupedGallery[gal.eventName].push(gal);
  })

  const groupedGal = Object.values(groupedGallery)

  return (
    <>
      <div className="mt-10 mb-8 sm:my-8 px-20 2xl:px-10 xl:px-8 sm:px-6 xs:px-3">
        <div className="flex flex-col justify-between items-center">
          <BottomGlitter text="Our Gallery" />
          {/* <AnimatedScrollButton scrollTo="scrolled-to" /> */}
        </div>
        <div id="scrolled-to" className="min-h-screen pt-10">
          {
            groupedGal.map((group, index) => {
              return <div key={index} className="flex flex-col">
                <h2 className="font-semibold text-2xl">{group[0].eventName}</h2>
                <GalleryImages gallery={JSON.stringify(group)} />
              </div>
            })
          }
        </div>
      </div>
    </>
  );
};

export default GalleryPage;
