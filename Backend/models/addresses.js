'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.User.hasMany(Address,{foreignKey : "user_id"})
    }
  }
  Address.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      pincode: {
        type: DataTypes.INTEGER,
        allowNull:false
      },
      address: {
        type: DataTypes.STRING,
        allowNull:false,
        unique:true
      },
      user_id:{
        type: DataTypes.INTEGER,
        allowNull:false,
        references:{
          model:'users',
          key: 'id'
        }
      }
  }, {
    sequelize,
    tableName: 'addresses',
    modelName: 'Address',
    timestamps: false
  });
  return Address;
};