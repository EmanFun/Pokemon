const axios = require('axios');
const { Op } = require("sequelize");

const Promise = require('bluebird');

const {Type, Move} = require('../db');


module.exports = {
    getTypesAndMoves: ()=>{


        return axios.get('https://pokeapi.co/api/v2/type').then(response =>{

            
            let types = response.data.results.map(obj=>{
                return {
                    name: obj.name,
                }
            });

            let moves = response.data.results.map(obj=> axios.get(obj.url))

            types.forEach(element => {
                Type.findOrCreate({
                    where:{
                        name: element.name
                    },
                    defaults:{
                        name : element.name
                    }
                });

            });
            ///------------------------------------- descarga de todos los movimientos
            return Promise.map(moves, (obj)=>{
                
                obj = obj.data;
                return{
                    id: obj.id,
                    moves: obj.moves.map(el=> el.name),
                    type: obj.name      
                }
            })

        }).then(async(response)=>{

            let allMoves = response
            //Cargado de movimientos y respectivo relacionados
            return axios.get("https://pokeapi.co/api/v2/generation/1/").then(res =>{

                let genMoves = res.data.moves.map(e=> e.name)

                allMoves.forEach(async(object, indexArr)=>{
    
                    let instance = await Type.findOne({
                        where:{
                            [Op.or]: [
                                { id: object.id },
                                { name: object.type }
                                ]
                        }
                    })
    
                    if(instance.name === object.type){
     
                        
                        object.moves.forEach(async(e, index)=>{                      
    
                            if(genMoves.includes(e)){
                                let [moveInstance, created] =  await Move.findOrCreate({
                                        where:{
                                            name: e
                                        },
                                        defaults:{
                                            name: e
                                        }
                                    })

                                if(created) await instance.addMoves(moveInstance)
                                }

                            ///-----------------------------------------------------------------
                        })       
                    }
            })
        })
        .catch(err=>{
        console.error(err);
        })
    })},
    getPokemons: () => {
        var data ;
        let url= 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=160';

        console.time('first request');
        
        return axios.get(url)
        .then(response =>{

            data = response.data.results;

            let arrUrl = data.map(el => axios.get(el.url));

            console.timeEnd('first request');
            
            console.time('second request');

            return Promise.map(arrUrl, (obj)=>{
                //console.log(obj.data)
                obj = obj.data
                return {
                    id: obj.id , 
                    image: obj.sprites.other.dream_world.front_default,
                    attack: obj.stats.filter(el=> el.stat.name === 'attack').map(obj=> obj.base_stat)[0],
                    types: obj.types.map(obj=>{
                        return obj.type.name
                    })
                }
            })
            }).then(response => {
                
                console.timeEnd('second request');

                return data.map((obj, index)=>{

                    return {
                        
                        name: obj.name,
                        ...response[index]

                    }
                })
                

            }).catch(err=> console.error(err));
    }
};