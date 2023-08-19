const express = require("express")
const mongoose = require('mongoose');
const Joi = require('joi');

const bcrypt = require('bcrypt');





require("./config/database")
const Product = require("./model/product");
const User = require("./model/user")

const app = express()
const checkAuthentication = (req, res, next) => {
    let loggedin = false
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
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        
        // email: Joi.string()
        // .alphanum()
        // // .min(8)
        // // .max(30)
        // .required(),
})

app.post('/api/signup', async function (req, res) {
    try {

        const value = await SignupSchema.validateAsync(req.body,{abortEarly:false,stripUnknown:true});
        
        let hasedPassword =await bcrypt.hash(req.body.password,10);
        console.log(hasedPassword);
        // res.send(hasPassword)

        let user = await User.create({ ...req.body, password:hasedPassword})
        res.send(user)
    }

    catch (err) {
        let errors = err.details
        errors = errors.map(el =>{
            return {
                msg:el.message,
                parms:el.context.key
            }
        })

        console.log(errors);
        console.log(err.message)

        if (err.name === "ValidationError") {
            return res.status(400).send({
                msg: "Bad message",
                errors: errors,
                // errors: err.message--errors:err.errors--for client server
            })
        }

        res.status(500).send({ msg: "Required namedd" })

    }
})

app.post('/api/products', checkAuthentication, async function (req, res) {
    try {
        console.log(req.body)
        let product = await Product.create({ title: req.body.title, price: req.body.price })
        res.send(product)
    }
    catch (err) {
        res.status(500).send({ msg: "server error" })
    }
})

///api banaunu
app.get("/api/products", async function (req, res) {
    try {
        let products = await Product.find()
        console.log({ products })
        res.send(products)

    } catch (err) {
        console.log
        res.status(500).send({ msg: "server error" })
    }
})


app.listen(8000, () => {
    console.log("server started");
})  
