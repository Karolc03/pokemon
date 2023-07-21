import React from "react";
import { Link } from 'react-router-dom'

const SearchBar = (props) => {
    return (
      <nav>
        <ul>
            <Link to="/form">Create Pokemon</Link>
          
          <input placeholder="Buscar" Busqueda />
          <button>Buscar Pokemon</button>
        </ul>
        <button>Filtrar API </button>
        <button>Filtrar DB </button>
        <button>Ordenar A - Z </button>
        <button>Ordenar Z - A </button>
        <button>Ordenar Por ataque </button>
      </nav>
    );
  };

export default SearchBar;