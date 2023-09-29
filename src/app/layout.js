import Footer from '@/components/footer/Footer'
import Navbar from '@/components/navbar/Navbar'
import SocialsBar from '@/components/socialsbar/SocialsBar'
import '@/styles/globals.css'
import Providers from './Providers'
import { ToastBar, Toaster } from 'react-hot-toast';
export const metadata = {
  title: 'Zero-one Coding Club',
  description: 'Zero-one Coding Club of Motihari College of Engineering, Motihari',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Navbar />
          <SocialsBar />
          {children}
          <Footer />
        </Providers>
        {/* <Toaster />
        <ToastBar
          toast={t}
          style={{}} // Overwrite styles
          position="top-center" // Used to adapt the animation
        /> */}
      </body>
    </html>
  )
}
