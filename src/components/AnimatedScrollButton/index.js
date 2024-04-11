"use client";
import styles from "./index.module.css";

function AnimatedScrollButton({ scrollTo }) {
  return (
    <div className={styles.wrapper}>
      <div
        className={styles.mouse}
        onClick={() => document.getElementById(`${scrollTo}`).scrollIntoView()}
      >
        <div className={styles.cursor} />
      </div>
      <p className="text-lg">scroll down</p>
    </div>
  );
}

export default AnimatedScrollButton;
