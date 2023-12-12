
import connect from "@/lib/dbConnect";
import NextAuth from "next-auth"
import { options } from "./options";


connect();


const handler = NextAuth(options)

export { handler as GET, handler as POST }

