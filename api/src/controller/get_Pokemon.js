const {Router} = require('express');
const axios = require('axios');

const {Pokemon, Type, Move} = require('../db');
const e = require('express');



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
                    image: data.sprites.other.dream_world.front_default,
                    types: data.types.map(el=> el.type.name),
                    moves: data.moves.map((e)=> {
                        let method;
                        if(e.version_group_details.find((e)=> {
                            
                            method = e.move_learn_method.name
                            return e.version_group.name === "red-blue" 
                        }))return `${e.move.name} - Metodo de Aprendizaje - ${method}`
                        
                    }).filter(e=> e !== undefined && e.endsWith('level-up') )
                }
                res.send(result)


            })
        }else{

            let bd = await Pokemon.findByPk(id,{
                include: [Type,Move]
            });
            console.log(bd)
            let pokemon = {
                id: bd.id,
                name: bd.name,
                hp: bd.hp,
                attack: bd.attack,
                defense: bd.defense,
                speed: bd.speed,
                height: bd.height,
                weight: bd.weight,
                image: bd.image,
                types: bd.types.map(e=> e.name),
                moves: bd.moves.map(b=> b.name)
            }
            
            console.log()
            
            res.send(pokemon ? pokemon: { message : 'No existe un pokemon con la misma id'})

        }
        



    } catch (error) {
        console.error(error);
        next();
    }



});



module.exports = router_Pokemon;