import { db } from '@/lib/db';
import { getChatById, saveChat, saveMessages } from '@/lib/db/queries';
import { auth } from '@clerk/nextjs/server';
import OpenAI from 'openai';
import { getContext } from '@/lib/context';
import { NextResponse } from 'next/server';
import { openai } from '@ai-sdk/openai';
import { generateId, createDataStreamResponse, streamText } from 'ai';

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
    console.log(`@api/chat`);
    try {
        const { messages, id }: { messages: Array<any>; id: string } = await req.json();

        // Authenticate the user
        const { userId } = await auth();
        if (!userId) {
          return new Response("Unauthorized", { status: 401 });
        }
        // const chat = getChatById({id});
        // const lastMessage = messages[messages.length - 1];
        // const context = await getContext(lastMessage.content, chat[0].fileKey);
        const context = "";
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
        return createDataStreamResponse({
            execute: dataStream => {
              dataStream.writeData('initialized call');
        
              const result = streamText({
                model: openai('gpt-4o'),
                messages,
                onChunk() {
                  dataStream.writeMessageAnnotation({ chunk: '123' });
                },
                onFinish() {
                  // message annotation:
                  dataStream.writeMessageAnnotation({
                    id: generateId(), // e.g. id from saved DB record
                    other: 'information',
                  });
        
                  // call annotation:
                  dataStream.writeData('call completed');
                },
              });
        
              result.mergeIntoDataStream(dataStream);
            },
            onError: error => {
              // Error messages are masked by default for security reasons.
              // If you want to expose the error message to the client, you can do so here:
              return error instanceof Error ? error.message : String(error);
            },
          });
        
        
    } catch (error) {
        console.error(error);
    }

}
