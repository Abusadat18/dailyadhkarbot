const { Telegraf } = require('telegraf');
const bot = new Telegraf(process.env.BOT_TOKEN);

// Directly set the webhook URL using your Vercel project URL
const webhookUrl = 'https://dailyadhkarbot.vercel.app/api/bot';

// Set webhook for Telegram to your Vercel endpoint
bot.telegram.setWebhook(webhookUrl);

bot.start((ctx) => ctx.reply('Welcome! Your bot is up and running.'));
bot.command('remind', (ctx) => ctx.reply('Reminder set!'));

bot.launch();

module.exports = bot;
