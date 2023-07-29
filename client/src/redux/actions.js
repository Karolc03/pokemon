import axios from 'axios';
export const GET_POKEMONS = "GET_POKEMONS";
export const GET_DETAILS = "GET_DETAILS";
export const GET_POKEMON_BY_NAME = "GET_POKEMON_BY_NAME";
export const POST_POKEMON = "POST_POKEMON";
export const FILTER_BY_NAME = "FILTER_BY_NAME";
export const GET_TYPES = "GET_TYPES";
export const FILTER_BY_TYPE = "FILTER_BY_TYPE";
export const FILTER_BY_ATTACK = "FILTER_BY_ATTACK";

export const getPokemons = () => {
  return function (dispatch) {
    axios
      .get("http://localhost:3001/pokemons")
      .then((response) => response.data)
      .then((data) => dispatch({ type: GET_POKEMONS, payload: data }));
  };
}
  export const getDetail = (id) => {
    return function (dispatch) {
      axios
        .get(`http://localhost:3001/pokemons/${id}`)
        .then((response) => response.data)
        .then((data) => dispatch({ type: GET_DETAILS, payload: data }));
    };
};
export const getPokemonByName = (name) => {
  return function (dispatch) {
    axios
      .get(`http://localhost:3001/pokemons?name=${name}`)
      .then((response) => response.data)
      .then((data) => dispatch({ type: GET_POKEMON_BY_NAME, payload: data }));
  };
};
export const postPokemon = (pokemon) => {
  return function (dispatch) {
    axios
      .post(`http://localhost:3001/pokemons`, pokemon)
      .then((response) => response.data)
      .then((data) => dispatch({ type: POST_POKEMON, payload: data }));
  };
};
export const getTypes = () => (dispatch) => {
  axios
    .get('http://localhost:3001/types')
    .then((response) => response.data)
    .then((types) => dispatch({ type: GET_TYPES, payload: types }));
};
export const filterByOrder = (order) => {
  return {
    type: FILTER_BY_NAME,
    payload: order
  }
}
export const filterByType = (pokemonType) =>{
  return {
    type: FILTER_BY_TYPE,
    payload: pokemonType
  }

}
export const filterByName = (order) => {
  return {
    type: FILTER_BY_NAME,
    payload: order
  }}

  export const filterByAttack= (order) => {
    return {
      type: FILTER_BY_ATTACK,
      payload: order
    }}