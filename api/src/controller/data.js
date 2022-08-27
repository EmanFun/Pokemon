const axios = require('axios');

const Promise = require('bluebird');

const {Type} = require('../db');


module.exports = {
    getTypes: ()=>{

        return axios.get('https://pokeapi.co/api/v2/type').then(response =>{

            
            let types = response.data.results

            types = types.map(obj=>{
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
        }).catch(err=>{
            console.error(err);
        })
    },
    getPokemons: () => {
        var data ;
        let url= 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=40';
        console.time('first request');
        
        return axios.get(url)
        .then(response =>{

            data = response.data.results;
            let arrUrl = data.map(el => axios.get(el.url));
            
            console.timeEnd('first request');

            console.time('second request');
            return Promise.map(arrUrl, (obj)=>{
                
                return {
                    id: obj.data.id , 
                    image: obj.data.sprites.other.dream_world.front_default,
                    types: obj.data.types.map(obj=>{
                        return obj.type.name
                    })
                }
            })// bajamos un nivel de identacion.
            }).then(response => {

                
                console.timeEnd('second request');
                return data.map((obj, index)=>{

                    return {
                        
                        name: obj.name,
                        ...response[index]

                    }
                })
                

            }).catch(err=> console.error(err));

        //}).catch(err=> console.error(err))
    }
};