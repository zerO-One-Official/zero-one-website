import dbConnect from "@/lib/dbConnect";
import Gallery from "@/models/Gallery";

dbConnect();

export const getGallery = async () => {
    try {

        const gallery = await Gallery.find({});
        return gallery;

    } catch (error) {
        console.log(error)
        return []
    }
}