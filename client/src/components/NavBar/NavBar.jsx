import React from "react";
import { Link } from "react-router-dom";
import styles from './NavBar.module.css';
import SearchBar from "../SearchBar/SearchBar";


const NavBar = () => {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.navbarlist}>
      <div className={styles.searchContainer}>
        <SearchBar />
      </div>
          <li className={styles.navbaritem}>
          <Link to="/Form">Create your pokemon</Link>
        </li>

      </ul>
    </nav>
  );
};

export default NavBar;