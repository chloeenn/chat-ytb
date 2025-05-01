// import { loadS3IntoPinecone } from "@/lib/pinecone";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { chats } from "@/lib/db/schema"
import { auth } from "@clerk/nextjs/server";
// import { getS3Url } from "@/lib/s3";
import { loadTranscriptIntoPineconeFromText } from "@/lib/pinecone";

export async function POST(req: Request) {
    const { userId } = await auth();
    const { file_key, file_name, ytb_url } = await req.json();
    if (!userId) {
        return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }

    try {
        const transcriptRes = await fetch(`http://localhost:8000/transcript?url=${encodeURIComponent(ytb_url)}`);
        if (!transcriptRes.ok) {
            return NextResponse.json({ error: "Transcript fetch failed" }, { status: 500 });
        }
    
        const transcriptData = await transcriptRes.json();
        const transcriptText = transcriptData.transcript || transcriptData;
    
        await loadTranscriptIntoPineconeFromText(transcriptText, file_key);
        const chat_id = await db.insert(chats).values({
            fileKey: file_key,
            ytbTitle: file_name,
            fileUrl: "", 
            userId: userId,
            ytbUrl: ytb_url,
        }).returning({
            insertedId: chats.id,
        });

        return NextResponse.json({ chat_id: chat_id[0].insertedId }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "internal server error" },
            { status: 500 }
        );
    }
}