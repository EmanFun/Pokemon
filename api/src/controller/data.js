const axios = require('axios');
const { Op } = require("sequelize");

const Promise = require('bluebird');

const {Type, Move} = require('../db');


module.exports = {
    getTypesAndMoves: ()=>{

        

        return axios.get('https://pokeapi.co/api/v2/type')
            .then(response =>{

                
                let types = response.data.results.map(obj=>{
                    return {
                        name: obj.name,
                    }
                });

           

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
                

                return axios.get("https://pokeapi.co/api/v2/generation/1/")

                .then(resGen =>{

                     return resGen.data.moves.map(async(moveGen)=>{
                    
                        return axios.get(moveGen.url)
               
                     })


                })
                .then(dataMove => { 

                    return Promise.map(dataMove,(moveDetail)=>{
                        let result = moveDetail.data
                        return {
                            id: result.id,
                            name : result.name,
                            power: result.power || 0,
                            accuracy: result.accuracy || 0,
                            pp: result.pp || 0,
                            damage_class: result.damage_class.name,
                            type:  result.type.name
                        }
                    })
            
                }).then(arr =>{ 
               
                    console.log(arr)
                    arr.forEach(async(object, indexArr)=>{
                        
                        let instance = await Type.findOne({
                            where:{
                                [Op.or]: [
                                    { id: object.id },
                                    { name: object.type }
                                    ]
                            }
                        })

                        let [moveInstance, created] =  await Move.findOrCreate({
                                where:{
                                    name: object.name
                                },
                                defaults:{
                                    name: object.name,
                                    power: object.power ,
                                    accuracy: object.accuracy ,
                                    pp: object.pp,
                                    damage_class: object.damage_class, 
                                }
                            })

                        if(created) await instance.addMoves(moveInstance)
                  ///-----------------------------------------------------------------                
                    })
            })
            .catch(err=>{
                console.error(err);
            })
        })
    },
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