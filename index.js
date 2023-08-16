const express = require("express")
const app =express()


///api banaunu
app.get("/api/product",(req,res) => {
    res.send(["tshirt","paint"])
})


app.listen(8000,()=>{
    console.log("server started");
})
