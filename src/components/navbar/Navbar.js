"use client";

import React, { useEffect, useRef, useState } from "react";
import { HiMenuAlt4 } from "react-icons/hi";
import Link from "next/link";
import styles from "./Navbar.module.css";
import Logo from "../logo/Logo";
import Sidebar from "./Sidebar";
import LoginBtn from "../button/LoginBtn";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaygroundPath, setIsPlaygroundPath] = useState(false);
  const { data } = useSession();

  const navRef = useRef();

  const [prevScrollY, setPrevScrollY] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.startsWith("/playground") && !isPlaygroundPath) {
      setIsPlaygroundPath(true);
    } else {
      setIsPlaygroundPath(false);
    }
  }, [pathname]);

  useEffect(() => setPrevScrollY(window.scrollY), []);

  useEffect(() => {
    const handleScroll = () => {
      const scrolledDown = window.scrollY > prevScrollY;
      const scrolledUp = window.scrollY < prevScrollY;

      if (window.scrollY > 10) {
        navRef.current.classList.add("bg-background");
        navRef.current.classList.add("shadow");
        navRef.current.classList.add("border-b-white/15");
      } else {
        navRef.current.classList.remove("bg-background");
        navRef.current.classList.remove("shadow");
        !isPlaygroundPath &&
          navRef.current.classList.remove("border-b-white/15");
      }

      if (Math.abs(window.scrollY - prevScrollY) > 300) {
        setPrevScrollY(window.scrollY);

        if ((navRef?.current && scrolledDown) || scrolledUp) {
          navRef.current.style.top = scrolledDown ? "-300px" : "0";
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollY]);

  useEffect(() => {
    // Creating a dynamic parent div for the sidebar to act as portal's root
    const div = document.createElement("div");
    div.setAttribute("id", "overlay");
    document.querySelector("body").appendChild(div);
    return () => div.remove();
  }, []);

  return (
    <header
      ref={navRef}
      id="navbar"
      className={`${styles.navbar} transition-all border border-transparent md:py-4 py-3 border-b-white/15`}
    >
      <Logo size={`${isPlaygroundPath ? "icon" : "default"}`} />
      <nav id="navList" className={styles.navbarList}>
        {data && data.user && data.user.role === "admin" ? (
          <a href="https://admin.zeroonemce.com" className={styles.navLink}>
            Admin
          </a>
        ) : null}

        {!isPlaygroundPath ? (
          <>
            <Link href="/gallery" className={styles.navLink}>
              Gallery
            </Link>
            <Link href="/events" className={styles.navLink}>
              Events
            </Link>
          </>
        ) : null}

        {data && data.user && !isPlaygroundPath ? (
          <>
            <Link href="/playground" className={styles.navLink}>
              Code
            </Link>
            <Link href="/resources" className={styles.navLink}>
              Resources
            </Link>
          </>
        ) : null}

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
    </header>
  );
}
export default Navbar;
