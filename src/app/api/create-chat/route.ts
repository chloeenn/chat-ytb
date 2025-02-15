import { loadS3IntoPinecone } from "@/lib/pinecone";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { chats } from "@/lib/db/schema"
import { auth } from "@clerk/nextjs/server";
import { getS3Url } from "@/lib/s3";

export async function POST(req: Request) {
    const { userId } = await auth();
    const { file_key, file_name, ytb_url} = await req.json();
    if (!userId) {
        return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }
    try {
        await loadS3IntoPinecone(file_key);
        const chat_id = await db.insert(chats).values({
            fileKey: file_key,
            ytbTitle: file_name,
            fileUrl: getS3Url(file_key),
            userId: userId,
            ytbUrl: ytb_url,
        }).returning({
            insertedId: chats.id,
        })
        return NextResponse.json({ chat_id: chat_id[0].insertedId }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "internal server error" },
            { status: 500 }
        );
    }
}