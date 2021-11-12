const TelegramApi = require('node-telegram-bot-api');
const {gameOptions, againOptions} = require('./options.js')

const token = '2019159605:AAFyEFYJU7bR8OvvBEi32aqGE3Hj2ASzasI'

const bot = new TelegramApi(token, {polling: true})


const startGame = async (chatId) => {
    await bot.sendMessage(chatId, 'options', gameOptions)
}

const start = () => {
    bot.setMyCommands([
        {command: '/start', description: 'Start the bot'},
        {command: '/info', description: 'Information about you'},
        {command: '/game', description: 'Start game'}
    ])
    
    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;
    
        if (text === '/start') {
        }
        if (text === '/info') {
        }
        if (text === '/game') {
            return startGame(chatId);
        }
        return bot.sendMessage(chatId, 'I dont understand you')
    })
    bot.on('callback_query', async msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id;
    })
}

start()