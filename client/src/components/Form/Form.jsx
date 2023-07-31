import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postPokemon, getTypes } from "../../redux/actions";
import { useHistory } from "react-router-dom";
import styles from "./Form.module.css"

const Form = () => {
  const history = useHistory();
  const handleButton = () => {
    history.push("/home");
  };

  const types = useSelector((state) => state.types);
  const dispatch = useDispatch();

  const [value, setValue] = useState({
    name: "",
    img: "",
    health: "",
    attack: "",
    defense: "",
    speed: "", //(si tiene).
    height: "", //(si tiene).
    weight: "", //(si tiene).
    types: [], //multiselect
  });
  const [errors, setErrors] = useState({
    name: "",
    img: "",
    health: "",
    attack: "",
    defense: "",
  });

  const handleTypes = (e, tp) => {
    e.preventDefault();
    let newTypes = [];
    const exist = value.types?.find((t) => t.id === tp.id);
    if (exist) {
      newTypes = value.types.filter((t) => t.id !== tp.id);
    } else {
      newTypes = [...value.types, tp];
    }

    setValue({
      ...value,
      types: newTypes,
    });
  };

  function handleSubmit(e) {
    e.preventDefault();
    if (errors.name || errors.img || errors.health || errors.attack) return;
    dispatch(
      postPokemon({
        name: value.name,
        img: value.img,
        health: value.health,
        attack: value.attack,
        defense: value.defense,
        speed: value.speed,
        height: value.height,
        weight: value.weight,
        types: value.types.map((t) => t.name),
      })
    );

    setValue({
      //resetea el estado input a su estado original
      name: "",
      img: "",
      health: 0,
      attack: 0,
      defense: 0,
      speed: 0,
      height: 0,
      weight: 0,
      types: [],
    });
  }

  useEffect(() => {
    dispatch(getTypes()); //al montarse el comp me trae todos los tipos
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value: fieldValue } = e.target;
    setValue({
      ...value,
      [name]: fieldValue,
    });
    handleError(name, fieldValue);
  };

  function handleError(errorName, errorValue) {
    switch (errorName) {
      case "name":
        if (!/^[^0-9]*$/.test(errorValue.trim())) {
          setErrors({
            ...errors,
            name: "El nombre no puede ser un número",
          });
        } else if (errorValue.trim().length < 3) {
          setErrors({
            ...errors,
            name: "El nombre debe tener al menos 3 caracteres",
          });
        } else if (errorValue.trim().length > 20) {
          setErrors({
            ...errors,
            name: "El nombre no puede tener más de 20 caracteres",
          });
        } else {
          setErrors({
            ...errors,
            name: "",
          });
        }
        break;
      case "img":
        const regEx = /\bhttps?:\/\/\S+?\.(png|jpe?g|gif|bmp|svg)\b/
        if (!regEx.test(errorValue)) {
          setErrors({
            ...errors,
            img: "Solo puedes usar LINK de una URL de imagen",
          });
        } else {
          setErrors({
            ...errors,
            img: "",
          });
        }
        break;
      case "health":
        const healthValue = parseInt(errorValue, 10);
        if (isNaN(healthValue)) {
          setErrors({
            ...errors,
            health: "Ingresa solo números enteros positivos",
          });
        } else if (healthValue > 200) {
          setErrors({
            ...errors,
            health: "El valor de health no puede ser superior a 200",
          });
        } else if (healthValue === 0) {
          setErrors({
            ...errors,
            health: "El valor de health no puede ser 0",
          });
        } else {
          setErrors({
            ...errors,
            health: "",
          });
        }
        break;

      case "attack":
        const attackValue = parseInt(errorValue, 10);
        if (isNaN(attackValue)) {
          setErrors({
            ...errors,
            attack: "Ingresa solo números enteros positivos",
          });
        } else if (attackValue > 200) {
          setErrors({
            ...errors,
            attack: "El valor de attack no puede ser superior a 200",
          });
        } else if (attackValue === 0) {
          setErrors({
            ...errors,
            attack: "El valor de attack no puede ser 0",
          });
        } else {
          setErrors({
            ...errors,
            attack: "",
          });
        }
        break;
      case "defense":
        const defenseValue = parseInt(errorValue, 10);
        if (isNaN(defenseValue)) {
          setErrors({
            ...errors,
            defense: "Ingresa solo números enteros positivos",
          });
        } else if (defenseValue > 200) {
          setErrors({
            ...errors,
            defense: "El valor de defense no puede ser superior a 200",
          });
        } else if (defenseValue === 0) {
          setErrors({
            ...errors,
            defense: "El valor de defense no puede ser 0",
          });
        } else {
          setErrors({
            ...errors,
            defense: "",
          });
        }
        break;
      default:
        break;
    }
  }

  return (
    <div className={styles.bodyContainer}>
      <div className={styles.container}>
      <div className={styles.card}>
      <h2>CREATE POKEMON</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formgroup}>
          <label htmlFor="name">
            Name:
            <input
              type="text"
              id="name"
              name="name"
              value={value.name}
              onChange={handleChange}
              required
            />
          </label>
          {errors.name && <p>{errors.name}</p>}
        </div>

        <div className={styles.formgroup}>
                  <label htmlFor="img">
                  image url:
            <input
              type="text"
              id="img"
              name="img"
              value={value.img}
              onChange={handleChange}
              required
            />
          </label>
          {errors.img && <p>{errors.img}</p>}
        </div>

        <div className={styles.formgroup}>
          <label htmlFor="health">
            health:
            <input
              type="number"
              id="health"
              name="health"
              value={value.health}
              onChange={handleChange}
              required
            />
          </label>
          {errors.health && <p>{errors.health}</p>}
        </div>

        <div className={styles.formgroup}>
          <label htmlFor="attack">
            attack:
            <input
              type="number"
              id="attack"
              name="attack"
              value={value.attack}
              onChange={handleChange}
              required
            />
          </label>
          {errors.attack && <p>{errors.attack}</p>}
        </div>

        <div className={styles.formgroup}>
          <label htmlFor="defense">
            defense:
            <input
              type="number"
              id="defense"
              name="defense"
              value={value.defense}
              onChange={handleChange}
              required
            />
          </label>
          {errors.defense && <p>{errors.defense}</p>}
        </div>

        <div className={styles.formgroup}>
          <label htmlFor="speed">
            speed:
            <input
              type="number"
              id="speed"
              name="speed"
              value={value.speed}
              onChange={handleChange}
            />
          </label>
          {errors.speed && <p>{errors.speed}</p>}
        </div>
        <div className={styles.formgroup}>
          <label htmlFor="height">
            height:
            <input
              type="number"
              id="height"
              name="height"
              value={value.height}
              onChange={handleChange}
              required
            />
          </label>
          {errors.height && <p>{errors.height}</p>}
        </div>
        <div className={styles.formgroup}>
          <label htmlFor="weight">
            weight:
            <input
              type="number"
              id="weight"
              name="weight"
              value={value.weight}
              onChange={handleChange}
              required
            />
          </label>
          {errors.weight && <p>{errors.weight}</p>}
        </div >

        {types.map((t) => (
          <button
            onClick={(e) => handleTypes(e, t)}
            id={t.name + t.id}
            key={t.name + t.id}
          >
            {t.name}
          </button>
        ))}
        <div className={styles.cardtype}>
          {value.types && value.types.length
            ? value.types.map((t) => (
                <button
                  onClick={(e) => handleTypes(e, t)}
                  id={t.name + t.id}
                  key={t.name + t.id}
                >
                  {t.name} X
                </button>
              ))
            : "ADD TYPES TO YOUR POKEMON"}
        </div>
        <input type="submit" />
      </form>
      <button className={styles.buttonhome} onClick={handleButton}>GO TO HOME </button>
    </div>
    </div>
    </div>
  );
};
export default Form;
