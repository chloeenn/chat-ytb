import { Pinecone } from '@pinecone-database/pinecone';
import { downloadFromS3 } from './s3-server';
import { RecursiveCharacterTextSplitter, } from "langchain/text_splitter";
const pc = new Pinecone({
    apiKey: `${process.env.PINECONE_API_KEY}`
});

export async function loadS3IntoPinecone(fileKey: string) {
    const transcript = await downloadFromS3(fileKey);

    const chunks = chunking(transcript as string);
    console.log(chunks)
    return chunks;
}

function chunking(data:string) {
    const chunkSize = 256;
    const chunkOverlap = 20;
  
    // Initialize the text splitter
    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize,
      chunkOverlap
    });
  
    // Split the data into chunks
    const chunks = splitter.splitText(data);
  
    return chunks;
}