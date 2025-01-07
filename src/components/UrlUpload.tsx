"use client";
import React from 'react';
import { Send } from "lucide-react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { uploadToS3 } from '@/lib/db/s3';
const UrlUpload = () => {
    const [url, setUrl] = React.useState("");
    const handleSubmit = async () => {
        const regex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
        if (!regex.test(url)) {
            toast.error("Youtube URL is not valid");
            return;
        }
   
        try{
         // Send URL as a query parameter
         const response = await axios.get(`/api/fetch-transcript?url=${encodeURIComponent(url)}`);
        //  toast.success("Transcript fetched successfully!");
         const transcript = JSON.stringify(response.data);
         console.log(response.data); // The transcript
         const ytbID = url.split("v=")[1] || url.split("/").pop();
         const ytb_key = `transcripts/${ytbID}-${Date.now()}.txt`
         const result = await uploadToS3(transcript,ytb_key);
        //  toast.success(`Uploaded transcript to S3: ${ytb_key}`);
        }
        catch (error){
            toast.error("Failed to fetch transcript");
            console.error(error);
        }
        
    }
    return (
        <div className="w-full border border-slate-950 rounded-full m-2 p-1.5 flex ">
            <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Paste YouTube URL..."
                className="w-11/12 outline-none text-center items-inline truncate ml-4 mr-4"
            />
            <Send className="float-right mr-3.5 cursor-pointer hover:text-slate-600" onClick={() => handleSubmit()} />
        </div>
    )
}

export default UrlUpload