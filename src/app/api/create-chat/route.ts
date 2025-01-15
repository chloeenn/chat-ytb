import { loadS3IntoPinecone } from "@/lib/pinecone";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { chats } from "@/lib/db/schema"
import { auth } from "@clerk/nextjs/server";
export async function POST(req: Request, res: Response) {
    const {userId} = await auth();
    try {
        const body = await req.json();
        const { ytb_key, ytb_url } = body;
        await loadS3IntoPinecone(ytb_key);
        const chat_id = await db.insert(chats).values({
            ytbKey: ytb_key,
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