"use client";
import React from "react";
import { Send } from "lucide-react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { uploadToS3 } from "@/lib/s3";
import { useRouter } from "next/navigation";

interface YtbDataResponse {
    title: string;
}
const UrlUpload = () => {
    const [url, setUrl] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false); 
    const router = useRouter();

    const handleSubmit = async () => {
        const regex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
        if (!regex.test(url)) {
            toast.error("YouTube URL is not valid");
            return;
        }
        setIsLoading(true); 
        try {
            const response = await axios.get(`/api/fetch-transcript?url=${encodeURIComponent(url)}`);
            const transcript = JSON.stringify(response.data);

            const ytbID = url.split("v=")[1] || url.split("/").pop();
            const ytbKey = `${ytbID}-${Date.now()}`;

            await uploadToS3(transcript, `transcripts/${encodeURIComponent(ytbKey)}.txt`);

            const { data: ytbTitle } = await axios.get<YtbDataResponse>(`api/ytb-data?url=${url}`);

            try {
                const response = await axios.post("/api/create-chat", {
                    file_key: ytbKey,
                    file_name: ytbTitle.title,
                    ytb_url: url,
                });
                router.push(`/chat/${response.data.chat_id}`);
            } catch (error) {
                console.error("Error creating chat:", error);
                toast.error("Failed to create chat");
            }
        } catch (error) {
            console.error(error);
            toast.error("An error occurred while processing the URL");
        } finally {
            setIsLoading(false); 
        }
    };

    return (
        <div className="w-full border border-slate-950 rounded-full m-2 p-1.5 flex ">
            <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Paste YouTube URL..."
                className="w-11/12 outline-none text-center items-inline truncate ml-4 mr-4 bg-transparent border-none"
                disabled={isLoading} 
            />
            <button
                className="float-right mr-3.5 cursor-pointer hover:text-slate-600"
                onClick={handleSubmit}
                disabled={isLoading} 
            >
                {isLoading ? (
                    <div className="w-5 h-5 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div> // Loading spinner
                ) : (
                    <Send />
                )}
            </button>
        </div>
    );
};

export default UrlUpload;
