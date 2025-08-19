const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  doctorID: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  specialization: { type: String, required: true },
  phone: { type: String, required: true },
 
});

module.exports = mongoose.model("Doctor", doctorSchema);
