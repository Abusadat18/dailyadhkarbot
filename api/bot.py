import logging
import os
from datetime import time
from telegram import Update
from telegram.ext import Application, CommandHandler, CallbackContext, JobQueue

# Retrieve the bot token from environment variables
BOT_TOKEN = os.getenv('BOT_TOKEN')

# Initialize logging
logging.basicConfig(format='%(asctime)s - %(name)s - %(levelname)s - %(message)s', level=logging.INFO)
logger = logging.getLogger(__name__)

# Define your reminder functions
async def reminder_a(context: CallbackContext) -> None:
    chat_id = context.job.context
    await context.bot.send_message(chat_id=chat_id, text="This is Reminder A!")

async def reminder_b(context: CallbackContext) -> None:
    chat_id = context.job.context
    await context.bot.send_message(chat_id=chat_id, text="This is Reminder B!")

async def reminder_c(context: CallbackContext) -> None:
    chat_id = context.job.context
    await context.bot.send_message(chat_id=chat_id, text="This is Reminder C!")

# Define the /start command handler
async def start(update: Update, context: CallbackContext) -> None:
    chat_id = update.message.chat_id
    await update.message.reply_text('Welcome! Reminders have been set up.')

    # Schedule reminders
    context.job_queue.run_daily(reminder_a, time(hour=4, minute=0), context=chat_id)
    context.job_queue.run_daily(reminder_b, time(hour=18, minute=0), context=chat_id)
    context.job_queue.run_repeating(reminder_c, interval=14400, first=0, context=chat_id)

def main() -> None:
    # Create the Application and pass it your bot's token
    application = Application.builder().token(BOT_TOKEN).build()

    # Create the JobQueue
    job_queue = application.job_queue

    # Add handlers
    application.add_handler(CommandHandler("start", start))

    # Start the Bot
    application.run_polling()

if __name__ == '__main__':
    main()
