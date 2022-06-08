'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.User.hasMany(Cart,{foreignKey : "user_id"})
      models.Product.hasMany(Cart,{foreignKey : "product_id"})
    }
  }
  Cart.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull:false,
        references:{
          model:'products',
          key: 'id'
        }
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull:false,
        references:{
          model:'users',
          key: 'id'
      }
      },
  }, {
    sequelize,
    tableName: 'carts',
    modelName: 'Cart',
    timestamps: false
  });
  return Cart;
};