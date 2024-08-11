const { Telegraf } = require('telegraf');
const bot = new Telegraf(process.env.BOT_TOKEN);

// Set the webhook URL using your Vercel project URL
const webhookUrl = `${process.env.BOT_URL}/api/bot`;

// Set webhook for Telegram to your Vercel endpoint
bot.telegram.setWebhook(webhookUrl);

bot.start((ctx) => ctx.reply('Welcome! Your bot is up and running.'));
bot.command('remind', (ctx) => ctx.reply('Reminder set!'));

// Launch bot (only necessary if running locally; not required in Vercel deployment)
if (process.env.NODE_ENV !== 'production') {
    bot.launch();
}

// Handle incoming updates
module.exports = (req, res) => {
    bot.handleUpdate(req.body);
    res.sendStatus(200);
};
