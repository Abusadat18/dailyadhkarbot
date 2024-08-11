// handlers.js

const bot = require('./bot'); // Import the bot instance

// This function will handle the '/start' command
const handleStartCommand = (ctx) => {
    ctx.reply('Welcome! Use /reminder to set a reminder.');
};

// Register the '/start' command handler
bot.start(handleStartCommand);

module.exports = { bot };
