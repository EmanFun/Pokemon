const {DataTypes} = require('sequelize');


module.exports= (sequelize)=>{

    sequelize.define('move',{
        name:{
            type: DataTypes.STRING,
        }
    },{timestamps: false})
}

