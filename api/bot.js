const { Telegraf } = require('telegraf');
const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => ctx.reply('Welcome! Your bot is up and running.'));
bot.command('remind', (ctx) => ctx.reply('Reminder set!'));

// This function will set the webhook to your Vercel endpoint
bot.telegram.setWebhook(`${process.env.APP_URL}/api/bot`);
bot.startPolling();

// Handle webhook updates
bot.webhookCallback = (req, res) => {
  bot.handleUpdate(req.body);
  res.sendStatus(200);
};

bot.launch();

module.exports = bot;
