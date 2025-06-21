const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");

admin.initializeApp();
const db = admin.firestore();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Telegram Bot Webhook Handler
app.post("/telegramBot", async (req, res) => {
  res.sendStatus(200);
  const TelegramBot = require("node-telegram-bot-api");
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const bot = new TelegramBot(token, {polling: false});

  const update = req.body;
  const msg = update.message;
  if (!msg || !msg.text) return;

  const chatId = msg.chat.id;
  const text = msg.text.trim();

  if (text === "/start") {
    return bot.sendMessage(
        chatId,
        "Welcome to Job Portal Bot!\nUse /jobs to see latest listings",
    );
  }

  if (text === "/jobs") {
    try {
      const snapshot = await db
          .collection("jobs")
          .orderBy("postedAt", "desc")
          .limit(5)
          .get();

      if (snapshot.empty) {
        return bot.sendMessage(chatId, "No jobs available right now");
      }

      let response = "📋 *Latest Job Listings:*\n\n";
      snapshot.forEach((doc) => {
        const job = doc.data();
        response +=
        `🏢 *${job.company}*\n` +
        `💼 ${job.title}\n` +
        `📍 ${job.location}\n` +
        `🔗 [View Job Details](https://job-portal-sp.web.app/jobs/${doc.id})\n\n`;
      });

      bot.sendMessage(chatId, response, {parse_mode: "Markdown"});
    } catch (err) {
      console.error("Error fetching jobs:", err);
      bot.sendMessage(
          chatId,
          "❌ Error fetching jobs. Please try again later.",
      );
    }
  }


  if (text === "/postjob") {
    bot.sendMessage(
        chatId,
        "Send job details:\nCompany\nTitle\nLocation\nSalary\n" +
      "Description\nApply Link (optional)",
    );

    bot.once("message", async (detailMsg) => {
      if (detailMsg.chat.id !== chatId) return;

      const lines = detailMsg.text.split("\n");
      if (lines.length < 3) {
        return bot.sendMessage(chatId, "❌ Invalid format. Try again.");
      }

      try {
        const jobData = {
          company: lines[0] || "Not specified",
          title: lines[1] || "Not specified",
          location: lines[2] || "Remote",
          salary: lines[3] || "Negotiable",
          description: lines[4] || "",
          applyLink: lines[5] || "",
          postedAt: new Date(),
          postedBy: `telegram:${
            detailMsg.from.username || detailMsg.from.id
          }`,
        };

        await db.collection("jobs").add(jobData);
        bot.sendMessage(chatId, "✅ Job posted successfully!");
      } catch (err) {
        console.error("Error posting job:", err);
        bot.sendMessage(chatId, "❌ Failed to post job.");
      }
    });
  }
});

// ✅ REST API Routes
app.get("/api/hello", (req, res) => {
  res.send("Hello from Firebase Function!");
});

app.get("/api/jobs", async (req, res) => {
  try {
    const snapshot = await db.collection("jobs").get();
    const jobs = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      postedAt: doc.data().postedAt?.toDate?.() instanceof Date ?
        doc.data().postedAt.toDate().toISOString() :
        doc.data().postedAt,
    }));
    res.json(jobs);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get("/api/jobs/:id", async (req, res) => {
  try {
    const doc = await db.collection("jobs").doc(req.params.id).get();
    if (!doc.exists) return res.status(404).send("Job not found");
    res.json({
      id: doc.id,
      ...doc.data(),
      postedAt: doc.data().postedAt?.toDate?.() instanceof Date ?
        doc.data().postedAt.toDate().toISOString() :
        doc.data().postedAt,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.post("/api/jobs", async (req, res) => {
  try {
    const job = {
      ...req.body,
      postedAt: new Date(),
    };
    const docRef = await db.collection("jobs").add(job);
    res.json({id: docRef.id, ...job});
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.put("/api/jobs/:id", async (req, res) => {
  try {
    const jobRef = db.collection("jobs").doc(req.params.id);
    await jobRef.update({...req.body, updatedAt: new Date()});
    res.status(200).json({message: "Job updated successfully"});
  } catch (error) {
    res.status(500).send("Failed to update job");
  }
});

app.delete("/api/jobs/:id", async (req, res) => {
  try {
    await db.collection("jobs").doc(req.params.id).delete();
    res.status(200).json({message: "Job deleted successfully"});
  } catch (error) {
    res.status(500).send("Failed to delete job");
  }
});

// ✅ Export the unified function
exports.api = functions.https.onRequest(app);
