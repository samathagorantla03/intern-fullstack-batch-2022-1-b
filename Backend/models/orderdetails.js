'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Orderdetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Order.hasMany(Orderdetail,{foreignKey : "order_id"})
      models.Product.hasMany(Orderdetail,{foreignKey : "product_id"})
    }
  }
  Orderdetail.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      order_id: {
        type: DataTypes.INTEGER,
        allowNull:false,
        references:{
          model:'orders',
          key: 'id'
        }
      },
      product_id:{
        type: DataTypes.INTEGER,
        allowNull:false,
        references:{
          model:'products',
          key: 'id'
        }
      }
  }, {
    sequelize,
    tableName: 'orderdetails',
    modelName: 'Orderdetail',
    timestamps: false
  });
  return Orderdetail;
};