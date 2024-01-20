const mongoose = require('mongoose')

const chatHistorySchema = mongoose.Schema(
    {
        input: {
            type: String,
            required: true,
        },
        response: {
            type: String,
            required: true,
        },
    },
)


const ChatHistory = mongoose.model('chatHistory', chatHistorySchema);

module.exports = ChatHistory;
