import { Pinecone, PineconeRecord } from '@pinecone-database/pinecone';
import { downloadFromS3 } from './s3-server';
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import md5 from "md5";
import { getEmbeddings } from './embeddings';

const pc = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY as string
});

export async function loadS3IntoPinecone(fileKey: string) {
    const transcript = await downloadFromS3(fileKey);
    const documents = await DocChunking(transcript as string);
    const pcIndex = pc.index("chatytb");
    const namespace = pcIndex.namespace(fileKey.replace(/[^\x00-\x7F]+/g, ""));
    await namespace.upsert(documents);
  
    return documents[0];
 
}
async function embeddedDocument(document: string, index: number) {
    try {
        const embeddings = await getEmbeddings(document);
        return {
            id: md5(document),
            values: embeddings,
            metadata: {
                text: document,
                chunkIndex: index,
            }
        } as PineconeRecord;
    } catch (error) {
        console.error(error);
    }
}
export const truncateStringByBytes = (str: string, bytes: number) => {
    const enc = new TextEncoder();
    return new TextDecoder("utf-8").decode(enc.encode(str).slice(0, bytes));
};

async function DocChunking(data: string) {
    const chunkSize = 256;
    const chunkOverlap = 10;

    const textSplitter = new RecursiveCharacterTextSplitter({
        chunkSize: chunkSize,
        chunkOverlap: chunkOverlap
    });

    const splitTexts = await textSplitter.createDocuments([data]);
    const chunks = splitTexts.map((chunk, index) => ({
        text: chunk.pageContent,
        metadata: {
            preview: truncateStringByBytes(chunk.pageContent, 100),
            chunkIndex: index,
        } 

    }));
    const embeddedChunks = await Promise.all(
        chunks.map((chunk, index) => embeddedDocument(chunk.text, index))
    ) ;

    return embeddedChunks.filter(chunk => chunk !== undefined);
}

