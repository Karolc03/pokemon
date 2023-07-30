import React from "react";
import PokemonList from "../Pokemons/PokemonList";
import { useHistory } from "react-router-dom";
import Filter from "../Filters/Filter";

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
        <Filter/>
        <PokemonList />
        <button className={styles.buscar} onClick={handleButton}>
          Create Pokemon
        </button>
      </div>
    </div>
  );
};

export default Home;