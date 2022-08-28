const {Router} = require('express');
const {getPokemons} = require('./data');

const {Pokemon, Type} = require('../db');





const route_Pokemon = Router()




route_Pokemon.get('/',async (req, res, next)=>{

    try {

        let data =await getPokemons();
        let bdData = await Pokemon.findAll({
            attributes:['id','name'],
            include: Type,
        });


        console.log(data[0]);
        res.send([...bdData, ...data])
        
    } catch (err) {
        console.log(err)
        next()
    }




})





module.exports= route_Pokemon;

