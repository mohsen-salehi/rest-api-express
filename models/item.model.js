const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class Item extends Model {}

Item.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
  },
}, {
  sequelize,
  modelName: 'Item',
});

module.exports = Item;
