"use client"

import React, { useEffect, useRef, useState } from 'react';
import { HiMenuAlt4 } from 'react-icons/hi';
import Link from 'next/link';
import styles from './Navbar.module.css';
import Logo from '../logo/Logo';
import Sidebar from './Sidebar';
import LoginBtn from '../button/LoginBtn';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';


function Navbar() {


  const [isOpen, setIsOpen] = useState(false);
  const { data } = useSession();


  const navRef = useRef();

  const [prevScrollY, setPrevScrollY] = useState(0);

  useEffect(() => setPrevScrollY(window.scrollY), [])


  useEffect(() => {
    const handleScroll = () => {
      const scrolledDown = window.scrollY > prevScrollY;
      const scrolledUp = window.scrollY < prevScrollY;

      if (window.scrollY > 200) {
        navRef.current.classList.add('bg-primary');
        navRef.current.classList.add('shadow');
        navRef.current.classList.add('shadow-primary');
      }
      else {
        navRef.current.classList.remove('bg-primary');
        navRef.current.classList.remove('shadow');
        navRef.current.classList.remove('shadow-primary');
      }

      if (Math.abs(window.scrollY - prevScrollY) > 300) {
        setPrevScrollY(window.scrollY);

        if (navRef?.current && scrolledDown || scrolledUp) {
          navRef.current.style.top = scrolledDown ? '-300px' : '0';
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollY]);

  useEffect(() => {
    // Creating a dynamic parent div for the sidebar to act as portal's root
    const div = document.createElement('div');
    div.setAttribute('id', 'overlay');
    document.querySelector('body').appendChild(div);
    return () => div.remove();
  }, []);

  // useEffect(() => {
  //   let prevScroll = window.scrollY;

  //   const handleScroll = () => {
  //     // const navList = document.getElementById('navList');
  //     const navbar = document.getElementById('navbar');
  //     // const title = document.getElementById('Title');
  //     const height = navbar.offsetHeight;

  //     const currentScrollPos = window.scrollY;
  //     if (currentScrollPos > height + 10) {
  //       navbar.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
  //       navbar.style.backgroundColor = 'var(--background)';
  //     } else {
  //       navbar.style.border = 'none';
  //     }

  //     // if (prevScroll < currentScrollPos) {
  //     //   // navList.classList.add('fade-up');
  //     //   // title.classList.add('fade-up');
  //     //   navbar.style.borderBottom = '1px solid rgba(255, 255, 255, 0.2)';
  //     //   navbar.style.backgroundColor = 'rgba(24, 30, 35, 0.45)';
  //     // } else {
  //     //   navList.classList.remove('fade-up');
  //     //   title.classList.remove('fade-up');
  //     // }

  //     prevScroll = currentScrollPos;
  //   };
  //   document.addEventListener('scroll', handleScroll);

  //   return () => document.removeEventListener('scroll', handleScroll);
  // }, []);

  return (
    <header ref={navRef} id="navbar" className={`${styles.navbar} transition-all`}>
      <Logo />
      <nav id="navList" className={styles.navbarList}>

        {
          data && data.user && data.user.role === 'admin' ?

            <a href="https://admin.zeroonemce.com" className={styles.navLink}>
              Admin
            </a>
            :
            null
        }

        <Link href="/gallery" className={styles.navLink}>
          Gallery
        </Link>
        {

          data && data.user ?
            <Link href="/events" className={styles.navLink}>
              Events
            </Link> : null
        }
        <Link href="/resources" className={styles.navLink}>
          Resources
        </Link>

        <LoginBtn />
      </nav>
      <div
        id="hamburger"
        onClick={() => setIsOpen(true)}
        className={styles.humburgerMenu}
      >
        <HiMenuAlt4 size={32} className="block" />
      </div>
      <Sidebar isMounted={isOpen} unmount={() => setIsOpen(false)} />
    </header >
  );
}
export default Navbar;
