const {DataTypes} = require('sequelize');


module.exports= (sequelize)=>{

    sequelize.define('move',{
        name:{
            type: DataTypes.STRING,
        },
        power:{
            type: DataTypes.INTEGER,
        },
        accuracy:{
            type: DataTypes.INTEGER,
        },
        pp:{
            type: DataTypes.INTEGER,
        },
        damage_class:{
            type: DataTypes.STRING,
        }
    },{timestamps: false})
}

