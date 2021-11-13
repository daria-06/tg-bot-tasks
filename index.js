const TelegramApi = require('node-telegram-bot-api');
const {keyboardOptions} = require('./options.js')

const token = '2019159605:AAFyEFYJU7bR8OvvBEi32aqGE3Hj2ASzasI'

const bot = new TelegramApi(token, {polling: true})


const startBot = async (chatId) => {
    await bot.sendMessage(chatId, 'What pills do you take? (enter one name)', keyboardOptions)
}

const start = () => {
    bot.setMyCommands([
        {command: '/start', description: 'Start the bot'},
        {command: '/set', description: 'Set timer'}
    ])
    
    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;
        console.log(text)
    
        if (text === '/start') {
            return startBot(chatId);
        }
        return bot.sendMessage(chatId, 'I dont understand you')
    })
    bot.on('callback_query', async msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id;
    })
}

start()