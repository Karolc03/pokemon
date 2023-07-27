import React from "react";
import SearchBar from "../SearchBar/SearchBar";
import PokemonList from "../Pokemons/PokemonList";
// import styles from "./Home.module.css"

const Home = () => {
    return (
      <>
      <body >
        <SearchBar />
        <PokemonList />
        </body>
        </>
      
    );
  };

export default Home;
