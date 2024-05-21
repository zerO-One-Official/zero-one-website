"use client"
import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { CgClose } from 'react-icons/cg';
import Link from 'next/link';
import styles from './Hamburger.module.css';
import Logo from '../logo/Logo';
import { signOut, useSession } from 'next-auth/react';
import Button from '../button/Button';
import Image from 'next/image'
import { MdLogin } from 'react-icons/md';
import { usePathname } from 'next/navigation';
import { FaCircleUser } from 'react-icons/fa6';


function Sidebar({ isMounted, unmount }) {
  const path = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const documentWidthRef = useRef(null);


  const { data } = useSession();

  useEffect(() => {
    let timeoutId;
    if (isMounted && !isTransitioning) {
      setIsTransitioning(true);
      documentWidthRef.current = document.documentElement.clientWidth;
      document.documentElement.classList.add('scroll-lock');

      /*
        After locking the body scroll, the scrollbar is hidden, so we have to compensate for the extra space
        created due to no scrollbar by giving the document an extra right padding according to the extra created space
      */
      if (documentWidthRef.current !== document.documentElement.clientWidth) {
        document.documentElement.style.paddingRight = `${document.documentElement.clientWidth - documentWidthRef.current
          }px`;
      }
    } else if (!isMounted && isTransitioning) {
      timeoutId = setTimeout(() => {
        setIsTransitioning(false);
        document.documentElement.classList.remove('scroll-lock');
        document.documentElement.style.paddingRight = 0;
      }, 300);
    }

    return () => {
      clearTimeout(timeoutId);
      if (
        document.documentElement.classList.contains('scroll-lock') &&
        isTransitioning
      ) {
        document.documentElement.classList.remove('scroll-lock');
        document.documentElement.style.paddingRight = 0;
      }
    };
  }, [isMounted, isTransitioning]);

  if (!isMounted && !isTransitioning) return null;

  return createPortal(
    <section
      className={`${isTransitioning && isMounted ? styles.active : ''} ${styles.navbarWrapper
        }`.trim()}
    >
      <div className={styles.navbar}>
        <Logo />
        <div onClick={unmount} className="cursor-pointer">
          <CgClose size={32} className={styles.closeIcon} />
        </div>
      </div>


      <div id="navList" className={styles.navItems}>

        {
          data && data.user && data.user.role === 'admin' ?

            <a href="https://admin.zeroonemce.com" className={styles.navLink}>
              Admin
            </a>
            :
            null
        }

        <Link href="/gallery" className={styles.navLink} onClick={unmount}>
          Gallery
        </Link>
        {
          data && data.user ?
            <Link href="/events" className={styles.navLink} onClick={unmount}>
              Events
            </Link> : null
        }
        <Link href="/resources" className={styles.navLink} onClick={unmount}>
          Resources
        </Link>

        {/* <LoginBtn unmount={unmount} /> */}
        {

          path === '/login'
            ?
            null
            :
            data && data.user ?
              <div className="xs:w-screen w-96 p-2">

                <div className="w-full bg-primary border border-white/10 z-[100] rounded-2xl flex flex-col gap-4 items-center p-4">
                  <h3 className='font-semibold'>{data.user.email}</h3>
                  <div className="flex flex-col items-center mx-auto gap-2">
                    <div className='w-24 h-24  border border-white/10 rounded-full'>
                      {
                        data.user.profilePic ?
                          <Image src={data.user.profilePic} width={80} height={80} quality={100} alt={data.user.name} className="rounded-full w-full h-full object-cover object-center" />

                          :
                          <FaCircleUser size={100} />
                      }
                    </div>
                    <h2 className='capitalize text-lg font-bold'>Hi, {data.user.name}</h2>
                  </div>
                  <div className="flex xs:flex-col gap-1 w-full">
                    <Link
                      href={`/user/${data.user.username}`} onClick={unmount} className='flex-1 bg-white/5 p-2 py-3 flex justify-center rounded-l-md xs:rounded-md hover:bg-white/10 transition-all items-center'>Profile</Link>
                    <button onClick={signOut} className='flex-1 bg-red-500 p-2 py-3 flex justify-center rounded-r-md xs:rounded-md hover:bg-red-600 transition-all items-center'>Logout</button>
                  </div>
                </div>
              </div>
              :
              <Link
                href="/login"
                className="flex rounded-full"
                onClick={unmount}
              >
                <Button varrient={'filled'}>
                  <MdLogin className='fill-inherit' />
                  Login
                </Button>
              </Link>
        }
      </div>
    </section >,
    document.getElementById('overlay'),
  );
}
export default Sidebar;
