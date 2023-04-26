import mongoose from "mongoose";

const GrievanceSchema = new mongoose.Schema({
  userid: String,
  grievance: String,
});

module.exports =
  mongoose.models.Grievance ||
  mongoose.model("Grievance", GrievanceSchema);
