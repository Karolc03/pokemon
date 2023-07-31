import React from "react";
import PokemonList from "../Pokemons/PokemonList";
import Filter from "../Filters/Filter";
import NavBar from "../NavBar/NavBar";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <>      
      <NavBar />
      <div className={styles.homeContainer}>
        <div className={styles.backgroundImage}></div>
        <div className={styles.content}>
          <Filter />
          <PokemonList />
        </div>
      </div>
    </>
  );
};

export default Home;
