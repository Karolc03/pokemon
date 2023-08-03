import {
  GET_POKEMONS,
  GET_DETAILS,
  GET_POKEMON_BY_NAME,
  GET_TYPES,
  FILTER_BY_NAME,
  FILTER_BY_TYPE,
  FILTER_BY_ATTACK,
  FILTER_BY_ORIGIN,
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
      const pokemonsDB = Array.isArray(action.payload)
        ? action.payload.filter((pokemon) => !Number.isInteger(pokemon.id - 1) //condición es que el id NO sea un número entero
          )
        : action.payload;
      return {
        ...state,
        pokemons: action.payload, // Actualiza la propiedad pokemons en el nuevo estado
        pokemonAll: action.payload,
        pokemonFilters: action.payload,
        pokemonApi: Array.isArray(action.payload)
          ? action.payload.filter((pokemon) => Number.isInteger(pokemon.id - 1)) //condición es que el id sea un número entero
          : action.payload, //sino, se asignará el mismo valor sin filtrar
        pokemonDB: pokemonsDB.length ? pokemonsDB : "NO HAY POKEMON CON ESE NOMBRE"
      };
    case GET_POKEMON_BY_NAME:
      const pokemonsDBByName = Array.isArray(action.payload)
      ? action.payload.filter(
          (pokemon) => !Number.isInteger(pokemon.id - 1) //condición es que el id NO sea un número entero
        )
      : action.payload;
      return {
        ...state,
        pokemons: action.payload,
        pokemonAll: action.payload,
        pokemonFilters: action.payload,
        pokemonApi: Array.isArray(action.payload)
          ? action.payload.filter((pokemon) => Number.isInteger(pokemon.id - 1))
          : action.payload,
        pokemonDB: pokemonsDBByName.length ? pokemonsDBByName : "NO HAY POKEMON CON ESE NOMBRE"
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
      if (typeof state.pokemons === "string") return { ...state };
      const ascendingOrder = (a, b) =>
        a.name.toLowerCase().localeCompare(b.name.toLowerCase()); //ascendingOrder y descendingOrder, utilizando el método localeCompare() para realizar la comparación de cadenas sin distinción entre mayúsculas y minúsculas.
      const descendingOrder = (a, b) =>
        b.name.toLowerCase().localeCompare(a.name.toLowerCase()); //localeCompare() para realizar la comparación de cadenas sin distinción entre mayúsculas y minúsculas,

      const sortingFunction =
        action.payload === "Upward" ? ascendingOrder : descendingOrder; // Se utiliza action.payload para determinar la dirección del ordenamiento

      const auxName = [...state.pokemons].sort(sortingFunction); //luego se ordena esta copia utilizando la función

      return {
        ...state,
        pokemons: auxName,
      };
    case FILTER_BY_ATTACK:
      if (typeof state.pokemons === "string") return { ...state };

      const ascendingOrderAttack = (a, b) => a.attack - b.attack;
      const descendingOrderAttack = (a, b) => b.attack - a.attack;

      const sortingFunctionAttack =
        action.payload === "Score Upward"
          ? ascendingOrderAttack
          : descendingOrderAttack;
      const auxAttack = [...state.pokemons].sort(sortingFunctionAttack);

      return {
        ...state,
        pokemons: auxAttack,
      };
    case FILTER_BY_TYPE:
      if (action.payload === "All Types") {
        return {
          ...state,
          pokemons: !Array.isArray(state.pokemonFilters) ? state.pokemonFilters : [...state.pokemonFilters],
        };
      } else {
        const pkmns = Array.isArray(state.pokemonFilters) ? [
          ...state.pokemonFilters.filter((p) => {
            if (p.types.length) {
              if (typeof p.types[0] === "string")
                return p.types.includes(action.payload);
              return p.types.map((t) => t.name).includes(action.payload);
            }
            return false;
          }),
        ] : []
        return {
          ...state,
          pokemons: pkmns.length ? pkmns : "NO HAY POKEMON CON ESE NOMBRE",
        };
      }
    case FILTER_BY_ORIGIN:
      console.log("origin", action.payload);
      if (action.payload === "pokemonApi") {
        return {
          ...state,
          pokemons: [...state.pokemonApi],
          pokemonFilters: [...state.pokemonApi],
        };
      } else if (action.payload === "pokemonDB") {
        return {
          ...state,
          pokemons: state.pokemonDB,
          pokemonFilters: state.pokemonDB,
        };
      } else {
        return {
          ...state,
          pokemons: [...state.pokemonAll],
          pokemonFilters: [...state.pokemonAll],
        };
      }

    default:
      return { ...state };
  }
};

export default rootReducer;
