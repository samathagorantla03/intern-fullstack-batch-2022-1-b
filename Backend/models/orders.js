'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.User.hasMany(Order,{foreignKey : "user_id"})
      Order.belongsToMany(models.Product, {
        through: models.Orderdetail,
        as: 'orderProducts',
        foreignKey: 'order_id',
    });
    }
  }
  Order.init({
      id:{
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:'users',
            key: 'id'
        }
      },
      date: {
        type: DataTypes.DATE,
        allowNull:false,
        unique:true
      },
      status:{
        type: DataTypes.BOOLEAN,
        allowNull:false
      },
      total_price:{
        type: DataTypes.FLOAT,
        allowNull:false,
      }
  }, {
    sequelize,
    tableName: 'orders',
    modelName: 'Order',
    timestamps: false
  });
  return Order;
};