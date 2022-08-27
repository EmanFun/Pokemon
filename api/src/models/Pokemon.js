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
      type: DataTypes.NUMBER, 
    },
    attack:{
      type: DataTypes.NUMBER,
    },
    defense:{
      type: DataTypes.NUMBER,
    },
    speed:{
      type:DataTypes.NUMBER,
    },
    height:{
      type: DataTypes.NUMBER,
    },
    weight:{
      type: DataTypes.NUMBER,
    }
  });
};
