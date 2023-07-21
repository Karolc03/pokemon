import React from "react";
import styles from './Pokemon.module.css'


const Pokemon = ({name, img, types}) => {
    return (
      <>
        <h3 className={styles.h2}>{name}</h3>
        <img src={img} alt={name} />
        {/* <h3>{types}</h3> */}
         </>
    );
  };

export default Pokemon;