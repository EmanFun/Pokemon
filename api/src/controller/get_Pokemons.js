const {Router} = require('express');
const {getPokemons} = require('./data');

const {Pokemon, Type} = require('../db');
const axios = require('axios');
const data = require('./data');





const route_Pokemon = Router()


// NOTA PROBAR DE LA MANERA ANTERIOR
//Funciono ?? 


route_Pokemon.get('/',async (req, res, next)=>{
    
    if(!req.query.name){
        try {
                let data =await getPokemons();
                let bdData = await Pokemon.findAll({
                    attributes:['id','name'],
                    include: Type,
                });


                console.log(data[0]);
                return res.send([...bdData, ...data])
            
            
        } catch (err) {
            console.log(err)
            next('route')
        }
    }

    next()
},async (req, res, next)=>{
    
    var pokemonDb;
    const {name} = req.query;

    try {
        if(name){

            pokemonDb =await Pokemon.findOne({
                where:{
                    name : name
                },
                include: Type,
            });

            let pokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
            pokemon = pokemon.data;
            pokemon = {
                id: pokemon.id,
                name: pokemon.name,
                hp: pokemon.stats.filter(el=> el.stat.name === 'hp').map(obj=> obj.base_stat)[0],
                attack: pokemon.stats.filter(el=> el.stat.name === 'attack').map(obj=> obj.base_stat)[0],
                defense: pokemon.stats.filter(el=> el.stat.name === 'defense').map(obj => obj.base_stat)[0],
                speed: pokemon.stats.filter(el=> el.stat.name === 'speed').map(obj => obj.base_stat)[0],
                height: pokemon.height,
                weight: pokemon.weight,
                types: pokemon.types.map(el=> el.type.name)
            }

            console.log(pokemon)
            console.log(pokemonDb)
            
            return res.send(pokemon);  
        }
    } catch (error) {

        if(pokemonDb)return res.send(pokemonDb)
        res.status(404).json({message : 'No existe ningun Pokemon con ese Nombre.'})
    }
});





module.exports= route_Pokemon;

