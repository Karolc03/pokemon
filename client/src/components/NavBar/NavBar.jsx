import React from "react";
import { Link } from "react-router-dom";
import styles from './NavBar.module.css';


const NavBar = () => {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.navbarlist}>
        <li className={styles.navbaritem}>
          <Link to="/">Landing</Link>
        </li>
        <li className={styles.navbaritem}>
          <Link to="/home">Home</Link>
        </li>
        <li className={styles.navbaritem}>
          <Link to="/Form">Create your pokemon</Link>
        </li>

      </ul>
    </nav>
  );
};

export default NavBar;