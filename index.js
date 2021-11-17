const TelegramApi = require('node-telegram-bot-api');
const {keyboardOptions} = require('./options.js');
const {token} = require('./config')
const mongoose = require('mongoose')
const Task = require('./models/Task')
const DB_URL = ''


const bot = new TelegramApi(token, {polling: true});

const getData = async (chatId) => {
    await mongoose.connect(DB_URL)
    await bot.sendMessage(chatId, 'Enter the description of the task you want to be reminded off (e.g. call Bob, take meds, buy lettuce)', {
        reply_markup: {
            force_reply: true
        }
    })
    bot.on('message', async msg => {
        const task = msg.text;
        const chatId = msg.chat.id;
        await bot.sendMessage(chatId, 'In how many hours do you need this reminder?', keyboardOptions)
        bot.on('callback_query', async msg => {
            const timer = msg.data;

            const newtask = new Task({chatId: chatId, task: task, timer: timer})
            await newtask.save()
        })
    })
}

// Starting bots and defining what commands do
const start = () => {
    bot.setMyCommands([
        {command: '/start', description: 'Start the bot'}
    ])
    
    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;
    
        // Action for start command
        if (text === '/start') {
            return getData(chatId);
        }
    })
}

start();
