'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Category.hasMany(Product,{foreignKey : "category_id"})
      Product.belongsToMany(models.Order, {
        through: models.Orderdetail,
        as: 'productOrders',
        foreignKey: 'product_id',
    });
    }
  }
  Product.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        type: DataTypes.STRING,
        allowNull:false
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull:false,
        unique:true
      },
      disable:{
        type: DataTypes.BOOLEAN,
        allowNull:false,
      },
      description:{
        type: DataTypes.STRING,
        allowNull:false
      },
      category_id:{
        type: DataTypes.INTEGER,
        allowNull:false,
        references:{
          model :'categories',
          key : 'id'
        }
      }
  }, {
    sequelize,
    tableName: 'products',
    modelName: 'Product',
    timestamps: false
  });
  return Product;
};