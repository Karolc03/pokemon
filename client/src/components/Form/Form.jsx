import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postPokemon, getTypes } from "../../redux/actions";
import styles from "./Form.module.css"
import { Link } from "react-router-dom";

const Form = () => {
  const types = useSelector((state) => state.types);//Selector selecciona datos específicos del estado almacenado en la store
  const dispatch = useDispatch();

  const [value, setValue] = useState({
    name: "",
    img: "",
    health: "",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
    types: [],
  });
  const [errors, setErrors] = useState({
    name: "",
    img: "",
    health: "",
    attack: "",
    defense: "",
    types: "Choose at least 1 type",
  });

  const handleTypes = (e, tp) => {
    e.preventDefault();
    let newTypes = [];
    const exist = value.types?.find((t) => t.id === tp.id);//Se verifica si el tipo (tp) ya existe en el arreglo de tipos 
    if (exist) {
      newTypes = value.types.filter((t) => t.id !== tp.id);// Se crea un nuevo arreglo (newTypes) filtrando los tipos para excluir el tipo actual (tp) que ya existe en el arreglo de tipos (value.types).
    } else {
      newTypes = [...value.types, tp];
    }

    setValue({
      ...value,
      types: newTypes,
    });
    handleError("types", newTypes);
  };

  function handleSubmit(e) {
    e.preventDefault();
    if (errors.name || errors.img || errors.health || errors.attack || errors.types) return;//verifica qye no haya errores, si hay, se detiene 
    dispatch(
      postPokemon({
        name: value.name,
        img: value.img,
        health: parseInt(value.health,10),
        attack: parseInt(value.attack,10),
        defense: parseInt(value.defense,10),
        speed: parseInt(value.speed,10),
        height: parseInt(value.height,10),
        weight: parseInt(value.weight,10),
        types: value.types.map((t) => t.name),
      })
    );

    setValue({
      //resetea el estado input a su estado original
      name: "",
      img: "",
      health: "",
      attack: "",
      defense: "",
      speed: "",
      height: "",
      weight: "",
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
      case "types":
        if (errorValue.length){
          setErrors({
            ...errors,
            types: '' 
          }) 
        }else{
          setErrors({
            ...errors,
            types: 'Choose at least 1 type' 
          }) 
        }
        break;
      case "name":
        if (!/^[^0-9]*$/.test(errorValue.trim())) {
          setErrors({
            ...errors,
            name: "The name cannot be a number",
          });
        } else if (errorValue.trim().length < 3) {
          setErrors({
            ...errors,
            name: "The name must have at least 3 characters",
          });
        } else if (errorValue.trim().length > 20) {
          setErrors({
            ...errors,
            name: "The name cannot be longer than 20 characters",
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
            img: "You can only LINK an image URL",
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
            health: "Enter only positive integers",
          });
        } else if (healthValue > 200) {
          setErrors({
            ...errors,
            health: "The value of health cannot be greater than 200",
          });
        } else if (healthValue === 0) {
          setErrors({
            ...errors,
            health: "The value of health cannot be 0",
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
            attack: "Enter only positive integers",
          });
        } else if (attackValue > 200) {
          setErrors({
            ...errors,
            attack: "The value of attack cannot be greater than 200",
          });
        } else if (attackValue === 0) {
          setErrors({
            ...errors,
            attack: "The value of attack cannot be 0",
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
            defense: "Enter only positive integers",
          });
        } else if (defenseValue > 200) {
          setErrors({
            ...errors,
            defense: "The value of defense cannot be greater than 200",
          });
        } else if (defenseValue === 0) {
          setErrors({
            ...errors,
            defense: "The value of defense cannot be 0",
          });
        } else {
          setErrors({
            ...errors,
            defense: "",
          });
        }
        break;
        case "speed":
          const speedValue = parseInt(errorValue, 10);
          if (isNaN(speedValue)) {
            setErrors({
              ...errors,
              speed: "Enter only positive integers",
            });
          } else if (speedValue > 200) {
            setErrors({
              ...errors,
              speed: "The value of speed cannot be greater than 200",
            });
          } else if (speedValue === 0) {
            setErrors({
              ...errors,
              speed: "The value of speed cannot be 0",
            });
          } else {
            setErrors({
              ...errors,
              speed: "",
            });
          }
          break;
        case "height":
          const heightValue = parseInt(errorValue, 10);
          if (isNaN(heightValue)) {
            setErrors({
              ...errors,
              height: "Enter only positive integers",
            });
          } else if (heightValue > 200) {
            setErrors({
              ...errors,
              height: "The value of height cannot be greater than 200",
            });
          } else if (heightValue === 0) {
            setErrors({
              ...errors,
              height: "The value of height cannot be 0",
            });
          } else {
            setErrors({
              ...errors,
              height: "",
            });
          }
          break;
        case "weight":
          const weightValue = parseInt(errorValue, 10);
          if (isNaN(weightValue)) {
            setErrors({
              ...errors,
              weight: "Enter only positive integers",
            });
          } else if (weightValue > 200) {
            setErrors({
              ...errors,
              weight: "El valor de weight no puede ser superior a 200",
            });
          } else if (weightValue === 0) {
            setErrors({
              ...errors,
              weight: "The value of weight cannot be 0",
            });
          } else {
            setErrors({
              ...errors,
              weight: "",
            });
          }
        break;
      default:
        break;
    }
  }

  return (
    <div className={styles.bodyContainer}>
      <Link className={styles.buttonHome} to = {"/home"}> HOME</Link>
      <div className={styles.container}>
      <div className={styles.card}>
      <h2>CREATE POKEMON</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formgroup}>
          <label htmlFor="name">
            <div>
           Name: </div>
            <input
              type="text"
              id="name"
              name="name"
              value={value.name}
              onChange={handleChange}
              required
              autocomplete="off"
            />
          </label>
          <div className={styles.error}>
          {errors.name && <p >{errors.name}</p>}
          </div>
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
          <div className={styles.error}>
          {errors.img && <p >{errors.img}</p>}
        </div>
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
          <div className={styles.error}>
          {errors.health && <p>{errors.health}</p>}
        </div>
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
          <div className={styles.error}>
          {errors.attack && <p>{errors.attack}</p>}
        </div>
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
          <div className={styles.error}>
          {errors.defense && <p>{errors.defense}</p>}
        </div>
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
          <div className={styles.error}>
          {errors.speed && <p>{errors.speed}</p>}
        </div>
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
              
            />
          </label>
          <div className={styles.error}>
          {errors.height && <p>{errors.height}</p>}
        </div>
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
              
            />
          </label>
          <div className={styles.error}>
          {errors.weight && <p>{errors.weight}</p>}
        </div >
        </div>

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
                  required
                >
                  {t.name} X
                </button>
              ))
            : "ADD TYPES TO YOUR POKEMON"}
            <div className={styles.error}>
          {errors.types && <p>{errors.types}</p>}
        </div >
        </div>
        <input className={styles.send} type="submit" />
      </form>
      
    </div>
    </div>
    </div>
  );
};
export default Form;
