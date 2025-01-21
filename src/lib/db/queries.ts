import 'server-only';


import { eq } from 'drizzle-orm';
import { db } from '.';
import { chats, Messages, messages } from './schema';

export async function getChatById({ id }: { id: string }) {
    try {
        const [selectedChat] = await db.select().from(chats).where(eq(chats.id, parseInt(id)));
        return selectedChat;
    } catch (error) {
        console.error('Failed to get chat by id from database');
        throw error;
    }
}

export async function saveMessages({ messagesArray }: { messagesArray: Array<Messages> }) {
    try {
        return await db.insert(messages).values(messagesArray);
    } catch (error) {
        console.error('Failed to save messages in database', error);
        throw error;
    }
}

export async function saveChat({
    userId,
    fileKey,
    ytbTitle,
    fileUrl,
    ytbUrl,
}: {
    userId: string;
    fileKey: string;
    ytbTitle: string;
    fileUrl?: string;
    ytbUrl?: string;
}) {
    try {
        return await db.insert(chats).values({
            fileKey,
            ytbTitle,
            userId,
            fileUrl,
            ytbUrl,
        });
    } catch (error) {
        console.error('Failed to save chat in database', error);
        throw error;
    }
}
