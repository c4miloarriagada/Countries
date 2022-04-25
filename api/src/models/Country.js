const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('country', {
    id:{
      type: DataTypes.STRING,
       allowNull: false,
      primaryKey: true,
      unique: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    img:{
      type: DataTypes.STRING,
      allowNull:  false
    },
    continent:{
      type: DataTypes.STRING,
      allowNull: false
    },
    capital:{
      type: DataTypes.STRING, //MACAO NO TIENE CAPITAL
      allowNull: false
    },
    subregion:{
      type: DataTypes.STRING,
      allowNull: true
    },
    area:{
      type: DataTypes.INTEGER,
      allowNull: true
    },
    population:{
      type: DataTypes.INTEGER,
      allowNull: true
    }
  },
  );
};
