const { Telegraf } = require('telegraf');

// Initialize the bot with the token from environment variables
const bot = new Telegraf(process.env.BOT_TOKEN);

// Handle the "/start" command
bot.start((ctx) => {
  ctx.reply('Welcome! Your bot is working.');
});

// Other commands or message handling can go here

// Export the function to handle incoming updates
module.exports = (req, res) => {
  try {
    if (req.method !== 'POST') {
      return res.status(405).end(); // Method Not Allowed
    }

    // Handle the update from Telegram
    bot.handleUpdate(req.body, res);

    // Return a simple OK status after processing
    res.status(200).end();
  } catch (error) {
    console.error('Error handling update:', error);
    res.status(500).send('Error handling update'); // Send error status
  }
};
