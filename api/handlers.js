const { Telegraf } = require('telegraf');
const schedule = require('node-schedule');

const bot = new Telegraf(process.env.BOT_TOKEN);

const reminders = {}; // Store reminders with chatId as key

// Function to set up daily reminders
const setReminders = () => {
    // Example: Schedule a daily reminder at 4 AM
    schedule.scheduleJob('0 4 * * *', async () => {
        for (const chatId in reminders) {
            await bot.telegram.sendMessage(chatId, 'Reminder: Time to check your tasks!');
        }
    });
};

// Handle the /start command
bot.start((ctx) => {
    ctx.reply('Welcome! Type /reminder to set a daily reminder.');
});

// Handle the /reminder command
bot.command('reminder', (ctx) => {
    const chatId = ctx.chat.id;
    reminders[chatId] = true; // Set reminder for the user
    ctx.reply('Reminder has been set.');
});

// Handle the /stop command
bot.command('stop', (ctx) => {
    const chatId = ctx.chat.id;
    delete reminders[chatId]; // Stop reminder for the user
    ctx.reply('Reminder has been stopped.');
});

module.exports = { setReminders, handleReminderCommand };
