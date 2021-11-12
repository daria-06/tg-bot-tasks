const TelegramApi = require('node-telegram-bot-api');
const {gameOptions, againOptions} = require('./options.js')

const token = '2019159605:AAFyEFYJU7bR8OvvBEi32aqGE3Hj2ASzasI'

const bot = new TelegramApi(token, {polling: true})

const chats = {}

const startGame = async (chatId) => {
    await bot.sendMessage(chatId, 'I\'ll think of number 1-9')
    const randomNumber = Math.floor(Math.random() * 10)
    chats[chatId] = randomNumber;
    await bot.sendMessage(chatId, 'Guess it!', gameOptions)
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
            await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/972/d03/972d03b1-80b4-43ac-8063-80e62b150d91/2.webp')
            return bot.sendMessage(chatId, 'hewwo');
        }
        if (text === '/info') {
            return bot.sendMessage(chatId, `Your name is ${msg.from.first_name} ${msg.from.last_name}`)
        }
        if (text === '/game') {
            return startGame(chatId);
        }
        return bot.sendMessage(chatId, 'I dont understand you')
    })
    bot.on('callback_query', async msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id;
        if (data === '/again') {
            return startGame(chatId);
        }
        if (data === chats[chatId]) {
            return bot.sendMessage(chatId, `You guessed number ${chats[chatId]} correctly!`, againOptions)
        } else {
            return bot.sendMessage(chatId, `You did not win, bot was thinking of ${chats[chatId]}`, againOptions)
        }
    })
}

start()