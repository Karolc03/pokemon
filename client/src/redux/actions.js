export const  GET_POKEMONS  = 'GET_POKEMONS';

export const getPokemons = () => {
  return function(dispatch){
    fetch("http://localhost:3001/pokemons")
    .then(response => response.json())
    .then((data) => dispatch({ type: GET_POKEMONS, payload:data }))
  }
  
  
  
};
