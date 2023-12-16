"use client"

import React, { useEffect, useState } from 'react';
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

  const pathname = usePathname();

  useEffect(() => {
    // Creating a dynamic parent div for the sidebar to act as portal's root
    const div = document.createElement('div');
    div.setAttribute('id', 'overlay');
    document.querySelector('body').appendChild(div);
    return () => div.remove();
  }, []);

  useEffect(() => {
    let prevScroll = window.scrollY;

    const handleScroll = () => {
      // const navList = document.getElementById('navList');
      const navbar = document.getElementById('navbar');
      // const title = document.getElementById('Title');
      const height = navbar.offsetHeight;

      const currentScrollPos = window.scrollY;
      if (currentScrollPos > height + 10) {
        navbar.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
        navbar.style.backgroundColor = 'var(--background)';
      } else {
        navbar.style.border = 'none';
      }

      // if (prevScroll < currentScrollPos) {
      //   // navList.classList.add('fade-up');
      //   // title.classList.add('fade-up');
      //   navbar.style.borderBottom = '1px solid rgba(255, 255, 255, 0.2)';
      //   navbar.style.backgroundColor = 'rgba(24, 30, 35, 0.45)';
      // } else {
      //   navList.classList.remove('fade-up');
      //   title.classList.remove('fade-up');
      // }

      prevScroll = currentScrollPos;
    };
    document.addEventListener('scroll', handleScroll);

    return () => document.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header id="navbar" className={`${styles.navbar}`}>
      <Logo />
      <nav id="navList" className={styles.navbarList}>
        {
          pathname === '/login' ?
            null
            :
            <Link href="/events" className={styles.navLink}>
              Events
            </Link>
        }
        {
          data && data.user ?
            <>
              {
                data.user.role === 'admin' ?
                  <Link href="/admin" className={styles.navLink}>
                    Manage
                  </Link>
                  :
                  null
              }
              <Link href="/contest" className={styles.navLink}>
                Contest
              </Link>
              <Link href="/resources" className={styles.navLink}>
                Resources
              </Link>
            </>
            :
            null

        }
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
