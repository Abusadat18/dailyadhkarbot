const { Telegraf } = require('telegraf');
const schedule = require('node-schedule');
const moment = require('moment-timezone');

const bot = new Telegraf(process.env.BOT_TOKEN);

const scheduleReminders = (chatId) => {
    // Convert IST times to UTC
    const convertToUTC = (timeStr) => {
        return moment.tz(timeStr, 'Asia/Kolkata').utc().format('HH:mm');
    };

    // Daily reminder A at 4 AM IST
    const reminderAUTC = convertToUTC('04:00');
    schedule.scheduleJob(`0 ${reminderAUTC} * * *`, () => {
        bot.telegram.sendMessage(chatId, 'Reminder A: Time to start your day!');
    });

    // Daily reminder B at 6 PM IST
    const reminderBUTC = convertToUTC('18:00');
    schedule.scheduleJob(`0 ${reminderBUTC} * * *`, () => {
        bot.telegram.sendMessage(chatId, 'Reminder B: Time for your evening check-in!');
    });

    // Every 4-hour reminder C
    schedule.scheduleJob('0 */4 * * *', () => { // Every 4 hours UTC
        bot.telegram.sendMessage(chatId, 'Reminder C: Four-hour check-in!');
    });
};

// Example webhook handler for updates
bot.on('text', (ctx) => {
    const chatId = ctx.chat.id;
    scheduleReminders(chatId);
});

bot.launch();
