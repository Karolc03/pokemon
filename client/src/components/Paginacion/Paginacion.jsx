import React from "react";
import styles from "./Paginacion.module.css";

export default function Paginacion({pagina,setPagina,maximo}){
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
        <div className={styles.containerpaginacion}>
            <button className={styles.buttonpaginacion} onClick={prevButton}>Prev</button>
            <p className={styles.textpaginacion}>Página {pagina} de {maximo}</p>
            <button className={styles.buttonpaginacion} onClick={nextButton}>Next</button>

            
        </div>
    )
}