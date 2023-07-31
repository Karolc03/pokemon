import React from "react";
import styles from './NotFound.module.css';
import { useHistory } from "react-router-dom";

const NotFound = () => {
    const history = useHistory();
  const handleButton = () => {
    history.push("/home");
  };
  return (
    
    <div className={styles.container}>
      <h1 className={styles.message}>404 - Not Found</h1>
      <p className={styles.message}>Sorry, the page you are looking for was not found..</p>
      <button onClick={handleButton}>GO TO HOME </button>
    </div>
    
  );
};

export default NotFound;