import 'server-only';


import { eq, } from 'drizzle-orm';
import { db } from '.';
import { chats, DrizzleChat, DrizzleMessage, messages } from './schema';
import { Message } from 'ai';

export async function getChatById(id: number) {
    try {
        const [selectedChat] = await db.select().from(chats).where(eq(chats.id, id));
        return selectedChat;
    } catch (error) {
        console.error('Failed to get chat by id from database');
        throw error;
    }
}
export async function saveMessage(message: DrizzleMessage, chatId:number) {
    try {
        console.log("save message: ",message )
        const messageData = {
            chatId, // Ensure the message is linked to a specific chat
            content: message.content,
            role: message.role,
        };

        await db.insert(messages).values(messageData);
    } catch (error) {
        console.error('Failed to save messages in database', error);
        throw error;
    }
}
