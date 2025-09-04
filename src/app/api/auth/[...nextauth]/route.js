import connect from "@/utils/dbConnect";
import NextAuth from "next-auth";
import { options } from "./options";

connect();

const handler = NextAuth(options);

export { handler as GET, handler as POST };
