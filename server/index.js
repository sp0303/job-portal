const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Initialize Firebase and Telegram bot
const { db } = require('./firebaseConfig');
require('./telegramBot');

const app = express();
app.use(cors());
app.use(express.json());

// Create sample job (run once)
async function createSampleJob() {
  const jobsRef = db.collection('jobs');
  await jobsRef.add({
    title: "Frontend Developer",
    company: "Tech Corp",
    location: "Remote",
    salary: "$80,000 - $100,000",
    description: "Looking for React experts",
    postedAt: new Date(),
    applyLink: "https://example.com/apply",
    // New fields added to match AddJob.jsx
    about: "A leading tech company specializing in web development",
    rating: 4.5,
    type: "Full-time",
    responsibilities: "Develop and maintain web applications using React",
    education: "Bachelor's degree in Computer Science or related field",
    applyInstructions: "Submit your resume and portfolio",
    postedDate: new Date().toISOString(),
    aiSuggestion: "This candidate is a good match based on skills",
    experience: "3-5 years",
    skills: ["React", "JavaScript", "HTML", "CSS"],
    ambienceBoxRating: 4.2,
    glassdoorRating: 4.3
  });
  console.log("Sample job created!");
}
// Uncomment to run once:
// createSampleJob();

// ===== API Routes =====

// Get all jobs
app.get('/api/jobs', async (req, res) => {
  try {
    const snapshot = await db.collection('jobs').get();
    const jobs = snapshot.docs.map(doc => ({ 
      id: doc.id, 
      ...doc.data(),
      // Convert Firestore Timestamp to ISO string if needed
      postedAt: doc.data().postedAt.toDate ? doc.data().postedAt.toDate().toISOString() : doc.data().postedAt
    }));
    res.json(jobs);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Get a single job by ID
app.get('/api/jobs/:id', async (req, res) => {
  try {
    const doc = await db.collection('jobs').doc(req.params.id).get();
    if (!doc.exists) {
      return res.status(404).send('Job not found');
    }
    res.json({ 
      id: doc.id, 
      ...doc.data(),
      // Convert Firestore Timestamp to ISO string if needed
      postedAt: doc.data().postedAt.toDate ? doc.data().postedAt.toDate().toISOString() : doc.data().postedAt
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Create a new job
app.post('/api/jobs', async (req, res) => {
  try {
    const {
      title, company, location, salary, description, applyLink,
      about, rating, type, responsibilities, education,
      applyInstructions, postedDate, aiSuggestion,
      experience, skills, ambienceBoxRating, glassdoorRating
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
      postedAt: new Date()
    };

    const docRef = await db.collection('jobs').add(newJob);
    res.json({ id: docRef.id, ...newJob });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Update (Edit) a job by ID
app.put('/api/jobs/:id', async (req, res) => {
  try {
    const jobRef = db.collection('jobs').doc(req.params.id);
    const jobDoc = await jobRef.get();

    if (!jobDoc.exists) {
      return res.status(404).send('Job not found');
    }

    const {
      title, company, location, salary, description, applyLink,
      about, rating, type, responsibilities, education,
      applyInstructions, postedDate, aiSuggestion,
      experience, skills, ambienceBoxRating, glassdoorRating
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
      updatedAt: new Date()
    };

    await jobRef.update(updatedJob);
    res.status(200).json({ message: 'Job updated successfully', ...updatedJob });
  } catch (error) {
    console.error('Error updating job:', error);
    res.status(500).send('Failed to update job');
  }
});

// Delete a job by ID
app.delete('/api/jobs/:id', async (req, res) => {
  try {
    const jobRef = db.collection('jobs').doc(req.params.id);
    const jobDoc = await jobRef.get();

    if (!jobDoc.exists) {
      return res.status(404).send('Job not found');
    }

    await jobRef.delete();
    res.status(200).json({ message: 'Job deleted successfully' });
  } catch (error) {
    console.error('Error deleting job:', error);
    res.status(500).send('Failed to delete job');
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));