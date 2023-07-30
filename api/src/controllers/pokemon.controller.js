const axios = require("axios");
const { Pokemon, Type } = require("../db");

const getInformationApi = async (limit = 100, offset = 0) => {
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

const getInformationByName = async (name) => {
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

const getInformationDB = async () => {
  return await Pokemon.findAll({
    include: {
      model: Type,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
};

const getAllInformation = async (req, res, next) => {
  try {
    const { limit, offset, name } = req.query;

    if (name) {
      const pkmonsByName = [];
      const pkmon = await getInformationByName(name);
      pkmonsByName.push(pkmon);
      return res.json(pkmonsByName);
    }
    const infoApi = await getInformationApi(limit, offset);
    const infoDB = await getInformationDB();
    const allInfo = infoDB.reverse().concat(infoApi);
    res.status(200).json(allInfo);
  } catch (error) {
    next(error);
  }
};

const getPokemonById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (isNaN(id)) {
      const pokemon = await Pokemon.findByPk(id, {
        include: {
          model: Type,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      });
      if (pokemon) {
        return res.json({
          ...pokemon.toJSON(),
          types: pokemon.toJSON().types.map(t => t.name),
        });
      } else {
        return res.json("error");
      }
    }
    return axios
      .get(`https://pokeapi.co/api/v2/pokemon/${id}`) 
        
      .then(({ data }) => res.json({
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
    console.log("body", req.body);
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
