import React from "react";
import styles from "./Pokemon.module.css";

const Pokemon = ({ name, img, type, id }) => {
  console.log(type)
  const ntype = type?.join(", ")
  
  return (
    <div className={styles.card} >
    <a href={`/detail/${id}`}>
      <h3 className={styles.header}>{name}</h3>
      <img className={styles.image} src={img} alt={name} />
      <h3 className={styles.footer}>{ntype}</h3>
    </a>
    </div>
  );
};

export default Pokemon;
