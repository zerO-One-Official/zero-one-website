import Footer from '@/components/footer/Footer'
import Navbar from '@/components/navbar/Navbar'
import SocialsBar from '@/components/socialsbar/SocialsBar'
import '@/styles/globals.css'
import Providers from './Providers'
import { ToastBar, Toaster } from 'react-hot-toast';

export const metadata = {
  title: 'ZERO ONE',
  description: 'Zero-one Coding Club of Motihari College of Engineering, Motihari',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <Navbar />
          <SocialsBar />
          {children}
          <Footer />
        </Providers>
        <Toaster position='bottom-right' toastOptions={{
          style: {
            background: 'var(--background)',
            color: '#fff',
            border: '1px solid rgba(255,255,255,0.25)',
            borderRadius: '10px'
          },

          success: {
            style: {
              borderColor: 'rgba(10,255,50,0.25)',
            },
          },
          error: {
            style: {
              borderColor: 'rgba(255,10,50,0.25)',
            },
          }

        }} />
        {/* <ToastBar
          toast={t}
          style={{}} // Overwrite styles
          position="top-center" // Used to adapt the animation
        /> */}
      </body>
    </html>
  )
}
