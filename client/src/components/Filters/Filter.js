import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getTypes,
  filterByType,
  filterByOrder,
  filterByAttack,
} from "../../redux/actions";

const Filter = () => {
  const [filterType, setFilterType] = useState("All Types");
  const [filterAttack, setFilterAttack] = useState("Score Upward");
  const [filterOrder, setFilterOrder] = useState("Upward");

  const dispatch = useDispatch();
  const types = useSelector((state) => state.type);
  

  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  function handleType(e) {
    setFilterType(e.target.value);
    dispatch(filterByType(e.target.value)); // Usa la acción "filterByType" para actualizar el estado en el store
  }

  function handleAttack(e) {
    setFilterAttack(e.target.value);
    dispatch(filterByAttack(e.target.value)); // Usa la acción "filterByAttack" para actualizar el estado en el store
  }

  function handleOrder(e) {
    setFilterOrder(e.target.value);
    dispatch(filterByOrder(e.target.value)); // Usa la acción "filterByOrder" para actualizar el estado en el store
  }

  return (
    <>
      <select
        value={filterType}
        onChange={handleType}
        className="filterbar-select"
      >
        <option disabled>Filter by Types</option>
        <option value="All Types">All Types</option>
        {types.length &&
          types.map((type) => (
            <option key={type.name} value={type.name}>
              {type.name}
            </option>
          ))}
      </select>

      <select
        value={filterAttack}
        onChange={handleAttack}
        className="filterbar-select"
      >
        <option disabled>Filter by Attack</option>
        <option value="Score Upward">Score Upward</option>
        <option value="Score Down">Score Descendant</option>
      </select>

      <select
        value={filterOrder}
        onChange={handleOrder}
        className="filterbar-select"
      >
        <option disabled>Filter by Order</option>
        <option value="Upward">Upward</option>
        <option value="Descendant">Descendant</option>
      </select>
    </>
  );
};

export default Filter;

