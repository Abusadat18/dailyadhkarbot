// handlers.js

import { Telegraf } from 'telegraf';
import { start } from './bot'; // Import the bot instance

// This function will handle the '/start' command
const handleStartCommand = (ctx) => {
    ctx.reply('Welcome! Use /reminder to set a reminder.');
};

// Register the '/start' command handler
start(handleStartCommand);

export default { bot };
