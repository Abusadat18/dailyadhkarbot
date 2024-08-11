// handlers.js

const { Telegraf } = require('telegraf');
const bot = require('./bot'); // Import the bot instance

// This function will handle the '/start' command
const handleStartCommand = (ctx) => {
    ctx.reply('Welcome! Use /reminder to set a reminder.');
};

// This function will handle the '/reminder' command
const handleReminderCommand = async (ctx) => {
    const chatId = ctx.chat.id;
    const message = ctx.message.text;

    // Parse the reminder details from the message
    const parts = message.split(' ');
    if (parts.length < 2) {
        ctx.reply('Usage: /reminder <time> <message>');
        return;
    }

    const time = parts[1];
    const reminderMessage = parts.slice(2).join(' ');

    // Here you would add code to schedule a reminder
    ctx.reply(`Reminder set for ${time}: ${reminderMessage}`);
};

// Register command handlers
bot.command('start', handleStartCommand);
bot.command('reminder', handleReminderCommand);

module.exports = { bot };
