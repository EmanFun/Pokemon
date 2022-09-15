const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hp:{
      type: DataTypes.INTEGER,
      allowNull: false 
    },
    attack:{
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    defense:{
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    speed:{
      type:DataTypes.INTEGER,
      allowNull: false,
    },
    height:{
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    weight:{
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    moves:{
      type: DataTypes.STRING,
      allowNull: false
    },
    image:{
      type: DataTypes.STRING,
      
      validate:{
        isUrl: true,
      }
    }
  },{
    timestamps: false
  });
};
