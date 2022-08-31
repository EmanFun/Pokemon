const {Router} = require('express');
const { Pokemon, Type} = require('../db');






const put_Pokemon = Router();






put_Pokemon.put('/',async (req, res, next)=>{

    const changes = req.body.changes;
    console.log(changes)
    
    const {id} = req.query;
    console.log(id)
    try {

        if(changes && id){

            await Pokemon.update(changes,{
            where: {
                id: id,
                }
            });

            return res.send({message : 'Se actualizo el Pokemon correctamente'})

        }

        
        return res.status(404).json({message: 'No se encontraron cambios a realizar'});


    } catch (error) {
        console.log(error)
        res.status(404).json({message: 'el id no existe en la base de datos'})
        
    }
    
});




module.exports = put_Pokemon; 