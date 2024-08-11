const { Telegraf } = require('telegraf');
const bot = new Telegraf(process.env.BOT_TOKEN);

// Set the webhook URL using your Vercel project URL
const webhookUrl = `${process.env.BOT_URL}/api/bot`;

// Set webhook for Telegram to your Vercel endpoint
bot.telegram.setWebhook(webhookUrl);

bot.start((ctx) => ctx.reply('Welcome! Your bot is up and running.'));
bot.command('remind', (ctx) => ctx.reply('Reminder set!'));

// Handle incoming updates
module.exports = async (req, res) => {
    try {
        await bot.handleUpdate(req.body); // Handle the update from Telegram
        return res.status(200).send('OK'); // Send OK status
    } catch (error) {
        console.error('Error handling update:', error);
        return res.status(500).send('Error handling update'); // Send error status
    }
};
