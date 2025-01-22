import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const url = searchParams.get("url");

        if (!url) {
            return NextResponse.json({ error: "URL parameter is required" }, { status: 400 });
        }

        const requestURL = `https://www.youtube.com/oembed?url=${url}&format=json`;
        const result = await axios.get(requestURL);

        return NextResponse.json(result.data);
    } catch (error) {
        console.error("Error fetching YouTube data:", error);
        return NextResponse.json({ error: "Failed to fetch YouTube data" }, { status: 500 });
    }
}
