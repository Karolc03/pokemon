import React from "react";
import { Link } from "react-router-dom";
import styles from './Landing.module.css';

const Landing = () => {
  return (
    <div className={styles.bodyContainer}>
      <div className={styles.content}>
        <h1 className={styles.heading}>BIENVENIDO</h1>
        <h1 className={styles.homeLink}>
          <Link to="/home" className={styles.buttonLink}>Home</Link>
        </h1>
      </div>
    </div>
  );
};

export default Landing;
