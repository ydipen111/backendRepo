const express = require("express")


const mongoose = require('mongoose');

require("./config/database")
const Product = require("./model/product");
// const product = require("./model/product");
const app =express()

app.use(express.json())

// app.post('/api/products',async function (req,res){
//     try{
//     let product = await Product.create({title: req.body.title})
//     res.send(product)}
//     catch(err){
//         res.status(500).send({msg:"server error"})
//     }
// })
app.post('/api/products',async function (req,res){
        try{
        console.log(req.body)
         Product.create({title: req.body.title,price:req.body.price})
        res.send("produc created")}
        catch(err){
            res.status(500).send({msg:"server error"})
        }
    })


// app.post('/api/products', async function (req, res) {
//     try {
//       const newProduct = await Product.create({ title: "vest" });
//       res.send("Product created: " + newProduct);
//     } catch (err) {
//       console.error(err);
//       res.status(500).send("Server error");
//     }
//   });

///api banaunu
app.get("/api/products", async function (req,res) {
    try{

        let products =await Product.find()
    console.log({products})
    res.send(products)
}catch(err){
    console.log
    res.status(500).send({msg:"server error"})
}
})


app.listen(8000,()=>{
    console.log("server started");
})  
