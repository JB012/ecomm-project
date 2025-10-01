"use client"
import { FormEvent, useState, useEffect } from "react"

export default function NewsLetter() {
    const [input, setInput] = useState("");
    const [buttonClick, setButtonClick] = useState(false);
    const [host, setHost] = useState("");

    useEffect(() => {
        if (host === "") {
            setHost(window.location.origin);
        }
    }, [host]);

    function handleSubmit(e : FormEvent<HTMLFormElement>) {
        e.preventDefault();
        fetch(`${host}/api/send/newsletter`, {method: "POST", body: JSON.stringify({email: input})});
    }
    return (
    <div id="news-container" className="flex flex-col items-center px-4 pb-12">
        <div className="text-3xl font-medium py-8">Subscribe to the Newsletter</div>
        <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                    <input disabled className="w-64" type="email" id="email" placeholder="Enter your gmail" name="email" onChange={(e) => setInput(e.target.value)} value={input}/>
                    <div className="hidden">Disabled for security reasons</div>
                    {buttonClick === false ? <button type="submit" onClick={() => setButtonClick(true)}>Subscribe</button> : <button className="pointer-events-none opacity-50 cursor-none">Subscribe</button>}
                </div>
                {
                    buttonClick === true ? <div>Thank you for subscribing, please check your email!</div> : <div></div>
                }
            </div>
        </form>
    </div>)
}