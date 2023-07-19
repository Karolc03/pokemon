const { Router } = require('express');
const pokemonRouter = require('./pokemons.routes.js')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();
router.use('/pokemons', pokemonRouter)
router.get('/', (req, res)=> res.json({msg: 'Hola'}))
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
