const {Router} = require('express');

const {Type} = require('../db');




const router_Types= Router();



router_Types.get('/',async (req, res, next)=>{

    try {
        let types = await Type.findAll();

        res.send(types)


    } catch (error) {
        console.error(error);
        next();
        
    }
});


module.exports = router_Types;








