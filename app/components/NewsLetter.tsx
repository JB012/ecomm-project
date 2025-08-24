"use client"
import { useState } from "react"

export default function NewsLetter() {
    const [input, setInput] = useState("");

    return (
    <div id="news-container" className="flex flex-col items-center px-4 pb-12">
        <div className="text-3xl font-medium py-8">Subscribe to the Newsletter</div>
        <form>
            <div className="flex items-center gap-4">
                <input className="w-64" type="email" id="email" placeholder="Enter your email" name="email" onChange={(e) => setInput(e.target.value)} value={input}/>
                <button>Subscribe</button>
            </div>
        </form>
    </div>)
}