const schedule = require('node-schedule');

// Define reminder job schedules
const scheduleReminders = (chatId) => {
    // Daily reminder A
    schedule.scheduleJob('0 4 * * *', () => { // Every day at 4 AM
        bot.telegram.sendMessage(chatId, 'Reminder A: Time to start your day!');
    });

    // Daily reminder B
    schedule.scheduleJob('0 18 * * *', () => { // Every day at 6 PM
        bot.telegram.sendMessage(chatId, 'Reminder B: Time for your evening check-in!');
    });

    // Every 4-hour reminder C
    schedule.scheduleJob('0 */4 * * *', () => { // Every 4 hours
        bot.telegram.sendMessage(chatId, 'Reminder C: Four-hour check-in!');
    });
};

// Handle /start command
const handleStart = async (ctx) => {
    const chatId = ctx.chat.id;
    await ctx.reply('Welcome! I am your reminder bot.');

    // Schedule reminders for the chatId
    scheduleReminders(chatId);
};

// Handle messages
const handleMessage = async (ctx) => {
    // Example: echo received messages
    await ctx.reply(`You said: ${ctx.message.text}`);
};

module.exports = {
    handleStart,
    handleMessage
};
