import React from "react";
import styles from "./Pokemon.module.css";

const Pokemon = ({ name, img, types, id, attack }) => {
  const ntype = types && types.map(type => typeof type === "string" ? type : type.name).join(", ")
  
  return (
    
    <div className={styles.card}>
    <a href={`/detail/${id}`}>
      <h3 className={styles.header}>{name}</h3>
      <img className={styles.image} src={img} alt={name} />
      <h3 className={styles.footer}>{ntype}</h3>
      <h3 className={styles.header} >Ataque:{attack}  </h3>
    </a>
    </div>

  );
};

export default Pokemon;
