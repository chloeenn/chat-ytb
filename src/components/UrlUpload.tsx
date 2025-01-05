"use client";
import React from 'react';
import { Send } from "lucide-react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
const UrlUpload = () => {
    const [url, setUrl] = React.useState("");
    const handleSubmit = async () => {
        const regex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
        if (!regex.test(url)) {
            toast.error("Youtube URL is not valid");
            return;
        }
        // console.log(url);
        const requestUrl = `/api/fetch-transcript?url=${encodeURIComponent(url)}`;
        console.log("Request URL:", requestUrl);  // Log the URL to verify
    
        try{
         // Send URL as a query parameter
         const response = await axios.get(`/api/fetch-transcript?url=${encodeURIComponent(url)}`);
         toast.success("Transcript fetched successfully!");
         console.log(response.data); // The transcript
        }
        catch (error){
            toast.error("Failed to fetch transcript");
            console.error(error);
        }
        
    }
    return (
        <div className="w-full border border-slate-950 rounded-full m-2 p-1.5 ">
            <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Paste YouTube URL..."
                className="w-11/12 outline-none text-center"
            />
            <Send className="float-right mr-3.5 cursor-pointer hover:text-slate-600" onClick={() => handleSubmit()} />
        </div>
    )
}

export default UrlUpload