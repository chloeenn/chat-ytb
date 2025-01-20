import { db } from "@/lib/db";
import { messages } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
export const POST = async (request: Request) => {
    const { chatId } = await request.json();
    const messagesData = await db.select().from(messages).where(eq(messages.chatId, chatId));
    return NextResponse.json(messagesData);
}