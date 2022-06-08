var express = require('express');
var cors = require('cors');
var bodyparser = require('body-parser');
var jsonwebtoken = require('jsonwebtoken');
var bcrypt = require('bcrypt');



const {User,Category,Product,Cart} = require('./models')
var app = express();

app.use(cors());

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:false})) 

var db = require('./models')

app.get("/",(req,res)=>{
    res.send("HELO GUYS")
})

app.get("/users",(req,res)=>{
    User.findAll()
    .then((data)=>res.send(data))
    .catch((err)=>res.send(err))
})


app.get("/getCategories",(req,res)=>{
    Category.findAll()
    .then((data)=>{
        if(data){
            res.status(200).json({
                success: true,
                categories:data,
            });
        }
    })
    .catch((err)=>{console.log(err)})
})

app.get("/getProducts/:id",(req,res)=>{
    const id = req.params.id
    Product.findAll(
        {
            where:{
                category_id:id
            }
        }
    )
    .then((data)=>{
        if(data){
            res.status(200).json({
                success: true,
                products:data,
            });
        }
    })
    .catch((err)=>{console.log(err),'err'})
    
})

app.get("/getProducts",(req,res)=>{
    Product.findAll()
    .then((data)=>{
        if(data){
            res.status(200).json({
                success: true,
                products:data,
            });
        }
    })
    .catch((err)=>{console.log(err)})
})

app.post("/addCategory/:category_name",(req,res)=>{
    console.log('req.body',req.params.category_name)
    const category_name = req.params.category_name
    Category.create({
        category_name
    })
    .then((data)=>{
        if(data){
            res.status(200).json({
                success: true,
                message: 'Category Added Successfully',
            });
        }
    })
    .catch((err)=>{console.log(err)})
})

app.post("/addProduct",(req,res)=>{
    Product.create(req.body)
    .then((data)=>{
        if(data){
            res.status(200).json({
                success: true,
                message: 'Product added Successfully',
            });
        }
    })
    .catch((err)=>{console.log(err)})
})

app.post("/addProdToCart",(req,res)=>{
    Cart.create(req.body)
    .then((data)=>{
        if(data){
            res.status(200).json({
                success: true,
                message: 'Product added to cart',
            });
        }
    })
    .catch((err)=>{console.log(err)})
})

app.post("/disableProduct/:id/:value",(req,res)=>{
    var bool=false
    if(req.params.value=='false')
    {
        bool=true
    }
    console.log(req.params,'req.params')
    Product.update(
        {
            disable:bool
        },
        {
            where:{
                id:req.params.id
            },
            returning:true,
            plain:true
        }
    )
    .then((data) => {
        console.log(data,'data')
        res.json({
            product: data[1].dataValues,
            success: true,
            message: 'Availability Changed Successfully',
        });
    })
    .catch((err) => {
        res.json({
            success: false,
            message: 'Error while Changing',
        });
    });
})

app.post("/register",(req,res)=>{
    const phash = bcrypt.hashSync(req.body.password,10)
    var newUser={
        username:req.body.username,
        email:req.body.email,
        phone_no:req.body.phone_no,
        password:phash,
        role_id:req.body.role_id
    }
    User.create(newUser)
    .then((data)=>{
        if(data){
            res.status(200).json({
                success: true,
                message: 'User Registered Successfully',
            });
        }
    })
    .catch((err)=>{console.log(err)})
})

app.post("/forgetpassword",(req,res)=>{
    const {email,password} = req.body
    const phash = bcrypt.hashSync(password,10)
    db.sequelize.query(`UPDATE users SET password = '${phash}' WHERE email = '${email}'`)
    .then((data)=>{
        console.log(data);
        res.json({
            success:true,
            message:'password changed successfully'
        })
    })
    .catch((err)=>{
        res.json({
            success:false,
            message:'failed to update'
        })
    })
})

app.post("/authenticate",(req,res)=>{
    const {email,password} = req.body
    User.findOne({
        where:{
            email,
        }
    })
    .then((data)=>{
        const user=data.dataValues;
        if(!user){
            res.status(404).json({
                success:false,
                message:'user not found'
            })
        }
        else{
            const isValid = bcrypt.compareSync(password,user.password)
            if(isValid){
                var token = jsonwebtoken.sign(
                    {
                        email:user.email,
                        username:user.username,
                        id:user.id,
                        role_id:user.role_id
                    },
                    'secret'
                )
                res.status(200).json({
                    success:true,
                    message:'Authentication Successful',
                    token:token,
                    loggeduser:user
                })
            }
            else{
                res.status(401).json({
                    success:false,
                    message:'Password is Incorrect'
                })
            }
        }
    })
    .catch((err)=>{console.log(err)})
})

app.get('/checkauth', (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    jsonwebtoken.verify(token, 'secret', (err, decoded) => {
        if (err) { 
            res.status(401).json({
                success: false,
                message: 'Invalid Token',
            });
        } else {
            res.status(200).json({
                success: true,
                message: 'Token Valid',
                data: decoded,
            });
        }
    });
});
app.listen(8080,()=>{console.log("server running on the port 8080")})