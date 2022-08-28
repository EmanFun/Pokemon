const {Router} = require('express');
const axios = require('axios');

const {Pokemon, Type} = require('../db');



const router_Pokemon = Router();




router_Pokemon.get('/:id',async (req, res, next)=>{

    const {id} = req.params;
    
    
    let url = `https://pokeapi.co/api/v2/pokemon/${id}`

    try {

        if(id > 0){

            axios.get(url).then(response=>{

                let data = response.data;
                let result = {

                    id: data.id,
                    name: data.name,
                    hp: data.stats.filter(el=> el.stat.name === 'hp').map(obj=> obj.base_stat)[0],
                    attack: data.stats.filter(el=> el.stat.name === 'attack').map(obj=> obj.base_stat)[0],
                    defense: data.stats.filter(el=> el.stat.name === 'defense').map(obj => obj.base_stat)[0],
                    speed: data.stats.filter(el=> el.stat.name === 'speed').map(obj => obj.base_stat)[0],
                    height: data.height,
                    weight: data.weight,
                    types: data.types.map(el=> el.type.name)
                }
                res.send(result)


            })
        }else{

            let bdPokemon = await Pokemon.findOne({
                where:{
                    id: id,
                },
                include: Type,
            })
            
            res.send(bdPokemon ? bdPokemon: { message : 'No existe un pokemon con la misma id'})

        }
        



    } catch (error) {
        console.error(error);
        next();
    }



});



module.exports = router_Pokemon;