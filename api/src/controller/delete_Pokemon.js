const {Router} = require('express');

const {Pokemon, Type} = require('../db');




const remove_Pokemon= Router();





remove_Pokemon.delete('/', async (req, res, next)=>{

    const {id} = req.query;
    
    try{
        if(id){

            await Pokemon.destroy({
                where:{
                    id: id,
                }
            });

            return res.send({message: 'Se elimino correctamente el Pokemon.'});

        }
        res.status(404).json({message: 'No se detecto un id.'})

    }catch(error){
        console.log(error);
        res.status(404).json({message: 'El id no se encuentra en la base de datos'})
        next()

    }

});


module.exports = remove_Pokemon;


