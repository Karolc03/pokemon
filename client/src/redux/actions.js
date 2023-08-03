import axios from "axios";
export const GET_POKEMONS = "GET_POKEMONS";
export const GET_DETAILS = "GET_DETAILS";
export const GET_POKEMON_BY_NAME = "GET_POKEMON_BY_NAME";
export const POST_POKEMON = "POST_POKEMON";
export const FILTER_BY_NAME = "FILTER_BY_NAME";
export const GET_TYPES = "GET_TYPES";
export const FILTER_BY_TYPE = "FILTER_BY_TYPE";
export const FILTER_BY_ATTACK = "FILTER_BY_ATTACK";
export const FILTER_BY_ORIGIN = "FILTER_BY_ORIGIN";

export const getPokemons = () => {
  return function (dispatch) {
    axios
      .get("http://localhost:3001/pokemons") //Hace una solicitud GET
      .then((response) => response.data) //Extrae la data
      .then((data) => dispatch({ type: GET_POKEMONS, payload: data }));
    // Dispatch la acción GET_POKEMONS desde la API
  };
};
export const getDetail = (id) => {
  return function (dispatch) {
    axios
      .get(`http://localhost:3001/pokemons/${id}`)
      .then((response) => response.data)
      .then((data) => {
        console.log("DATA", data);
        return dispatch({ type: GET_DETAILS, payload: data });
      });
  };
};
export const getPokemonByName = (name) => {
  return function (dispatch) {
    axios
      .get(`http://localhost:3001/pokemons?name=${name.toLowerCase()}`)
      .then((response) => response.data)
      .then((data) => dispatch({ type: GET_POKEMON_BY_NAME, payload: data }))
      .catch(() =>
        dispatch({
          type: GET_POKEMON_BY_NAME,
          payload: "NO HAY POKEMON CON ESE NOMBRE",
        })
      );
  };
};
export const postPokemon = (pokemon) => {
  return function () {
    axios
      .post(`http://localhost:3001/pokemons`, pokemon)
      .then((response) => response.data)
      .then((data) => alert(data))
      .then(() => window.location.reload());
  };
};
export const getTypes = () => (dispatch) => {
  axios
    .get("http://localhost:3001/types")
    .then((response) => response.data)
    .then((types) => dispatch({ type: GET_TYPES, payload: types }));
};

export const getPokemonsByOrigin = (origin) => {
  return {
    type: FILTER_BY_ORIGIN,
    payload: origin,
  };
};

export const filterByType = (pokemonType) => {
  return {
    type: FILTER_BY_TYPE,
    payload: pokemonType,
  };
};
export const filterByName = (order) => {
  return {
    type: FILTER_BY_NAME,
    payload: order,
  };
};

export const filterByAttack = (order) => {
  return {
    type: FILTER_BY_ATTACK,
    payload: order,
  };
};
