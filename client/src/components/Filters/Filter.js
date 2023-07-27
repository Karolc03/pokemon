import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterByType,
  getTypes,
  filterByOrder,
  filterByAttack,
} from "../../redux/actions";

const filter = () => {
  const [filterType, setFilterType] = useState("filterByType");
  const [filterAttack, setFilterAttack] = useState("filterByAttack");
  const [filterByOrder, setFilterByOrder] = useState("filterByOrder");

  let dispatch = useDispatch();
  const types = useSelector((state) => state.type);
  const attack = useSelector((state) => state.attack);
  const order = useSelector((state) => state.order);

  function handleType(e) {
    e.preventDefault();
    setFilterType(e.target.value);
    dispatch(setFilterType(e.target.value));
  }

  function handleAttack(e) {
    e.preventDefault();
    setFilterAttack(e.target.value);
    dispatch(setFilterAttack(e.target.value));
  }

  function handleOrder(e) {
    e.preventDefault();
    setFilterByOrder(e.target.value);
    dispatch(setFilterByOrder(e.target.value));
  }
  // useEffect(()=>{
  //     dispatch(getTypes());
  // },[])

  return (
    <>
      <select
        value={filterByType}
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
        className="filterbar-select">
        <option disabled>Filter by Attack</option>
        <option value="Score Upward">Score Upward</option>
        <option value="score Down">Score Descendant</option>
      </select>
        
      <select value={filterByOrder} onChange={handleOrder} className="filterbar-select">
                            <option disabled>Filter by Order</option>
                            <option value = 'Upward'>Upward</option>
                            <option value = 'Descendant'>Descendant</option>
            </select>
    </>
  );
};

export default filter;
