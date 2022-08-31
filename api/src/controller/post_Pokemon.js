const {Router} = require('express');
const {Pokemon, Type} = require('../db');




const post_Pokemon = Router();


post_Pokemon.post('/',async (req, res, next)=>{

    const {name, types, hp, attack, defense, speed, height, weight} = req.body;
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
            }
        });
        
        if(created){

            instance.addType(types)

            res.send({message: 'El pokemon a sido creado con exito.'})
        }else{

            res.status(404).json({message: 'El Pokemon que intentas crear ya existe.'})
        }

    } catch (error) {
        console.log(error)
        next();
    }

});


module.exports=post_Pokemon;


