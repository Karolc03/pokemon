import React from "react";

export default function Paginacion({pagina,setPagina,maximo}){
    // const elementosPorPagina = 12
    // const totalPaginas = Math.ceil(pokemonList.length / elementosPorPagina);
    // const indiceInicial = (pagina - 1) * elementosPorPagina;
    // const indiceFinal = indiceInicial + elementosPorPagina;
    // const elementosMostrados = pokemonList.slice(indiceInicial, indiceFinal);
    
    function prevButton(){
        if(pagina-1>=1){
            setPagina(pagina-1)
        }
    }

    function nextButton(){
        if(pagina+1<=maximo){
            setPagina(pagina+1)
        }
    }

    return(
        <div className="container-paginacion">
            <button className="button-paginacion" onClick={prevButton}>Prev</button>
            <p className="text-paginacion">Página {pagina} de {maximo}</p>
            <button className="button-paginacion" onClick={nextButton}>Next</button>

            
        </div>
    )
}