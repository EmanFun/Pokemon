const {Router} = require('express');
const {getPokemons} = require('./data');





const route_Pokemon = Router()




route_Pokemon.get('/',async (req, res, next)=>{

    try {

        let data =await getPokemons();
        console.log(data[0]);
        res.send(data)
        
    } catch (err) {
        console.log(err)
        next()
    }




})





module.exports= route_Pokemon;

