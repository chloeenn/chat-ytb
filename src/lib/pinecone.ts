import { Pinecone, PineconeRecord } from '@pinecone-database/pinecone';
import { downloadFromS3 } from './s3-server';
import { TextLoader } from "langchain/document_loaders/fs/text";
import { Document, RecursiveCharacterTextSplitter } from "@pinecone-database/doc-splitter";
import md5 from "md5";
import { getEmbeddings } from './embeddings';

const pc = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY as string
});

export async function loadS3IntoPinecone(fileKey: string) {
    const transcriptFile = await downloadFromS3(fileKey);
    const loader = new TextLoader(transcriptFile as string);
    const transcript = (await loader.load()) as Document[];
    const documents = await Promise.all(
        transcript.map((doc) => DocChunking(doc, fileKey))
      );
    const vectors = await Promise.all(
        documents.flat().map((doc) => embeddedDocument(doc, fileKey))
      );
    const pcIndex = pc.index("chatytb");
    const namespace = pcIndex.namespace(fileKey.replace(/[^\x00-\x7F]+/g, ""));
    await namespace.upsert( vectors);
    return documents[0];
}

async function embeddedDocument(document: Document,fileKey:string) {
    try {
        const embeddings = await getEmbeddings(document.pageContent);
        return {
            id: md5(document.pageContent),
            values: embeddings,
            metadata: {
                text: document.pageContent,
                fileKey,
            }
        } as PineconeRecord;
    } catch (error) {
        console.log('error calling openai embeddings api', error);
    throw error;
    }
}

export const truncateStringByBytes = (str: string, bytes: number) => {
    const enc = new TextEncoder();
    return new TextDecoder("utf-8").decode(enc.encode(str).slice(0, bytes));
};

async function DocChunking(data: Document,fileKey:string) {
    const chunkSize = 1024;
    const chunkOverlap = 20;

    const textSplitter = new RecursiveCharacterTextSplitter({
        chunkSize: chunkSize,
        chunkOverlap: chunkOverlap,
    });

    const pageContent = data.pageContent;
    const metadata = data.metadata;

    const docs = await textSplitter.splitDocuments([
        new Document({
            pageContent,
            metadata: {
                url: metadata?.source,
                text: truncateStringByBytes(pageContent, 36000),
                fileKey,
            },
        }),
    ]);

    return docs;
}
