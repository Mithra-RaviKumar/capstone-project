const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  patientID: { type: String, required: true, unique: true }, 
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  contact: { type: String, required: true },
 
});

module.exports = mongoose.model("Patient", patientSchema);
