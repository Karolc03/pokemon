import React from "react";
import SearchBar from "./SearchBar";
import PokemonList from "./PokemonList";
import styles from "./Home.module.css"

const Home = () => {
    return (
      <>
      <body className={styles.body}>
        <SearchBar />
        <PokemonList />
        </body>
        </>
      
    );
  };

export default Home;
