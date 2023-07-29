import React from "react";
import SearchBar from "../SearchBar/SearchBar";
import PokemonList from "../Pokemons/PokemonList";
import { useHistory } from "react-router-dom";

import styles from "./Home.module.css";

const Home = () => {
  const history = useHistory();
  const handleButton = () => {
    history.push("/form");
  };

  return (
    <div className={styles.homeContainer}>
      <div className={styles.backgroundImage}></div>
      <div className={styles.content}>
        <SearchBar />
        <PokemonList />
        <button className={styles.buscar} onClick={handleButton}>
          Create Pokemon
        </button>
      </div>
    </div>
  );
};

export default Home;