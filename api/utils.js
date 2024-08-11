const { Telegraf } = require('telegraf');

const setWebhook = async () => {
    try {
        const bot = new Telegraf(process.env.BOT_TOKEN);
        await bot.telegram.setWebhook(`${process.env.BOT_URL}/api/bot`);
        console.log('Webhook set successfully');
    } catch (error) {
        console.error('Error setting webhook:', error);
    }
};

module.exports = {
    setWebhook
};
