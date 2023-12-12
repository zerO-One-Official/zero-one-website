"use client"
import { FaInstagram, FaGithub, FaLinkedin, FaDiscord } from 'react-icons/fa';
import Styles from './SocialsBar.module.css';
import { usePathname } from 'next/navigation';

const ICON_SIZE = 30;
function SocialsBar() {

  const pathname = usePathname();

  return (
    pathname !== '/login' || pathname.includes('/admin') &&
    <section className={Styles.socialsBar}>
      <a href="#" target="_blank" rel="noreferrer">
        <FaDiscord className={Styles.socialsBarIcons} size={ICON_SIZE} />
      </a>
      <a href="#" target="_blank" rel="noreferrer">
        <FaInstagram className={Styles.socialsBarIcons} size={ICON_SIZE} />
      </a>
      <a href="https://github.com/zerO-One-Official" target="_blank" rel="noreferrer">
        <FaGithub className={Styles.socialsBarIcons} size={ICON_SIZE} />
      </a>
      <a href="https://www.linkedin.com/company/zero-one-coding-club-mce/" target="_blank" rel="noreferrer">
        <FaLinkedin className={Styles.socialsBarIcons} size={ICON_SIZE} />
      </a>
    </section>
  );
}

export default SocialsBar;
