const express = require("express");
const router = express.Router();
const Doctor = require("../models/Doctor");
const Counter = require("../models/Counter");
const Ailment = require("../models/Ailment");
// Get next available doctorID 
router.get("/nextID", async (req, res) => {
  try {
    const doctors = await Doctor.find({}, { doctorID: 1, _id: 0 }).sort({ doctorID: 1 });
    const usedIDs = doctors.map(doc => Number(doc.doctorID));

    function findSmallestMissing(arr) {
      let smallest = 1;
      for (const num of arr) {
        if (num === smallest) smallest++;
        else if (num > smallest) break;
      }
      return smallest;
    }

    const nextID = findSmallestMissing(usedIDs);
    res.json({ doctorID: nextID });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Add doctor 
router.post("/", async (req, res) => {
  try {
    const { name, specialization, phone } = req.body;

    // Fetch existing doctorID
    const doctors = await Doctor.find({}, { doctorID: 1, _id: 0 }).sort({ doctorID: 1 });
    const usedIDs = doctors.map(doc => Number(doc.doctorID));

    function findSmallestMissing(arr) {
      let smallest = 1;
      for (const num of arr) {
        if (num === smallest) smallest++;
        else if (num > smallest) break;
      }
      return smallest;
    }

    const newDoctorID = findSmallestMissing(usedIDs);

    const newDoctor = new Doctor({
      doctorID: newDoctorID.toString(),
      name,
      specialization,
      phone
    });

    await newDoctor.save();
    res.json({ message: "Doctor added successfully", doctorID: newDoctorID });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Get all doctors
router.get("/", async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get doctor
router.get("/doctorid/:doctorID", async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ doctorID: req.params.doctorID });
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });
    res.json(doctor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//Update doctor 
router.put("/doctorid/:doctorID", async (req, res) => {
  try {
    const updatedDoctor = await Doctor.findOneAndUpdate(
      { doctorID: req.params.doctorID },
      req.body,
      { new: true }
    );
    if (!updatedDoctor) return res.status(404).json({ message: "Doctor not found" });
    res.json(updatedDoctor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });
    res.json(doctor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//Update doctor 
router.put("/:id", async (req, res) => {
  try {
    const updatedDoctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedDoctor) return res.status(404).json({ message: "Doctor not found" });
    res.json(updatedDoctor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// DELETE doctor
router.delete("/:doctorID", async (req, res) => {
  try {
    const deletedDoctor = await Doctor.findOneAndDelete({ doctorID: req.params.doctorID });

    if (!deletedDoctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res.json({ message: "Doctor deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Suggest doctor

const ailmentMap = {
  headache: "Neurologist",
  fever: "General Physician",
  diabetes: "Endocrinologist",
  fracture: "Orthopedic",
  cold: "ENT",
  asthma: "Pulmonologist",
  depression: "Psychiatrist"
};

// Suggest doctors by ailment
router.get("/suggest/:ailment", async (req, res) => {
  try {
    const ailmentName = req.params.ailment.toLowerCase();

   
    const specialization = ailmentMap[ailmentName];
    if (!specialization) {
      return res.status(404).json({ message: "No specialization found for this ailment" });
    }

    const doctors = await Doctor.find({ specialization });
    if (doctors.length === 0) {
      return res.status(404).json({ message: "No doctors found for this specialization" });
    }

    res.json(doctors);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});



module.exports = router;
