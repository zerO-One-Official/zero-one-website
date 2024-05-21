"use client"
import Link from 'next/link';
import BottomGlitter from '../StyledText/BottomGlitter';
import Styles from './Footer.module.css';
import Logo from '../logo/Logo';
import { usePathname } from 'next/navigation';
import { HiOutlineEnvelope } from "react-icons/hi2";
import { IoSchoolOutline } from 'react-icons/io5';
import { FiMapPin } from "react-icons/fi";
function Footer() {
  const pathname = usePathname();
  return (
    (pathname === '/login' || pathname === '/recoverPassword' || pathname.startsWith('/setPassword')) ?
      null
      :
      <footer className={`${Styles.footer} container-70 `}>
        <div className="">
          <BottomGlitter text="Get In Touch" />
        </div>

        <div className={Styles.linksContainer}>
          <div className="flex-2 md:flex-1">
            <div className="mb-3 flex flex-col">
              <h3 className="text-2xl">Write</h3>
              <h4 className="text-lg font-extralight">
                <a href="mailto:info@zeroonemce.com" className='flex items-center'>
                  <HiOutlineEnvelope className='w-4 h-4 mr-2' />
                  info@zeroonemce.com
                </a>
              </h4>
            </div>
            <div className="my-3 flex flex-col">
              <h3 className="text-2xl">Meet</h3>
              <h4 className="text-lg font-extralight space-y-2" >
                <a href="https://www.mcemotihari.ac.in/" target='_blank' rel="noreferrer" className='hover:underline flex items-center'>
                  <IoSchoolOutline className='w-4 h-4 mr-2' />
                  Motihari College of Engineering
                </a>
                <p className='flex'>
                  <FiMapPin className='w-4 h-4 mr-2 translate-y-1' />
                  Motihari-845401 <br />
                  Bihar, India
                </p>
              </h4>
            </div>
          </div>
          <div className="flex-4 md:flex-1 md:mx-4 sm:mx-0 sm:mt-8">
            <h3 className="text-2xl">Other Pages</h3>
            <Link href="/" className="pl-1 block text-lg my-1 font-extralight">
              Home
            </Link>
            <Link href="/about" className="pl-1 block text-lg my-1 font-extralight">
              About
            </Link>
            <Link href="/gallery" className="pl-1 block text-lg my-1 font-extralight">
              Gallery
            </Link>
            <Link href="/teams" className="pl-1 block text-lg my-1 font-extralight">
              Teams
            </Link>
            <Link href="/resources" className="pl-1 block text-lg my-1 font-extralight">
              Resources
            </Link>
          </div>
          <div className="flex-4 md:flex-1 sm:mt-8">
            <h3 className="text-2xl">Get Help</h3>
            <Link href="/faqs" className="block pl-1 text-lg my-1 font-extralight">
              FAQs
            </Link>
            <Link href="/contact" className="pl-1 block text-lg my-1 font-extralight">
              Contact Us
            </Link>
          </div>
        </div>
        <div className="">
          <Logo />
        </div>
      </footer >
  );
}

export default Footer;
