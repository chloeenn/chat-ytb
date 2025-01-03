"use client";
import React from 'react';
import { Send } from "lucide-react";

const UrlUpload = () => {
    const [url, setUrl] = React.useState("");
    const handleSubmit = () => {
        const regex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
        if(!regex.test(url)){
           alert("Youtube URL is not valid");
           return;
        }
        console.log(url);
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
            <Send className="float-right mr-3.5 cursor-pointer hover:text-slate-600" onClick={handleSubmit} />
        </div>
    )
}

export default UrlUpload
