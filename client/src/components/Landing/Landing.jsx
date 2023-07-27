import React from "react";
import { Link } from "react-router-dom";
import styles from './Landing.module.css';


const Landing = () => {
  return (
    <>
    <body className={styles.body}>
      <h1>BIENVENIDO</h1>
      <button>
      <Link to="/home">Home</Link></button>
      </body>
    </>
  );
};

export default Landing;
