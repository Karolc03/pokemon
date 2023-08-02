const { DataTypes } = require('sequelize');//tipos de datos que se pueden usar al definir el modelo

// Exportamos una funcion que define el modelo
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    img:{
      type: DataTypes.STRING,
      allowNull: false,
      isUrl : true,
    },
    health:{
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    attack:{
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    defense: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    speed:{
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    height:{
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    weight:{
      type: DataTypes.INTEGER,
      allowNull: true,
    }

  });
};

