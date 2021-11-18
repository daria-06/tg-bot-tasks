const {Schema, model} = require('mongoose')

const Task = new Schema ({
    chatId: {type: Number, required: true},
    task: {type: String, required: true},
    timer: {type: Number, required: true},
    date: {type: Date, required: true}
})

module.exports = model('Task', Task)