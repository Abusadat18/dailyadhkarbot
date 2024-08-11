const { Telegraf } = require('telegraf');
const { handleStart, handleMessage } = require('./handlers');
const { setWebhook } = require('./utils');

const bot = new Telegraf(process.env.BOT_TOKEN);

// Set up webhook
setWebhook();

bot.start(handleStart);
bot.on('text', handleMessage);

module.exports = async (req, res) => {
    try {
        if (req.method === 'POST') {
            await bot.handleUpdate(req.body);
            return res.status(200).send('OK');
        } else {
            return res.status(405).send('Method Not Allowed');
        }
    } catch (error) {
        console.error('Error handling update:', error);
        res.status(500).send('Error handling update');
    }
};
