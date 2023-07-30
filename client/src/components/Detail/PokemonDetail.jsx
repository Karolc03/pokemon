import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDetail } from "../../redux/actions";
import styles from './Details.module.css';

const PokemonDetail = (props) => {
  const detailPokemons = useSelector((state) => state.detailPokemons);
  const dispatch = useDispatch();
  const id = props.match.params.id
  useEffect(() => {
    dispatch(getDetail(id))
  }, [])

  return (
    <div className={styles.detailsContainer}>
      <div className={styles.detailsCard}>
        <h3>name: {detailPokemons.name}</h3>
        <h3>health: {detailPokemons.stats && detailPokemons.stats[0].base_stat}</h3>
        <h3>attack: {detailPokemons.stats && detailPokemons.stats[1].base_stat}</h3>
        <h3>defense: {detailPokemons.stats && detailPokemons.stats[2].base_stat}</h3>
        <h3>speed: {detailPokemons.stats && detailPokemons.stats[5].base_stat}</h3>
        <h3>height: {detailPokemons.height}</h3>
        <h3>weight: {detailPokemons.weight}</h3>
        <h3>type: {detailPokemons.types && detailPokemons.types.map(t => t.type.name).join(', ')}</h3>
      </div>
      <div className={styles.imageCard}>
        <img src={detailPokemons.sprites && detailPokemons.sprites.other.dream_world.front_default} alt={detailPokemons.name} />
      </div>
    </div>
  );
};

export default PokemonDetail;
