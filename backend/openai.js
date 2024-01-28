import OpenAI from "openai";
import dotenv from 'dotenv';

dotenv.config()

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})
const conversationHistory = [
    { role: 'system', content: 'You are a helpful assistant.' },
    { role: 'user', content: 'Who won the world series in 2020?' },
];
export async function sendMessage(message) {
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            max_tokens: 100,
            messages: conversationHistory.concat([{ role: 'user', content: message }]),
        });

        const assistantReply = response.choices.message;
        console.log(assistantReply);
        return response.choices[0].message.content
    } catch (error) {
        console.error('Error:', error);
    }
}
