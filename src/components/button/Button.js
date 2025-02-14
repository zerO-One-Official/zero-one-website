"use client";
import { useEffect, useRef } from "react";
import Styles from "./Button.module.css";
import { BiLoader } from "react-icons/bi";

function Button({ className, loading, varrient, children, ...otherProps }) {
  const ref = useRef();

  useEffect(() => {
    ref.current.style.setProperty("--x", `50%`);
    ref.current.style.setProperty("--y", `50%`);
  }, []);

  const handleRipple = (e) => {
    const x = e.clientX - ref.current.getBoundingClientRect().left;
    const y = e.clientY - ref.current.getBoundingClientRect().top;

    ref.current.style.setProperty("--x", `${x}px`);
    ref.current.style.setProperty("--y", `${y}px`);
  };

  return (
    <button
      ref={ref}
      onMouseMove={(e) => handleRipple(e)}
      className={`text-lg inline-block overflow-hidden relative rounded-full px-6 py-[10px] cursor-pointer font-semibold ${
        Styles.button
      } ${className} ${
        varrient === "filled"
          ? "bg-primary-light text-primary stroke-primary fill-primary disabled:hover:text-primary disabled:hover:fill-primary disabled:hover:stroke-primary hover:text-primary-light hover:fill-primary-light hover:stroke-primary-light"
          : "text-primary-light stroke-primary-light fill-primary-light border border-white/25"
      } `}
      {...otherProps}
    >
      <div className="z-10 relative text-inherit fill-inherit stroke-inherit flex items-center justify-center gap-2">
        {loading ? (
          <span className="flex gap-1 items-center text-inherit">
            <BiLoader
              className="animate-spin fill-inherit stroke-inherit"
              size={20}
            />
            Please wait...
          </span>
        ) : (
          children
        )}
      </div>
    </button>
  );
}

export default Button;
