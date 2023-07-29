import {
  GET_POKEMONS,
  GET_DETAILS,
  GET_POKEMON_BY_NAME,
  GET_TYPES,
  FILTER_BY_NAME,
  FILTER_BY_TYPE,
  FILTER_BY_ATTACK,
} from "./actions";

const initialState = {
  pokemons: [],
  pokemonFilters: [],
  pokemonAll: [],
  pokemonApi: [],
  pokemonDB: [],
  detailPokemons: {},
  types: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    // case POST_POKEMON:
    // return {
    //   ...state,
    //   pokemons: [...state.pokemons, action.payload],
    // }
    case GET_POKEMONS:
      return {
        ...state,
        pokemons: action.payload,
        pokemonsAll: action.payload,
        pokemonApi: Array.isArray(action.payload)
          ? action.payload.filter((pokemon) => Number.isInteger(pokemon.id - 1))
          : action.payload,
        pokemonDB: Array.isArray(action.payload)
          ? action.payload.filter(
              (pokemon) => !Number.isInteger(pokemon.id - 1)
            )
          : action.payload,
      };
    case GET_POKEMON_BY_NAME:
      return {
        ...state,
        pokemons: action.payload,
        pokemonAll: action.payload,
        pokemonFilters: action.payload,
        pokemonApi: Array.isArray(action.payload)
          ? action.payload.filter((pokemon) => Number.isInteger(pokemon.id - 1))
          : action.payload,
        pokemonDB: Array.isArray(action.payload)
          ? action.payload.filter(
              (pokemon) => !Number.isInteger(pokemon.id - 1)
            )
          : action.payload,
      };
    case GET_DETAILS:
      return {
        ...state,
        detailPokemons: action.payload,
      };
    case GET_TYPES:
      return {
        ...state,
        types: action.payload,
      };
    case FILTER_BY_NAME:
      const ascendingOrder = (a, b) =>
        a.name.toLowerCase().localeCompare(b.name.toLowerCase()); //ascendingOrder y descendingOrder, utilizando el método localeCompare() para realizar la comparación de cadenas sin distinción entre mayúsculas y minúsculas.
      const descendingOrder = (a, b) =>
        b.name.toLowerCase().localeCompare(a.name.toLowerCase());

      const sortingFunction =
        action.payload === "Upward" ? ascendingOrder : descendingOrder;

      const auxName = [...state.pokemonFilters].sort(sortingFunction);

      return {
        ...state,
        pokemonFilters: auxName,
      };
    case FILTER_BY_ATTACK:
      const ascendingOrderAttack = (a, b) => a.attack - b.attack;
      const descendingOrderAttack = (a, b) => b.attack - a.attack;

      const sortingFunctionAttack =
        action.payload === "Score Upward"
          ? ascendingOrderAttack
          : descendingOrderAttack;

      const auxAttack = [...state.pokemonFilters].sort(sortingFunctionAttack);

      return {
        ...state,
        pokemonFilters: auxAttack,
      };
      case FILTER_BY_TYPE:
        if (action.payload === "All Types") {
          return {
            ...state,
            pokemonFilters: [...state.pokemons],
          };
        } else {
          return {
            ...state,
            pokemonFilters: state.pokemons.filter((pokemon) =>
              pokemon.type.includes(action.payload)
            ),
          };

        }

    default:
      return { ...state };
  }

};

export default rootReducer;
