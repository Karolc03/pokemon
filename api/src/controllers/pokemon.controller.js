const axios = require("axios");
const { Pokemon, Type } = require("../db");//representan las tablas "Pokemon" y "Type" en la base de datos.

const getInformationApi = async (limit = 100, offset = 0) => { //obtiene información de la API 
  const { data: dataPokemons } = await axios.get(
    "https://pokeapi.co/api/v2/pokemon",
    {
      params: {
        limit,
        offset,
      },
    }
  );

  const arrPromises = dataPokemons.results.map(({ url }) =>
    axios.get(url).then(({ data }) => data)
  );

  const arr = await Promise.all(arrPromises).then((res) =>
    res.map((p) => {
      //toma la respuesta y mapea por cada pokemon la info necesaria
      const info = {
        id: p.id,
        name: p.name,
        img: p.sprites.other.dream_world.front_default,
        types: p.types.map((el) => el.type.name),
        health: p.stats[0].base_stat,
        attack: p.stats[1].base_stat,
        defense: p.stats[2].base_stat,
        speed: p.stats[5].base_stat,
        height: p.height,
        weight: p.weight,
      };
      return info; //devuelve toda la info
    })
  );
  return arr;
};

const getInformationByName = async (name) => {//obtiene información del Pokémon por nombre desde la API
  return axios
    .get(`https://pokeapi.co/api/v2/pokemon/${name}`)
    .then(({ data: p }) => ({
      id: p.id,
      name: p.name,
      img: p.sprites.other.dream_world.front_default,
      types: p.types.map((el) => el.type.name),
      health: p.stats[0].base_stat,
      attack: p.stats[1].base_stat,
      defense: p.stats[2].base_stat,
      speed: p.stats[5].base_stat,
      height: p.height,
      weight: p.weight,
    }))
    .catch(() => {});
};
//El método findAll() devuelve una promesa, por lo que utilizamos await
const getInformationDB = async () => {//Utiliza Sequelize para realizar una consulta a la tabla "Pokemon" y "Type" 
  return await Pokemon.findAll({ //consulta a la tabla "Pokemon" utilizando el modelo Pokemon de Sequelize.
    include: {
      model: Type,//estamos incluyendo el modelo "Type" en la consulta.
      attributes: ["name"],
      through: { //relación de muchos a muchos
        attributes: [],//para que no se incluyan los atributos de la tabla intermedia en el resultado
      },
    },
  })
};

const getAllInformation = async (req, res, next) => {//obtiene información de todos los Pokémon API y DB.
  try {
    const { limit, offset, name } = req.query;

    if (name) {//Si existe name, significa que se está buscando por su nombre
      const pkmonsByName = [];
      const pkmon = await getInformationByName(name);
      pkmonsByName.push(pkmon);
      return res.json(pkmonsByName);
    }
    //Ambas funciones devuelven un array con los datos de los Pokémon obtenidos.
    const infoApi = await getInformationApi(limit, offset);
    const infoDB = await getInformationDB();
    const allInfo = infoDB.reverse().concat(infoApi); //Reverse es tener los datos más recientes primero
    res.status(200).json(allInfo);
  } catch (error) {
    next(error);
  }
};

const getPokemonById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (isNaN(id)) {//Si el id no es un número, se trata de un id de DB
      return Pokemon.findByPk(id, {// Sequelize para buscar el Pokémon en la db
        include: {
          model: Type,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      }).then((pokemon) => {
        if (pokemon) {
          return res.json({
            ...pokemon.toJSON(),
            types: pokemon.toJSON().types.map(t => t.name),
          });
        } else {
          return res.json("error");
        }
      })
      .catch(() => res.json("error"));
    }
    return axios
      .get(`https://pokeapi.co/api/v2/pokemon/${id}`) 
        
      .then(({ data }) => res.json({// se debe buscar el Pokémon en la API externa
        id: data.id,
        name: data.name,
        img: data.sprites.other.dream_world.front_default,
        types: data.types.map((el) => el.type.name),
        health: data.stats[0].base_stat,
        attack: data.stats[1].base_stat,
        defense: data.stats[2].base_stat,
        speed: data.stats[5].base_stat,
        height: data.height,
        weight: data.weight,
             }))
      .catch(() => res.json("error"));
    
  } catch (error) {
    next(error);
  }
};

const createPokemon = async (req, res, next) => {
  try {
    const { name, img, health, attack, defense, speed, height, weight, types } =
      req.body;
    if (name && img && health && attack && defense) {
      const pokemon = await Pokemon.create({
        name,
        img,
        health,
        attack,
        defense,
        speed: speed ?? 0,
        height: height ?? 0,
        weight: weight ?? 0,
       
      });
      let typeByDB = await Type.findAll({
        where: {
          name: types,
        },
      });
      await pokemon.addType(typeByDB);
      return res.status(200).send("El pokemon ha sido creado exitosamente");
    }
    res.status(400).send("Faltan datos obligatorios");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllInformation,
  getPokemonById,
  createPokemon,
  getInformationDB,
};
