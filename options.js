module.exports = {
    keyboardOptions: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{text: 'Type pill name', callback_data: '1'}],
            ]
        })
    },
    
}