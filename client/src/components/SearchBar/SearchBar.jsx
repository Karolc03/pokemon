import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getPokemonByName } from '../../redux/actions';
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
      alert('Please enter a Pokémon name.');
      return;
    }
    dispatch(getPokemonByName(name)); //usamos el hook useDispatch para despachar la acción getPokemonByName(name) a la tienda Redux. Esto enviará una solicitud para obtener información del Pokémon cuyo nombre fue ingresado.
  }

  return (
    <div className='search-div'>
      <input className='input-buscar' type='text' placeholder='search...' onChange={handleInputChange} value={name}/>
      <button className='buscar' type='submit' onClick={handleSubmit}>BUSCAR</button>
      <button>Filtrar API </button>
      <button>Filtrar DB </button>
      <button>Ordenar A - Z </button>
      <button>Ordenar Z - A </button>
      <button>Ordenar Por ataque </button> 
    </div>
  );
}