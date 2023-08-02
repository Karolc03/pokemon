import React from "react";
import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";
import SearchBar from "../SearchBar/SearchBar";
import image from "./logo.png";

const NavBar = () => {
  return (
    <nav className={styles.navbar}>
      <a href="/home">
        <img className={styles.img}src={image} alt="logo"></img>
      </a>
      <div className={styles.searchContainer}>
        <SearchBar />
      </div>
      <div className={styles.create}>
        <Link to="/Form">Create your pokemon</Link>
      </div>
    </nav>
  );
};

export default NavBar;
