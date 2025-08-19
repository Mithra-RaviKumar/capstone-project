const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  appointmentID: { type: Number, required: true, unique: true },
  patientID: { type: Number, required: true },
  doctorID: { type: Number, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  status: { type: String, default: "Pending" } 
}, { timestamps: true });

module.exports = mongoose.model("Appointment", appointmentSchema);
