import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { CgClose } from 'react-icons/cg';
import Link from 'next/link';
import styles from './Hamburger.module.css';
import Button from '../button/Button';
import Logo from '../logo/Logo';

const SpanStyle = {
  zIndex: 1,
  color: 'inherit',
  transition: 'all 300ms ease-in-out',
};

function Sidebar({ isMounted, unmount }) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const documentWidthRef = useRef(null);

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
        <Link href="/contest" className={styles.navLink} onClick={unmount}>
          Contest
        </Link>
        <Link href="/resources" className={styles.navLink} onClick={unmount}>
          Resources
        </Link>
        <Link href={'/signup'} className='mt-10' onClick={unmount}>
          <Button
            style={{ border: 'none' }}
            className="bg-primary-light text-primary hover:text-primary-light xs:!py-3"
          >
            <span style={SpanStyle}>Join Us</span>
          </Button>
        </Link>
      </div>
    </section>,
    document.getElementById('overlay'),
  );
}
export default Sidebar;
