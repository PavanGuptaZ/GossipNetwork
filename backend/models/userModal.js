import mongoose from "mongoose";

const aiChatModal = new mongoose.Schema({
    role: {
        type: String,
        enum: ["system", "user", "assistant"],
        required: true
    },
    content: {
        type: String,
        required: true
    }
})

const userModal = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 30
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    profileIcons: {
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
    aiChatMessages: [aiChatModal]
}, { timestamps: true })

export default new mongoose.model('user', userModal)
