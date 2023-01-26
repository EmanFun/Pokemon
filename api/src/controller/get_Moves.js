const Router = require('express');

const {Move, Type} = require('../db')


const route_Moves = Router();


route_Moves.get('/',(req, res, next)=>{

     Move.findAll({
        attributes: ['id','name'],
        include: {
            model: Type,
        }
    }).then(response =>{

        return res.send( response.map(obj =>{
            return {
                id: obj.id,
                move: obj.name,
                ofType: obj.type.name
            }
        }))
    }).catch(err=> console.error(err))
    


})


module.exports = route_Moves;