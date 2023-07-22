import React from "react";
import styles from "./style.module.css";

const LandingContent = () => {
  return (
    <div className={styles.animationContainer}>
      <div className={styles.container}>
        <div className={styles.floatingText}>
          <img src="logodeerwalk.png" alt=""></img>Welcome to Deerwalk Foods
        </div>
      </div>
    </div>
  );
};

export default LandingContent;
