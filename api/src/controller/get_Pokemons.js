const {Router} = require('express');
const {getPokemons} = require('./data');

const {Pokemon, Type} = require('../db');
const axios = require('axios');







const route_Pokemon = Router()


// NOTA PROBAR DE LA MANERA ANTERIOR
//Funciono ?? 


route_Pokemon.get('/',async (req, res, next)=>{
    
    if(!req.query.name && !req.query.created && !req.query.alfa){
        try {   
                //--------- total data
            let data =await getPokemons();
            let bdData = await Pokemon.findAll({
            attributes:['id','name','image','attack'],
            include: Type,
            });

            //console.log(data[0]);
            return res.send([...bdData, ...data])
        
   
        } catch (err) {
            console.log(err)
            next('route')
        }
    }

    next()
},async (req, res, next)=>{
    
    var pokemonDb;
    if(req.query.name){
        const {name} = req.query;
        //search Name
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
                    attack: pokemon.stats.filter(el=> el.stat.name === 'attack').map(obj=> obj.base_stat)[0],
                    image: pokemon.sprites.other.dream_world.front_default,
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
    }
    next()
    
}, (req, res, next)=>{

    if(req.query.created){
        //filtrado bd
        try {
            let {created} = req.query;
            if(created){

                Pokemon.findAll({
                    attributes: ['id', 'name','image'],
                    include: Type,
                }).then(response=>{
                    res.send(response)
                })

            }

        } catch (error) {
            next()
        }

    }
});





module.exports= route_Pokemon;

