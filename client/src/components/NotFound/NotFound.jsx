import React from "react";
import styles from "./NotFound.module.css";
import { Link } from "react-router-dom";

const NotFound = () => {
return(
  < >
  <div className={styles.container} >
  <Link className={styles.home} to="/home"> GO TO HOME </Link>
       <h1 className={styles.message}>404 - Not Found</h1>
       <p className={styles.message}>
         Sorry, the page you are looking for was not found..
       </p>
       </div>
  </>
)
};

export default NotFound;
