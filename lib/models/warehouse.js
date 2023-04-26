import mongoose from "mongoose";

const warehouseschema = new mongoose.Schema({
  wnumber: String,
  wname: String,
  address: String,
  pincode: String,
});

module.exports =
  mongoose.models.Warehouse ||
  mongoose.model("Warehouse", warehouseschema);
