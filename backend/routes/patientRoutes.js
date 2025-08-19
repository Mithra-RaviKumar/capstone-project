const express = require("express");
const router = express.Router();
const Patient = require("../models/Patient");
const Ailment = require("../models/Ailment");
const Appointment = require("../models/Appoinment");
const Leave = require('../models/Leave');
// Get next PatientID 
async function getNextPatientID() {
  const patients = await Patient.find().sort({ patientID: 1 });
  const existingIDs = patients.map(p => parseInt(p.patientID)); 

  let nextID = 1;
  for (let i = 0; i < existingIDs.length; i++) {
    if (existingIDs[i] !== i + 1) {
      nextID = i + 1; 
      break;
    } else {
      nextID = existingIDs.length + 1;
    }
  }

  return nextID.toString();
}

// Get next PatientID
router.get("/next-id", async (req, res) => {
  try {
    const patientID = await getNextPatientID();
    res.json({ patientID });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add patient
router.post("/", async (req, res) => {
  try {
    const { patientID, name, age, gender, contact } = req.body;
    const newPatient = new Patient({ patientID, name, age, gender, contact });
    await newPatient.save();
    res.json({ message: "Patient added successfully", patientID });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//Get all patients
router.get("/", async (req, res) => {
  try {
    const patients = await Patient.find();
    res.json(patients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add ailment
router.post("/ailment", async (req, res) => {
  try {
    const { patientID, ailments } = req.body;

    const patient = await Patient.findOne({ patientID });
    if (!patient) return res.status(404).json({ message: "Patient not found" });

    const newAilment = new Ailment({ patientID, ailments });
    await newAilment.save();
    res.json({ message: "Ailments added successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get ailments 
router.get("/ailment/:patientID", async (req, res) => {
  try {
    const patientAilment = await Ailment.findOne({ patientID: req.params.patientID });
    if (!patientAilment) return res.status(404).json({ message: "Ailments not found" });

    res.json(patientAilment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update ailments 
router.put("/ailment/:patientID", async (req, res) => {
  try {
    const { ailments } = req.body;
    const patientAilment = await Ailment.findOne({ patientID: req.params.patientID });

    if (!patientAilment) return res.status(404).json({ message: "Ailments not found" });

    patientAilment.ailments = ailments; // replace with new array
    await patientAilment.save();

    res.json({ message: "Ailments updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//View Doctor Appointments 

router.get("/appointments/doctors/:doctorID", async (req, res) => {
  try {
    const { doctorID } = req.params;
    const appointments = await Appointment.find({ doctorID });

    if (appointments.length === 0) {
      return res.status(404).json({ message: "No appointments found for this doctor" });
    }

    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Request Appointment
router.post("/appointments/request", async (req, res) => {
  try {
    const { patientID, doctorID, date, time } = req.body;

    if (!patientID || !doctorID || !date || !time) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const leaveExists = await Leave.findOne({
      doctorID: doctorID,
      startDate: { $lte: new Date(date) },
      endDate: { $gte: new Date(date) }
    });

    if (leaveExists) {
      return res.status(400).json({ error: "Doctor is on leave on this date. Please choose another date or doctor." });
    }

    const lastAppointment = await Appointment.findOne().sort({ appointmentID: -1 });
    const nextAppointmentID = lastAppointment ? lastAppointment.appointmentID + 1 : 1;
    const newAppointment = new Appointment({
      appointmentID: nextAppointmentID,
      patientID,
      doctorID,
      date,
      time
    });

    await newAppointment.save();
    res.json({ message: "Appointment booked successfully" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Get all appointments by patientID
router.get("/appointments/patients/:patientID", async (req, res) => {
  try {
    const appointments = await Appointment.find({ patientID: req.params.patientID });
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;