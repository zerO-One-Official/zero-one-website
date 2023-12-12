"use client"
import { useCallback } from 'react';
import styles from './LandingPage.module.css';
import Link from 'next/link';

function LandingPage() {

  const Heading = useCallback(
    ({ link, text }) => {
      return (
        <h1>
          <Link href={`#${link}`} className='cursor-default'>
            {text}
          </Link>
        </h1>
      );
    },
    []
  );

  return (
    <section className='relative h-[81vh] bg-container-70 flex items-center justify-center' >
      <div className={styles.content}>
        <Heading text="Create." link={'create'} />
        <Heading text="Code." link={'code'} />
        <Heading text="Conquer." link={'conquer'} />
      </div>
    </section>
  );
}

export default LandingPage;
