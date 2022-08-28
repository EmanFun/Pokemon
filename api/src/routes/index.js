const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const allPokemons = require('../controller/get_Pokemons');
const pokemon = require('../controller/get_Pokemon');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/pokemons', allPokemons);
router.use('/pokemons/', pokemon)


module.exports = router;
