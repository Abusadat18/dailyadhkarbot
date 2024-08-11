const TelegramBot = require('node-telegram-bot-api');
const { DateTime } = require('luxon');

// Retrieve the bot token from environment variables
const token = process.env.BOT_TOKEN;

// Create a bot instance
const bot = new TelegramBot(token, { polling: true });

// Handle the /start command
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Welcome! Reminders have been set up.');

    // Schedule reminders
    scheduleReminders(chatId);
});

// Function to schedule reminders
function scheduleReminders(chatId) {
    // Reminder A at 4 AM
    scheduleDailyReminder(chatId, 4, 'This is Reminder A!');

    // Reminder B at 6 PM
    scheduleDailyReminder(chatId, 18, 'This is Reminder B!');

    // Reminder C every 4 hours
    setInterval(() => {
        bot.sendMessage(chatId, 'This is Reminder C!');
    }, 4 * 60 * 60 * 1000); // every 4 hours
}

// Helper function to schedule daily reminders
function scheduleDailyReminder(chatId, hour, message) {
    const now = DateTime.local();
    const reminderTime = DateTime.local()
        .set({ hour, minute: 0, second: 0, millisecond: 0 })
        .toMillis();

    if (now.toMillis() > reminderTime) {
        // If it's already past today's reminder time, schedule for tomorrow
        reminderTime += 24 * 60 * 60 * 1000;
    }

    setTimeout(() => {
        bot.sendMessage(chatId, message);
        scheduleDailyReminder(chatId, hour, message);
    }, reminderTime - now.toMillis());
}
