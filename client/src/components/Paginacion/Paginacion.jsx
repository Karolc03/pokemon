import React from "react";
import styles from "./Paginacion.module.css";

export default function Paginacion({pagina,setPagina,maximo}){
    function prevButton(){
        if(pagina-1>=1){//si al restar 1 de la página actual el resultado es mayor o igual a 1
            setPagina(pagina-1)
        }
    }

    function nextButton(){
        if(pagina+1<=maximo){//si al sumar 1 a la página actual el resultado es menor o igual al valor máximo
            setPagina(pagina+1)
        }
    }

    return(
        <div className={styles.containerpaginacion}>
            <button className={styles.buttonpaginacion} onClick={prevButton}>Prev</button>
            <p className={styles.textpaginacion}>Page {pagina} of {maximo}</p>
            <button className={styles.buttonpaginacion} onClick={nextButton}>Next</button>
        </div>
    )
}