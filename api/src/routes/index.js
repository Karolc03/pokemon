const { Router } = require('express'); //definir rutas y manejar solicitudes HTTP asociadas a esas rutas.
const pokemonRouter = require('./pokemons.routes.js')
const typesRouter = require('./types.routes.js')

const router = Router();
router.use('/pokemons', pokemonRouter)
router.use('/types', typesRouter)

module.exports = router;
