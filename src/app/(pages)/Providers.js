"use client";

import { SessionProvider } from "next-auth/react";
import { useEffect } from "react";

const Providers = ({ children }) => {
  useEffect(() => {
    let mouseX = 0;
    let mouseY = 0;

    let cursorX = 0;
    let cursorY = 0;

    const cursor = document.querySelector(".cursor");

    let speed = 1; // change to increase the ease

    function animate() {
      let distX = mouseX - cursorX;
      let distY = mouseY - cursorY;

      cursorX = cursorX + distX * speed;
      cursorY = cursorY + distY * speed;

      cursor.style.left = cursorX + "px";
      cursor.style.top = cursorY + "px";

      requestAnimationFrame(animate);
    }

    animate();

    document.addEventListener("mousemove", (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
    });

    return () =>
      document.removeEventListener("mousemove", (event) => {
        mouseX = event.clientX;
        mouseY = event.clientY;
      });
  }, []);

  return (
    <SessionProvider>
      <main id="overlayScreen">
        <div className="cursor" />
        {children}
      </main>
    </SessionProvider>
  );
};

export default Providers;
