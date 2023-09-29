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
    <section className={styles.video}>
      <div className={styles.content}>
        <Heading text="Design." link={'design'} />
        <Heading text="Develop." link={'develop'} />
        <Heading text="Code." link={'code'} />
      </div>
    </section>
  );
}

export default LandingPage;
