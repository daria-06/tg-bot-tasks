module.exports = {
    keyboardOptions: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{text: '1 hour', callback_data: '1'}, {text: '2 hours', callback_data: '2'}, {text: '3 hous', callback_data: '3'}],
            ]
        })
    },
    
}