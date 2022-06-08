'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('roles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      role_name: {
        type: Sequelize.STRING,
        allowNull:false
      },
    });
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING,
        allowNull:false
      },
      email: {
        type: Sequelize.STRING,
        allowNull:false,
        unique:true
      },
      password:{
        type: Sequelize.STRING,
        allowNull:false
      },
      phone_no:{
        type: Sequelize.BIGINT,
        allowNull:false
      },
      role_id:{
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:'roles',
          key: 'id'
        }
      }
    });
    await queryInterface.createTable('addresses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      pincode: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      address: {
        type: Sequelize.STRING,
        allowNull:false,
        unique:true
      },
      user_id:{
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:'users',
          key: 'id'
        }
      }
    });
    await queryInterface.createTable('categories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      category_name: {
        type: Sequelize.STRING,
        allowNull:false
      },
    });
    await queryInterface.createTable('products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull:false
      },
      price: {
        type: Sequelize.FLOAT,
        allowNull:false,
        unique:true
      },
      description:{
        type: Sequelize.STRING,
        allowNull:false
      },
      category_id:{
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model :'categories',
          key : 'id'
        }
      }
    });
    await queryInterface.createTable('orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
            model:'users',
            key: 'id'
        }
      },
      date: {
        type: Sequelize.DATE,
        allowNull:false,
        unique:true
      },
      status:{
        type: Sequelize.BOOLEAN,
        allowNull:false
      },
      total_price:{
        type: Sequelize.FLOAT,
        allowNull:false,
      }
    });
    await queryInterface.createTable('orderdetails', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      order_id: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:'orders',
          key: 'id'
        }
      },
      product_id:{
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:'products',
          key: 'id'
        }
      }
    });
    await queryInterface.createTable('carts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      product_id: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:'products',
          key: 'id'
        }
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:'users',
          key: 'id'
      }
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropAllTables();
  }
};