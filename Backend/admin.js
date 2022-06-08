const {User,Role} = require('./models');
const bcrypt = require('bcrypt');

const password = bcrypt.hashSync('admin',10);
        // Role.create({
        //     role_name:'admin'
        // })
        // .then(console.log('role created'))
        // .catch(console.log('error'))
        // User.create({
        //     username:'admin',
        //     password:password,
        //     email:'admin@gmail.com',
        //     phone_no:8987657812,
        //     role_id:2
        // })
        // .then((data)=>{console.log(data)})
        // .catch((err)=>{console.log(err)})