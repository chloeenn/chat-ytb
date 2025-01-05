import { NextResponse } from "next/server";
export async function POST(req: Request, res: Response) {
    try {
        const body = await req.json();
        const {ytb_key, ytb_title} = body
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "internal server error" },
            { status: 500 }
    );
}
}