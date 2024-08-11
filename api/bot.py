from telegram import Update
from telegram.ext import Application, CommandHandler, CallbackContext, JobQueue
import logging
from datetime import time

# Set up logging
logging.basicConfig(format='%(asctime)s - %(name)s - %(levelname)s - %(message)s', level=logging.INFO)

async def start(update: Update, context: CallbackContext) -> None:
    chat_id = update.message.chat_id
    await update.message.reply_text('Welcome! Reminders have been set up.')
    
    # Schedule daily reminders
    context.job_queue.run_daily(reminder_a, time(hour=15, minute=30), context=chat_id)
    context.job_queue.run_daily(reminder_b, time(hour=18, minute=0), context=chat_id)
    
    # Schedule repeating reminders every 4 hours
    context.job_queue.run_repeating(reminder_c, interval=14400, first=0, context=chat_id)

async def reminder_a(context: CallbackContext) -> None:
    job = context.job
    await context.bot.send_message(job.context, text='Reminder A: It’s 4 AM!')

async def reminder_b(context: CallbackContext) -> None:
    job = context.job
    await context.bot.send_message(job.context, text='Reminder B: It’s 6 PM!')

async def reminder_c(context: CallbackContext) -> None:
    job = context.job
    await context.bot.send_message(job.context, text='Reminder C: Time for a check-in!')

def main() -> None:
    application = Application.builder().token('YOUR_BOT_TOKEN').build()
    
    start_handler = CommandHandler('start', start)
    application.add_handler(start_handler)
    
    # Start the bot
    application.run_polling()

if __name__ == '__main__':
    main()
