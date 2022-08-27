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


    }
}