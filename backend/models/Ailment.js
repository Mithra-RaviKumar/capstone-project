const mongoose = require("mongoose");

const ailmentSchema = new mongoose.Schema({
  patientID: { type: Number, required: true },
  ailments: { type: [String], required: true }
}, { timestamps: true });

module.exports = mongoose.model("Ailment", ailmentSchema);
