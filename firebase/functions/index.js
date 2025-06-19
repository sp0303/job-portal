const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");

admin.initializeApp();
const db = admin.firestore();

const app = express();
app.use(cors());
app.use(express.json());

// 🔁 Sample test route
app.get("/api/hello", (req, res) => {
  res.send("Hello from Firebase Function!");
});

// 🔁 Get all jobs
app.get("/api/jobs", async (req, res) => {
  try {
    const snapshot = await db.collection("jobs").get();
    const jobs = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      postedAt:
        doc.data().postedAt &&
        typeof doc.data().postedAt.toDate === "function" ?
          doc.data().postedAt.toDate().toISOString() :
          doc.data().postedAt,
    }));
    res.json(jobs);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// 🔁 Get a single job
app.get("/api/jobs/:id", async (req, res) => {
  try {
    const doc = await db.collection("jobs").doc(req.params.id).get();
    if (!doc.exists) return res.status(404).send("Job not found");
    res.json({
      id: doc.id,
      ...doc.data(),
      postedAt:
        doc.data().postedAt &&
        typeof doc.data().postedAt.toDate === "function" ?
          doc.data().postedAt.toDate().toISOString() :
          doc.data().postedAt,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// 🔁 Post a new job
app.post("/api/jobs", async (req, res) => {
  try {
    const {
      title, company, location, salary, description, applyLink,
      about, rating, type, responsibilities, education,
      applyInstructions, postedDate, aiSuggestion,
      experience, skills, ambienceBoxRating, glassdoorRating,
    } = req.body;

    const newJob = {
      title,
      company,
      location,
      salary: salary || "Not specified",
      description,
      applyLink: applyLink || "#",
      about: about || "No company description provided",
      rating: rating || 0,
      type: type || "Full-time",
      responsibilities: responsibilities || "Not specified",
      education: education || "Not specified",
      applyInstructions: applyInstructions || "Apply via link",
      postedDate: postedDate || new Date().toISOString(),
      aiSuggestion: aiSuggestion || "",
      experience: experience || "Not specified",
      skills: Array.isArray(skills) ? skills : [],
      ambienceBoxRating: ambienceBoxRating || 0,
      glassdoorRating: glassdoorRating || 0,
      postedAt: new Date(),
    };

    const docRef = await db.collection("jobs").add(newJob);
    res.json({id: docRef.id, ...newJob});
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// 🔁 Update job
app.put("/api/jobs/:id", async (req, res) => {
  try {
    const jobRef = db.collection("jobs").doc(req.params.id);
    const jobDoc = await jobRef.get();

    if (!jobDoc.exists) return res.status(404).send("Job not found");

    const {
      title, company, location, salary, description, applyLink,
      about, rating, type, responsibilities, education,
      applyInstructions, postedDate, aiSuggestion,
      experience, skills, ambienceBoxRating, glassdoorRating,
    } = req.body;

    const updatedJob = {
      title,
      company,
      location,
      salary,
      description,
      applyLink,
      about,
      rating,
      type,
      responsibilities,
      education,
      applyInstructions,
      postedDate,
      aiSuggestion,
      experience,
      skills: Array.isArray(skills) ? skills : [],
      ambienceBoxRating,
      glassdoorRating,
      updatedAt: new Date(),
    };

    await jobRef.update(updatedJob);
    res.status(200).json({message: "Job updated successfully", ...updatedJob});
  } catch (error) {
    console.error("Error updating job:", error);
    res.status(500).send("Failed to update job");
  }
});

// 🔁 Delete job
app.delete("/api/jobs/:id", async (req, res) => {
  try {
    const jobRef = db.collection("jobs").doc(req.params.id);
    const jobDoc = await jobRef.get();

    if (!jobDoc.exists) return res.status(404).send("Job not found");

    await jobRef.delete();
    res.status(200).json({message: "Job deleted successfully"});
  } catch (error) {
    console.error("Error deleting job:", error);
    res.status(500).send("Failed to delete job");
  }
});

// 🔁 Export API
exports.api = functions.https.onRequest(app);
