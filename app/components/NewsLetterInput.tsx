"use client"
import { useState } from "react";

export default function NewsLetterInput() {
    const [input, setInput] = useState("");
    
    return (
        <input required className="w-64" type="email" id="email" placeholder="Enter your email" name="email" onChange={(e) => setInput(e.target.value)} value={input}/>
    )
}