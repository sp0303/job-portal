const { db } = require('./firebaseConfig'); 
const TelegramBot = require('node-telegram-bot-api');
const admin = require('firebase-admin');


// Replace with your token from BotFather
const token = process.env.TELEGRAM_BOT_TOKEN;

// Create bot instance
const bot = new TelegramBot(token, {polling: true});

// Basic commands
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Welcome to Job Portal Bot! Use /jobs to see latest listings');
});

// Fetch jobs from Firestore
bot.onText(/\/jobs/, async (msg) => {
  const chatId = msg.chat.id;
  
  try {
    const snapshot = await db.collection('jobs').limit(5).get();
    if (snapshot.empty) {
      return bot.sendMessage(chatId, 'No jobs available right now');
    }

    let response = 'Latest Job Listings:\n\n';
    snapshot.forEach(doc => {
      const job = doc.data();
      response += `🏢 ${job.company}\n` +
                 `💼 ${job.title}\n` +
                 `📍 ${job.location}\n` +
                 `🔗 ${job.applyLink || 'Apply via our website'}\n\n`;
    });

    bot.sendMessage(chatId, response);
  } catch (error) {
    bot.sendMessage(chatId, 'Error fetching jobs. Please try later.');
    console.error('Telegram bot error:', error);
  }
});

// Add job posting via Telegram
bot.onText(/\/postjob/, (msg) => {
  const chatId = msg.chat.id;
  
  // Send instructions
  bot.sendMessage(chatId, `Please send job details in this format:\n\n` +
    `Company Name\n` +
    `Job Title\n` +
    `Location\n` +
    `Salary\n` +
    `Description\n` +
    `Apply Link (optional)`);
    
  // Listen for the next message with job details
  bot.once('message', async (detailMsg) => {
    if (detailMsg.chat.id === chatId) {
      const text = detailMsg.text.split('\n');
      
      if (text.length < 3) {
        return bot.sendMessage(chatId, 'Invalid format. Please try again.');
      }

      try {
        const jobData = {
          company: text[0] || 'Not specified',
          title: text[1] || 'Not specified',
          location: text[2] || 'Remote',
          salary: text[3] || 'Negotiable',
          description: text[4] || '',
          applyLink: text[5] || '',
          postedAt: new Date(),
          postedBy: `telegram:${msg.from.username || msg.from.id}`
        };

        await db.collection('jobs').add(jobData);
        bot.sendMessage(chatId, '✅ Job posted successfully!');
      } catch (error) {
        console.error('Error posting job:', error);
        bot.sendMessage(chatId, '❌ Failed to post job. Please try again later.');
      }
    }
  });
});
bot.on('polling_error', (error) => {
  console.error('Telegram polling error:', error);
});
console.log('Telegram bot started...');