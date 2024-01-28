import mongoose from "mongoose";

const chatBlock = new mongoose.Schema({
    messageBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    content: {
        type: String,
        required: true
    }
})

const chatModal = new mongoose.Schema({
    users: {
        type: [mongoose.Schema.Types.ObjectId],
        required: true,
        validate: {
            validator: function (value) {
                return value.length === 2
            },
            message: 'For Chat Required exactly 2 People'
        },
        ref: "user"
    },
    chatIcons: {
        type: Number,
        min: 1,
        max: 10,
        default: 1
    },
    status: {
        type: String,
        enum: ['online', 'offline', 'busy', 'dnd', 'boring', 'idel', 'entertainment', 'working'],
        default: 'online'
    },
    chat: [chatBlock]
}, { timestamps: true })

export default new mongoose.model('chats', chatModal)
