"use client"
import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { CgClose } from 'react-icons/cg';
import Link from 'next/link';
import styles from './Hamburger.module.css';
import Logo from '../logo/Logo';
import LoginBtn from '../button/LoginBtn';
import { useSession } from 'next-auth/react';

const SpanStyle = {
  zIndex: 1,
  color: 'inherit',
  transition: 'all 300ms ease-in-out',
};

function Sidebar({ isMounted, unmount }) {
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
        <Link href="/events" className={styles.navLink} onClick={unmount}>
          Events
        </Link>
        {
          data && data.user ?
            <>
              {
                data.user.role === 'admin' ?
                  <Link href="/admin" className={styles.navLink} onClick={unmount}>
                    Manage
                  </Link>
                  :
                  null
              }
              <Link href="/contest" className={styles.navLink} onClick={unmount}>
                Contest
              </Link>
              <Link href="/resources" className={styles.navLink} onClick={unmount}>
                Resources
              </Link>
              <Link href="/profile" className={styles.navLink} onClick={unmount}>
                Profile
              </Link>
            </>
            :
            null

        }
        <LoginBtn unmount={unmount} />
      </div>
    </section>,
    document.getElementById('overlay'),
  );
}
export default Sidebar;
