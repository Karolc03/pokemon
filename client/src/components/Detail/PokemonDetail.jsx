import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDetail } from "../../redux/actions";
import styles from "./Details.module.css";
import { Link } from "react-router-dom";

const PokemonDetail = (props) => {
  const detailPokemons = useSelector((state) => state.detailPokemons);
  const dispatch = useDispatch();
  const id = props.match.params.id;
  useEffect(() => {
    dispatch(getDetail(id));
  }, []);
  if (typeof detailPokemons === "string") {
    window.location.href = "/error";
  }
  return (
    <div className={styles.detailsContainer}>
      <div className={styles.detailsCard}>
        <h1 className={styles.h1}>{detailPokemons.name}</h1>
        <h3>name: {detailPokemons.name}</h3>
        <h3>health: {detailPokemons.health}</h3>
        <h3>attack: {detailPokemons.attack}</h3>
        <h3>defense: {detailPokemons.defense}</h3>
        <h3>speed: {detailPokemons.speed}</h3>
        <h3>height: {detailPokemons.height}</h3>
        <h3>weight: {detailPokemons.weight}</h3>
        <h3>type: {detailPokemons.types && detailPokemons.types.join(", ")}</h3>
        <button className={styles.button}>
          <Link to="/home">GO TO HOME</Link>
        </button>
      </div>
      <div className={styles.imageCard}>
        <img src={detailPokemons.img} alt={detailPokemons.name} />
      </div>
    </div>
  );
};
// && detailPokemons.types.map(t => t.type.name).join(', ')

export default PokemonDetail;
