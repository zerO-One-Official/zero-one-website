import Footer from '@/components/footer/Footer'
import Navbar from '@/components/navbar/Navbar'
import SocialsBar from '@/components/socialsbar/SocialsBar'
import '@/styles/globals.css'
import { Overpass, Poppins } from 'next/font/google'

const overpass = Overpass({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800', '900'] })
const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800', '900'] })

export const metadata = {
  title: 'Zero-one Coding Club',
  description: 'Zero-one Coding Club of Motihari College of Engineering, Motihari',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${overpass.className} ${poppins.className}`}>
        <Navbar />
        <SocialsBar />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
