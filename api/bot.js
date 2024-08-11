const { Telegraf } = require('telegraf');

// Retrieve the bot token from environment variables
const token = process.env.BOT_TOKEN;

if (!token) {
    console.error('BOT_TOKEN environment variable is not set.');
    process.exit(1);
}

const bot = new Telegraf(token);

// Handle the /start command
bot.command('start', (ctx) => {
    ctx.reply('Welcome! Reminders have been set up.');
});

// Handle messages from channels
bot.on('channel_post', (ctx) => {
    ctx.reply('Received a post in the channel.');
});

// Start the bot
bot.launch();

console.log('Bot is up and running.');

// Export the function for Vercel
module.exports = async (req, res) => {
    bot.handleUpdate(req.body); // Process incoming updates
    res.status(200).send('OK');
};
