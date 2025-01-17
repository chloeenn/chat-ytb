import {Configuration, OpenAIApi} from "openai-edge";

const config = new Configuration({
    apiKey: process.env.AI_API_KEY,
})
const openai = new OpenAIApi(config);
export async function getEmbeddings(text: string){
    try{
        const embedding = await openai.createEmbedding({
            model: "text-embedding-ada-002",
            input: text,
        })
        const result = await embedding.json();
        return result.data[0].embedding as number[];
    }catch(error){
        console.error(error);
    }
    
}
