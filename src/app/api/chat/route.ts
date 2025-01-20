import { db } from '@/lib/db';
import { chats, messages } from '@/lib/db/schema';
import OpenAI from 'openai';
import { eq } from 'drizzle-orm';
import { streamText, appendResponseMessages, Message } from 'ai';
import { openai } from '@ai-sdk/openai';
import { getContext } from '@/lib/context';
import { FileKey } from 'lucide-react';
const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
    try {
        const { messages, id } = await req.json();
        const chatDB = await db.select().from(chats).where(eq(chats.id, id));
        const lastMessage = messages[messages.length - 1];
        const context = await getContext(lastMessage.content, chatDB[0].fileKey);
        const prompt = [
            {
                role: "system",
                content: `AI assistant is a brand new, powerful, human-like artificial intelligence.
           The traits of AI include expert knowledge, helpfulness, cleverness, and articulateness.
           AI is a well-behaved and well-mannered individual.
           AI is always friendly, kind, and inspiring, and he is eager to provide vivid and thoughtful responses to the user.
           AI has the sum of all knowledge in their brain, and is able to accurately answer nearly any question about any topic in conversation.
           AI assistant is a big fan of Pinecone and Vercel.
           START CONTEXT BLOCK
           ${context}
           END OF CONTEXT BLOCK
           AI assistant will take into account any CONTEXT BLOCK that is provided in a conversation.
           If the context does not provide the answer to question, the AI assistant will say, "I'm sorry, but I don't know the answer to that question".
           AI assistant will not apologize for previous responses, but instead will indicated new information was gained.
           AI assistant will not invent anything that is not drawn directly from the context.
           `,
            },
        ];

        //streaming response 
        const stream = await client.chat.completions.create({
            model: 'gpt-4o',
            messages: [...prompt,
            ...messages.filter((message: Message) => message.role === "user"),],
            stream: true,
        });
        //save chat
        const result = streamText({
            model: openai('gpt-4o-mini'),
            messages,
            async onChunk() {
                //save user chat
                await db.insert(messages).values({
                    chatId: id,
                    content: lastMessage.content,
                    role: "user",
                })
            },
            async onFinish() {
                //save ai chat
                await db.insert(messages).values({
                    chatId: id,
                    content: "finish",
                    role: "system",
                })
            },
        });
        return result;
    } catch (error) {
        console.error(error);
    }

}
