const { Telegraf } = require('telegraf');
const { setReminders, handleReminderCommand } = require('./handlers').default;

const bot = new Telegraf(process.env.BOT_TOKEN);

// Function to set the webhook URL
const setWebhook = async () => {
    const webhookUrl = `https://dailyadhkarbot.vercel.app/api/bot`;
    try {
        const response = await bot.telegram.setWebhook(webhookUrl);
        console.log('Webhook set:', response);
    } catch (error) {
        console.error('Error setting webhook:', error);
    }
};

setWebhook(); // Call this to set the webhook on deployment

// Handle incoming updates
bot.on('text', (ctx) => {
    // For demonstration purposes, echo the received message
    ctx.reply(`You said: ${ctx.message.text}`);
});

module.exports = async (req, res) => {
    if (req.method === 'POST') {
        try {
            await bot.handleUpdate(req.body);
            res.status(200).send('OK');
        } catch (error) {
            console.error('Error handling update:', error);
            res.status(500).send('Error handling update');
        }
    } else {
        res.status(405).send('Method Not Allowed');
    }
};
