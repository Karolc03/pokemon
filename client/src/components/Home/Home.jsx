import React from "react";
import PokemonList from "../Pokemons/PokemonList";
import NavBar from "../NavBar/NavBar";
import styles from "./Home.module.css";
import Filter from "../Filter/Filter";

const Home = () => {
  return (
    <>
      <NavBar />

      <div className={styles.homeContainer}>
        <div className={styles.backgroundImage}></div>
        <Filter />
        <div className={styles.content}>
          <PokemonList />
        </div>
      </div>
    </>
  );
};

export default Home;
