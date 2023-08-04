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

  useEffect(() => {//se ejecutará cuando el valor de pokemons cambie.
    setMaximo(Math.ceil(pokemons.length / porPagina));
    setPagina(1);
  }, [pokemons]);

  if (typeof pokemons === "string")
    return (
      <div className={styles.contenedor}>
        <h1 className={styles}>NO MATCH FOUND</h1>
        <button
          className={styles.button}
          onClick={() => window.location.reload()}
        >
          GO TO HOME
        </button>
        <img
          className={styles.img}
          alt="imagen que representa que no hay pokemon"
          src="https://media2.giphy.com/media/L95W4wv8nnb9K/giphy.gif?cid=ecf05e47roixwdnj1t8glshumc1pjfsr59ffj28dqfgknxrg&ep=v1_gifs_search&rid=giphy.gif&ct=g"
        />
      </div>
    );
  return (
    <>
      <div className={styles.Pokemon}>
        <div className={styles.contenedor}>
          {!pokemons.length ? (
            <img
              alt="imagen de loading"
              src="https://media1.giphy.com/media/yhfTY8JL1wIAE/giphy.gif?cid=ecf05e479p1v96z52alafodz7lpvmrrxnekng42bli2nnsv7&ep=v1_gifs_search&rid=giphy.gif&ct=g"
            />
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
                  attack={pokemon.attack}
                  types={pokemon.types}
                />
              ))
          )}
        </div>
      </div>
      <Paginacion pagina={pagina} setPagina={setPagina} maximo={maximo} />
    </>
  );
};

export default PokemonList;
