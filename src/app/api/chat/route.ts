import OpenAI from 'openai';

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, 
});

export async function POST(request: Request) {
    try {

        const response = await client.chat.completions.create({
            messages: [{ role: 'user', content: 'Say this is a test' }],
            model: 'gpt-4o-mini'
        }).asResponse();


    } catch (error) {
        console.error(error);
    }

}