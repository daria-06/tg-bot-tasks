module.exports = {
    gameOptions: {
        reply_markup: JSON.stringify({
            keyb: [
                [{text: 'Set timer', callback_data: '1'}, {text: 'View current timers', callback_data: '2'}],
            ]
        })
    },
    
}