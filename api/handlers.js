const { JobQueue } = require('telegraf');

// Define jobQueue globally
const jobQueue = new JobQueue();

// Handle /start command
const handleStart = async (ctx) => {
    const chatId = ctx.chat.id;
    await ctx.reply('Welcome! I am your reminder bot.');
    
    // Add jobs for reminders
    jobQueue.add(() => ctx.reply('Reminder A: Time to start your day!'), {
        interval: 24 * 60 * 60 * 1000, // daily
        startTime: new Date(Date.now() + 5 * 60 * 1000), // start in 5 minutes for testing
    });
    jobQueue.add(() => ctx.reply('Reminder B: Time for your evening check-in!'), {
        interval: 24 * 60 * 60 * 1000, // daily
        startTime: new Date(Date.now() + 5 * 60 * 1000), // start in 5 minutes for testing
    });
    jobQueue.add(() => ctx.reply('Reminder C: Four-hour check-in!'), {
        interval: 4 * 60 * 60 * 1000, // every 4 hours
        startTime: new Date(Date.now() + 5 * 60 * 1000), // start in 5 minutes for testing
    });
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
