import dbConnect from "@/lib/dbConnect";
import Faq from "@/models/Faqs";

dbConnect();

export const getFaqs = async ()=>{
    try {

        const faqs = await Faq.find({});
        return faqs;

    } catch (error) {
        console.log(error)
        return []
    }
}