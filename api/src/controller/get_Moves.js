const Router = require('express');

const {Move, Type} = require('../db')


const route_Moves = Router();


route_Moves.get('/',(req, res, next)=>{

     Move.findAll({
        attributes: ['id','name','power','accuracy','pp','damage_class'],
        include: {
            model: Type,
        }
    }).then(response =>{

        return res.send( response.map(obj =>{
            return {
                id: obj.id,
                move: obj.name,
                power: obj.power,
                accuracy: obj.accuracy,
                pp: obj.pp,
                damage_class: obj.damage_class,
                ofType: obj.type.name
            }
        }))
    }).catch(err=> console.error(err))
    


})


module.exports = route_Moves;