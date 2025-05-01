# main.py
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from youtube_transcript_api import YouTubeTranscriptApi
import uvicorn

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/transcript")
async def get_transcript(url: str):
    try:
        video_id = url.split("v=")[-1]
        transcript = YouTubeTranscriptApi.get_transcript(video_id)
        text = " ".join([item["text"] for item in transcript])
        text = text.replace("&amp;#39;", "'").replace("[Music]", "")
        return {"transcript": text}
    except Exception as e:
        return {"error": str(e)}

# Run it using: uvicorn main:app --reload
