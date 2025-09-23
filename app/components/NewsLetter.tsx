"use client"
import { FormEvent, useState } from "react"
import { sendEmail } from "../utils";

export default function NewsLetter() {
    const [input, setInput] = useState("");

    function handleSubmit(e : FormEvent<HTMLFormElement>) {
        e.preventDefault();
        fetch("api/send/newsletter", {method: "POST", body: JSON.stringify({email: input})});
    }
    return (
    <div id="news-container" className="flex flex-col items-center px-4 pb-12">
        <div className="text-3xl font-medium py-8">Subscribe to the Newsletter</div>
        <form onSubmit={handleSubmit}>
            <div className="flex items-center gap-4">
                <input className="w-64" type="email" id="email" placeholder="Enter your email" name="email" onChange={(e) => setInput(e.target.value)} value={input}/>
                <button>Subscribe</button>
            </div>
        </form>
    </div>)
}