// import React, { useEffect, useState } from "react";
// import PokemonDetail from "./PokemonDetail"; 

// const PokemonList = (props) => {
//   const [pokemonDetail, setPokemonDetail] = useState(null);
//   const pokemonId = props.match.params.id;

//   useEffect(() => {
//     const fetchPokemonDetail = async () => {
//       try {
        
//         const response = await fetch(`http://localhost:3001/pokemons/${pokemonId}`);
//         const data = await response.json();
//         setPokemonDetail(data);
//       } catch (error) {
//         console.error("Error fetching Pokémon details:", error);
//       }
//     };

//     fetchPokemonDetail();
//   }, [pokemonId]);

//   return (
//     <div>
//       {pokemonDetail ? (
//         <PokemonDetail 
//           match={{ params: { id: pokemonId } }}
//           name={pokemonDetail.name}
//           img={pokemonDetail.img}
//           health={pokemonDetail.health}
//           attack={pokemonDetail.attack}
//           defense={pokemonDetail.defense}
//           speed={pokemonDetail.speed}
//           height={pokemonDetail.height}
//           weight={pokemonDetail.weight}
//           type={pokemonDetail.type}
//         />
//       ) : (
//         <div>Loading...</div>
//       )}
//     </div>
//   );
// };

// export default PokemonList;




import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPokemons } from "../../redux/actions";
import Pokemon from "../Pokemon/Pokemon";
import styles from './PokemonList.module.css'; 

const PokemonList = () => {
  const pokemons = useSelector((state) => state.pokemons);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPokemons());
  }, [dispatch]);
console.log(pokemons)
  return (
    <div className={styles.contenedor}>
      {!pokemons.length ? <></> : pokemons.map((pokemon) => (
        <Pokemon
          id={pokemon.id}
          key={pokemon.name} 
          name={pokemon.name}
          img={pokemon.img}
          type={pokemon.type}
        />
      ))}
    </div>
  );
};

export default PokemonList;