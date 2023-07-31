import React, { useState, useEffect } from "react";
import styles from "./Filter.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getTypes,
  filterByType,
  filterByName,
  filterByAttack,
  getPokemonsByOrigin,
} from "../../redux/actions";

const Filter = () => {
  const [filterType, setFilterType] = useState("Filter by Types");
  const [filterAttack, setFilterAttack] = useState("Filter by Attack");
  const [filterOrder, setFilterOrder] = useState("Filter by Order");
  const [filterOrigin, setFilterOrigin] = useState("Filter by Origin");
  

  const dispatch = useDispatch();
  const types = useSelector((state) => state.types);

  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  function handleType(e) {
    setFilterType(e.target.value);
    dispatch(filterByType(e.target.value)); // Usa la acción "filterByType" para actualizar el estado en el store
  }

  function handleAttack(e) {
    e.preventDefault()
    setFilterAttack(e.target.value);
    dispatch(filterByAttack(e.target.value)); // Usa la acción "filterByAttack" para actualizar el estado en el store
  }

  function handleOrder(e) {
    e.preventDefault()
    setFilterOrder(e.target.value);
    dispatch(filterByName(e.target.value)); // Usa la acción "filterByOrder" para actualizar el estado en el store
  }

  function handleOrigin(e) {
    e.preventDefault()
    setFilterOrigin(e.target.value);
    dispatch(getPokemonsByOrigin(e.target.value)); 
  }

  return (
    <>
      <select
        value={filterType}
        onChange={handleType}
        className={styles.filterbarselect}
      >
        <option disabled>Filter by Types</option>
        <option value="All Types">All Types</option>
        {types.length && types.map((type) => (
            <option key={type.name} value={type.name}>
              {type.name}
            </option>
          ))}
      </select>

      <select
        value={filterAttack}
        onChange={handleAttack}
        className={styles.filterbarselect}
      >
        <option disabled>Filter by Attack</option>
        <option value="Score Upward">Score Upward</option>
        <option value="Score Down">Score Descendant</option>
      </select>

      <select
        value={filterOrder}
        onChange={handleOrder}
        className={styles.filterbarselect}
      >
        <option disabled>Filter by Order</option>
        <option value="Upward">Upward</option>
        <option value="Descendant">Descendant</option>
      </select>

      <select
        value={filterOrigin}
        onChange={handleOrigin}
        className={styles.filterbarselect}
      >
        <option disabled>Filter by Origin</option>
        <option value="pokemonAll">All Origins</option>
        <option value="pokemonApi">Filter By API</option>
        <option value="pokemonDB">Filter By DB</option>

      </select>
    </>
  );
};

export default Filter;
