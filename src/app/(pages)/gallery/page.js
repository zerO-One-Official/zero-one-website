import AnimatedScrollButton from "@/components/AnimatedScrollButton";
import BottomGlitter from "@/components/StyledText/BottomGlitter";
import { GalleryImages } from "@/components/gallery/gallery";

const getGallery = async () => {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/gallery`, {
      next: { revalidate: 24 * 60 * 60 },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const GalleryPage = async () => {
  const { gallery } = (await getGallery()) || { gallery: [] };

  return (
    <>
      <div className="text-center mt-10 mb-8 sm:my-8">
        <div className="flex flex-col justify-between h-[calc(100vh-100px-3rem)] items-center sm:h-[calc(90vh-100px-1rem)]">
          <BottomGlitter text="Our Gallery" />
          <AnimatedScrollButton scrollTo="scrolled-to" />
        </div>
        <div id="scrolled-to" className="min-h-screen">
          <GalleryImages className gallery={gallery} />
        </div>
      </div>
    </>
  );
};

export default GalleryPage;
