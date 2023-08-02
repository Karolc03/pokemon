import React from "react";
import { Link } from "react-router-dom";
import styles from './NavBar.module.css';
import SearchBar from "../SearchBar/SearchBar";



const NavBar = () => {
  return (
    <nav className={styles.navbar}>
  <div className={styles.create}>
    <Link  to="/Form">Create your pokemon</Link>
  </div>
  <img src="../client/pokemon.png" alt="logo"></img>
  <div className={styles.searchContainer}>
    <SearchBar />
  </div>
</nav>
     );
};

export default NavBar;