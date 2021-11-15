const TelegramApi = require('node-telegram-bot-api');
const {keyboardOptions} = require('./options.js');

const token = '2019159605:AAFyEFYJU7bR8OvvBEi32aqGE3Hj2ASzasI';

const bot = new TelegramApi(token, {polling: true});

const tasks = {}

const getData = async (chatId) => {
    await bot.sendMessage(chatId, 'Enter the description of the task you want to be reminded off (e.g. call Bob, take meds, buy lettuce)', {
        reply_markup: {
            force_reply: true
        }
    })
    bot.on('message', async msg => {
        const task = msg.text;
        const chatId = msg.chat.id;
        tasks[chatId] = task;
        await bot.sendMessage(chatId, 'In how many hours do you need this reminder?', keyboardOptions)
        bot.on('callback_query', async msg => {
            const data = msg.data;
            tasks['timer'] = data
            console.log(data)
            console.log(tasks)
        })
        
        console.log(task);
        console.log(tasks);
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
        //bot.on('callback_query', async msg => {
        //const data = msg.data;
        //const chatId = msg.message.chat.id;
    //})
}

start();