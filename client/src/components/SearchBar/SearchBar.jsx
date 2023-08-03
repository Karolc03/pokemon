import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getPokemonByName, getPokemons } from '../../redux/actions';
import styles from './SearchBar.module.css';


export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  // se ejecuta cada vez que el valor del campo de entrada cambia.
  function handleInputChange(e) {
    setName(e.target.value);
  }

 // se ejecuta cuando el usuario hace clic en el botón "BUSCAR" para buscar un Pokémon
  function handleSubmit(e) {
    e.preventDefault(); //evitamos que el formulario se envíe automáticamente
    if (!name) {
      dispatch(getPokemons())
      return;
    }
    dispatch(getPokemonByName(name)); //usamos el hook useDispatch para despachar la acción getPokemonByName(name) a la tienda Redux. Esto enviará una solicitud para obtener información del Pokémon cuyo nombre fue ingresado.
    setName("");
    
  }
  return (
    <form className={styles.searchContainer}
    onSubmit={handleSubmit}
    >
      <input
        type='text'
        placeholder='Search...'
        className={styles.inputbuscar}
        onChange={handleInputChange}
        value={name}
      />
      <button type="submit" className={styles.buscar} >
        Search
      </button>
      
    </form>
  );
}
