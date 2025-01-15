import { Pinecone } from '@pinecone-database/pinecone';
import { downloadFromS3 } from './s3-server';
import { RecursiveCharacterTextSplitter, } from "langchain/text_splitter";

import { metadata } from '@/app/layout';
const pc = new Pinecone({
    apiKey: `${process.env.PINECONE_API_KEY}`
});

export async function loadS3IntoPinecone(fileKey: string) {
    const transcript = await downloadFromS3(fileKey);
    const documents = chunking(transcript as string);


    return documents;
}
export const truncateStringByBytes = (str: string, bytes: number) => {
    const enc = new TextEncoder();
    return new TextDecoder("utf-8").decode(enc.encode(str).slice(0, bytes));
};

async function chunking(data: string) {
    const chunkSize = 256;
    const chunkOverlap = 10;

    const textSplitter = new RecursiveCharacterTextSplitter({
        chunkSize: chunkSize,
        chunkOverlap: chunkOverlap
    });

    const splitTexts = await textSplitter.createDocuments([data]);
    const chunks = splitTexts.map((chunk, index) => ({
        text: chunk.pageContent, 
        preview: truncateStringByBytes(chunk.pageContent, 100),
        chunkIndex: index, 
    }));

    return chunks;
}