const {Router} = require('express');
const {Pokemon, Type} = require('../db');




const post_Pokemon = Router();


post_Pokemon.post('/',async (req, res, next)=>{

    const {name, type, hp, attack, defense, speed, height, weight, moves} = req.body;
    let types = Array.from(type)
    console.log(req.body)
    console.log(types)
    try {
        
        let [instance, created] = await Pokemon.findOrCreate({

            where:{
                name : name,
            },
            defaults:{
                name: name,
                hp: hp,
                attack: attack,
                defense: defense,
                speed: speed,
                height: height,
                weight: weight,
                moves: moves,
            }
        });
        
        if(created){

            instance.addType(types)

            res.send('El pokemon a sido creado con exito.')
        }else{

            res.send('El Pokemon que intentas crear ya existe.')
        }

    } catch (error) {
        console.log(error)
        next();
    }

});


module.exports=post_Pokemon;


