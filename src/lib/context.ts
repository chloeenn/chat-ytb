//https://www.pinecone.io/learn/context-aware-chatbot-with-vercel-ai-sdk/

import { getEmbeddings } from "./embeddings";
import { Pinecone } from "@pinecone-database/pinecone";
type Metadata = {
    text: string;
};

export const getContext = async (query: string, fileKey: string, minScore = 0.7, maxTokens = 3000) => {
    // Get the embeddings of the input message
    const embedding = await getEmbeddings(query);

    // Retrieve the matches for the embeddings from the specified namespace
    if (!embedding) {
        throw new Error("Failed to retrieve embeddings for the given query.");
    }
    const matches = await getMatchesFromEmbeddings(embedding, fileKey);

    // Filter out the matches that have a score lower than the minimum score
    const qualifyingDocs = matches.filter((m) => m.score && m.score > minScore);

    let docs = matches ? qualifyingDocs.map(match => (match.metadata as Metadata).text) : [];

    // Join all the chunks of text together, truncate to the maximum number of tokens, and return the result
    return docs.join("\n").substring(0, maxTokens);
};

export const getMatchesFromEmbeddings = async (
    embeddings: number[],
    fileKey: string,
) => {
    const pc = new Pinecone({
        apiKey: process.env.PINECONE_API_KEY as string,
    });

    const pcIndex = await pc.index("chatytb");
    const namespace = pcIndex.namespace(fileKey.replace(/[^\x00-\x7F]+/g, ""));

    const queryRequest = {
        vector: embeddings,
        topK: 5,
        includeMetadata: true,
    };
    try {
        const queryResult = await namespace.query(queryRequest);
        return queryResult.matches || [];
    } catch (e) {
        console.log("Error querying embeddings: ", e);
        throw new Error(`Error querying embeddings: ${e}`);
    }
};
