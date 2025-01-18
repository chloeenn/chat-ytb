"use client";
import React from "react";
import { Send } from "lucide-react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { uploadToS3 } from "@/lib/s3";
import { useRouter } from "next/navigation";
import YtbData from "@/app/api/ytb-data/route";

const UrlUpload = () => {
    const [url, setUrl] = React.useState("");
    const router = useRouter();
    const handleSubmit = async () => {
        const regex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
        if (!regex.test(url)) {
            toast.error("YouTube URL is not valid");
            return;
        }

        try {
            const response = await axios.get(`/api/fetch-transcript?url=${encodeURIComponent(url)}`);
            const transcript = JSON.stringify(response.data);

            const ytbID = url.split("v=")[1] || url.split("/").pop();
            const ytbKey = `${ytbID}-${Date.now()}`;

            await uploadToS3(transcript, `transcripts/${ytbKey}.txt`);

            const ytbTitle = await YtbData(url);

            try {
                const response = await axios.post("/api/create-chat", {
                    file_key: ytbKey,
                    file_name: ytbTitle.title
                });
                console.log("Chat created successfully:", response.data);
                const chatId = response.data.id;
                router.push(`/chat/${chatId}`);
            } catch (error) {
                console.error("Error creating chat:", error);
                toast.error("Failed to create chat");
            }


        } catch (error) {
            toast.error("Failed to process the URL");
            console.error(error);
        }
    };

    return (
        <div className="w-full border border-slate-950 rounded-full m-2 p-1.5 flex w-1/3">
            <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Paste YouTube URL..."
                className="w-11/12 outline-none text-center items-inline truncate ml-4 mr-4"
            />
            <Send
                className="float-right mr-3.5 cursor-pointer hover:text-slate-600"
                onClick={handleSubmit}
            />
        </div>
    );
};

export default UrlUpload;
