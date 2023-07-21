import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPokemons } from "../redux/actions";
import Pokemon from "./Pokemon";
import styles from './PokemonList.module.css'; 

const PokemonList = () => {
  const pokemons = useSelector((state) => state.pokemons);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPokemons());
  }, [dispatch]);

  return (
    <div className={styles.div}>
      {pokemons.map((pokemon) => (
        <Pokemon
          key={pokemon.name} 
          name={pokemon.name}
          img={pokemon.img}
          type={pokemon.type}
        />
      ))}
    </div>
  );
};

export default PokemonList;