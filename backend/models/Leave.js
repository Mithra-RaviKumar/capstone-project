const mongoose = require("mongoose");

const leaveSchema = new mongoose.Schema({
  doctorID: { type: String, required: true }, 
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  reason: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model("Leave", leaveSchema);
