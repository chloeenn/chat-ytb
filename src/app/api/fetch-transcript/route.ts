// /app/api/fetch-transcript/route.ts
import { YoutubeTranscript } from 'youtube-transcript';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get("url");
  console.log("Received URL:", url);  
  if (!url) {
    return new Response(JSON.stringify({ error: "URL is required" }), { status: 400 });
  }

  try {
    const transcript = await YoutubeTranscript.fetchTranscript(url);
    let extractedText = transcript.map(item => item.text).join(" ");
    extractedText = extractedText.replace(/&amp;#39;/g, "'");
    extractedText = extractedText.replace(/\[Music\]/gi, "");
    return new Response(JSON.stringify(extractedText), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Something went wrong" }), { status: 500 });
  }
}
