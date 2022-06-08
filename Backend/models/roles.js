'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Role.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      role_name: {
        type: DataTypes.STRING,
        allowNull:false,
        unique:true
      },
  }, {
    sequelize,
    tableName: 'roles',
    modelName: 'Role',
    timestamps: false
  });
  return Role;
};