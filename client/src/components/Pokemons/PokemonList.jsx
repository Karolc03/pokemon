import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPokemons } from "../../redux/actions";
import Pokemon from "../Pokemon/Pokemon";
import styles from "./PokemonList.module.css";
import Paginacion from "../Paginacion/Paginacion";

const PokemonList = () => {
  const pokemons = useSelector((state) => state.pokemons);
  const dispatch = useDispatch();
  const [maximo, setMaximo] = useState(0);
  const [pagina, setPagina] = useState(1);
  const porPagina = 12;

  useEffect(() => {
    dispatch(getPokemons());
  }, [dispatch]);

  useEffect(() => {
    setMaximo(Math.ceil(pokemons.length / porPagina));
    setPagina(1);
  }, [pokemons]);

  if (typeof pokemons === "string") return <div className={styles.contenedor}> {pokemons}</div>;
  return (
    <>
      <div className={styles.contenedor}>
        {!pokemons.length ? (
          <></>
        ) : (
          pokemons
            .slice(
              (pagina - 1) * porPagina,
              (pagina - 1) * porPagina + porPagina
            )
            .map((pokemon) => (
              <Pokemon
                id={pokemon.id}
                key={pokemon.name}
                name={pokemon.name}
                img={pokemon.img}
                types={pokemon.types}
              />
            ))
        )}
      </div>
      <Paginacion pagina={pagina} setPagina={setPagina} maximo={maximo} />
    </>
  );
};

export default PokemonList;
