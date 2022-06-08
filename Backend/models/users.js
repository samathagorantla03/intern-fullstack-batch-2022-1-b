'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Role.hasMany(User,{foreignKey : "role_id"})
    }
  }
  User.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    username: {
      type: DataTypes.STRING,
      allowNull:false
    },
    email: {
      type: DataTypes.STRING,
      allowNull:false,
      unique:true
    },
    password:{
      type: DataTypes.STRING,
      allowNull:false
    },
    phone_no:{
      type: DataTypes.BIGINT,
      allowNull:false
    },
    role_id:{
      type: DataTypes.INTEGER,
      allowNull:false,
      references:{
        model:'roles',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'users',
    modelName: 'User',
    timestamps: false
  });
  return User;
};