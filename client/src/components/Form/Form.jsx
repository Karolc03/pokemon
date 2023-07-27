import React from "react";
import { useState } from "react";

const Form = () => {
  const [value, setValue] = useState({
    name: "",
    img: "",
    health: "",
    attack: "",
    speed: "", //(si tiene).
    height: "", //(si tiene).
    weight: "", //(si tiene).
    type: "", //multiselect
  });
  const { name, image, health, attack, speed, height, weight, type } = value;
  const [errors, setErrors] = useState({
    name: "",
    image: "",
    health:"",
    attack:"",
    height: "",
    weight: "",
    type: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault()};

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValue({
      ...value,
      [name]: value,
    });
  };

  function handleError(e) {
    switch (e.target.name) {
      case "name":
        if (!/^[^0-9]*$/.test(value.name.trim())) {
          setErrors({
            ...errors,
            name: "El nombre no puede ser un número",
          });
        } else if (value.name.trim().length < 3) {
          setErrors({
            ...errors,
            name: "El nombre debe tener al menos 3 caracteres",
          });
        } else if (value.name.trim().length > 20) {
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
        if (/^(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)$/.test(value.img)) {
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
        const healthValue = parseInt(value.health, 10);
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
      default:
        break;
    }
    console.log(errors);
  }


return (
  <>
    <h2>CREATE POKEMON</h2>
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">
          Name:
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={handleChange}
            required
          />
        </label>
        {errors.name && <p>{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="img">
          URL de la imagen:
          <input
            type="text"
            id="img"
            name="img"
            value={value.image}
            onChange={handleChange}
            required
          />
        </label>
        {errors.name && <p>{errors.name}</p>}
      </div>

      <div>
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

      <div>
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

      <div>
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

      <div>
        <label htmlFor="height">
          Name:
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

      <div>
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
      </div>

      <label for="types">Types:</label>

      <select name="type" id="type" multiple>
        <option value="fighting">fighting</option>
        <option value="flying">flying</option>
        <option value="poison">poison</option>
        <option value="ground">ground</option>
      </select>

      <input type="submit" />
      </form>
    </>
  );
};
export default Form;
