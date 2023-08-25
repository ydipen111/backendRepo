const express = require("express")
const mongoose = require('mongoose');
const Joi = require('joi');
const bcrypt = require('bcrypt')

require("./config/database")
const Product = require("./model/product");
const User = require("./model/user")

const app = express()

const checkAuthentication = (req, res, next) => {
    let loggedin = true
    console.log("checking.....");
    if (loggedin) {
        next()

    } else {
        res.status(401).send({
            msg:
             "UnAuthentication"
        })
    }

}
//  app.use(checkAuthentication)-------for all authentication for api
app.use(express.json())

//for validtion for email and name
// const loginedSchema = Joi.object({

//     email: Joi.string()
//         .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),

//     password: Joi.string()
//     .email()
//     .required(),
// })

const SignupSchema = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    password: Joi.string()
        .alphanum()
        .min(8)
        .max(30)
        .required(),


    email: Joi.string()
        .email( )
        .required(),
})



// app.post("/api/logined", (req, res,next) => {
    
//     const validate = loginedSchema.validate(req.body, { abortEarly: false, stripUnknown: true });
//     console.log(validate);
//     res.send("logined hai");

// let err = validate.error

// errors = errors.map(el => {
//     return {
//         msg: el.message,
//         parms: el.context.key
//     }
// })


// console.log(errors);
// next(err)
// })


app.post('/api/signup', async function (req, res, next) {
    try {
        const value = await SignupSchema.validateAsync(req.body, { abortEarly: false, stripUnknown: true });

        let hashedPassword = await bcrypt.hash(req.body.password, 10);

        console.log(hashedPassword);
        let user = await User.create({...req.body,password:hashedPassword})
        console.log(user);
        res.send(user)
    }
    catch (err) {
        let errors = err.details.map(el => {
            return { 
                 msg:el.message,
                parms:el.context.key
            }
        })
        if (err.name === "ValidationError") {
            return res.status(400).send({
                msg: "Bad message",
                errors: errors
            })
        }

        
    res.status(404).send({ msg: "resources not found" })        
        // next(err)
    }
    
})



app.post('/api/products', checkAuthentication, async function (req, res, next) {
    try {
        console.log(req.body)
        let product = await Product.create({ title: req.body.title, price: req.body.price })
        res.send(product)
    }
    catch (err) {
        next(err)
    }
})

///api banaunu
app.get("/api/products", async function (req, res, next) {
    try {
        let products = await Product.find()
        console.log({ products })
        res.send(products)

    } catch (err) {
        next(err)
    }
})

///////////
app.use((req, res) => {
    res.status(400).send({ msg: "resources not found" })
})

app.use((err,req,res,next)=>{
  

    res.status(500).send({msg: "server error"})
})

app.listen(8000, () => {
    console.log("server started");
})  
