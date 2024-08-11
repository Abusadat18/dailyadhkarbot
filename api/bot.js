const { Telegraf } = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN);

// Command handlers
bot.start((ctx) => ctx.reply('Welcome!'));
bot.command('remindera', (ctx) => ctx.reply('Reminder A will trigger at 4 AM.'));
bot.command('reminderb', (ctx) => ctx.reply('Reminder B will trigger at 6 PM.'));
bot.command('reminderc', (ctx) => ctx.reply('Reminder C will trigger every 4 hours.'));

// This is the handler that processes incoming updates via the webhook
module.exports = async (req, res) => {
    if (req.method === 'POST') {
        try {
            await bot.handleUpdate(req.body); // Process the update
            res.status(200).send('OK');
        } catch (error) {
            console.error('Error handling update:', error);
            res.status(500).send('Error handling update');
        }
    } else {
        res.status(405).send('Method Not Allowed'); // Only allow POST requests
    }
};
