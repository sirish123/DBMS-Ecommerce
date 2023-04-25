import mongoose from "mongoose";

const UseraddressSchema = new mongoose.Schema({
  address: String,
  pincode: String,
  state: String,
  country: String,
});

module.exports = mongoose.models.Useraddress || mongoose.model("Useraddress", UseraddressSchema);
