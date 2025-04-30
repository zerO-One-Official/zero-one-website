import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import SocialsBar from "@/components/socialsbar/SocialsBar";
import "@/styles/globals.css";
import Providers from "./Providers";
import { Toaster } from "react-hot-toast";
import dbConnect from "@/lib/dbConnect";
import NextTopLoader from "nextjs-toploader";

export const metadata = {
  title: "ZERO ONE",
  description:
    "Zero-one Coding Club of Motihari College of Engineering, Motihari",
};

export default async function RootLayout({ children }) {
  await dbConnect();
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <NextTopLoader
          color="#f33"
          zIndex={100}
          height={5}
          showSpinner={false}
        />
        <Providers>
          <Navbar />
          <SocialsBar />
          {children}
          <Footer />
        </Providers>
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "var(--background)",
              color: "#fff",
              border: "1px solid rgba(255,255,255,0.25)",
              borderRadius: "10px",
            },

            success: {
              style: {
                borderColor: "rgba(10,255,50,0.25)",
              },
            },
            error: {
              style: {
                borderColor: "rgba(255,10,50,0.25)",
              },
            },
          }}
        />
      </body>
    </html>
  );
}
