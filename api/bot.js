const { Telegraf } = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => ctx.reply('Welcome!'));

bot.command('remind', (ctx) => {
  // Handle reminder command
  ctx.reply('Reminder set!');
});

bot.launch();

module.exports = bot;
