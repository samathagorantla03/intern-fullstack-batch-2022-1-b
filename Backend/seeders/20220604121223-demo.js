'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert('roles',[{
     role_name:"driver"
   }]);
  //  await queryInterface.bulkInsert('users',[{
  //   username:"salma",
  //   email:"salma@gmail.com",
  //   password:"123",
  //   phone_no:897,
  //   role_id:1
  // },
  // {
  //   username:"ram",
  //   email:"ram@gmail.com",
  //   password:"12",
  //   phone_no:8985176523,
  //   role_id:1
  // }
  // ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
