const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const allPokemons = require('../controller/get_Pokemons');
const pokemon = require('../controller/get_Pokemon');
const newPokemon = require('../controller/post_Pokemon');
const types = require('../controller/get_Types');
const updatePokemons = require('../controller/put_Pokemon');
const removePokemon = require('../controller/delete_Pokemon');



const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/pokemons', allPokemons);// por query
router.use('/postPokemons', newPokemon);
router.use('/putPokemon', updatePokemons);
router.use('/deletePokemon', removePokemon);
router.use('/pokemons/', pokemon);
router.use('/types', types);


module.exports = router;
