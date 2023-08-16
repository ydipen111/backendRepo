
// const app =express()
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// const ObjectId = Schema.ObjectId;

const ProductSchema = new Schema({
  title: String,
  price: Number,
});
 module.exports = mongoose.model("Product",ProductSchema)