import Link from 'next/link';
import BottomGlitter from '../StyledText/BottomGlitter';
import Styles from './Footer.module.css';
import Logo from '../logo/Logo';

function Footer() {
  return (
    <footer className={`${Styles.footer} container-70 `}>
      <div className="">
        <BottomGlitter text="Get In Touch" />
      </div>

      <div className={Styles.linksContainer}>
        <div className="flex-2 md:flex-1">
          <div className="mb-3 flex flex-col">
            <h3 className="text-2xl">Write</h3>
            <h4 className="text-lg font-extralight">
              <a href="mailto:zerooneofficial.mcegmail.com">
                zerooneofficial.mce@gmail.com
              </a>
            </h4>
          </div>
          <div className="my-3 flex flex-col">
            <h3 className="text-2xl">Meet</h3>
            <h4 className="text-lg font-extralight">
              <a href="https://www.mcemotihari.ac.in/" target='_blank' rel="noreferrer" className='hover:underline'>Motihari College of Engineering</a> <br />
              Motihari-845401 <br />
              Bihar, India
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
          <Link href="/teams" className="pl-1 block text-lg my-1 font-extralight">
            Teams
          </Link>
          <Link href="/events" className="pl-1 block text-lg my-1 font-extralight">
            Events
          </Link>
        </div>
        <div className="flex-4 md:flex-1 sm:mt-8">
          <h3 className="text-2xl">Get Help</h3>
          <a
            href="#"
            className="block pl-1 text-lg my-1 font-extralight"
            target="_blank"
            rel="noreferrer"
          >
            Join Us
          </a>
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
