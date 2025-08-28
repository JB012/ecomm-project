"use client"

import { mdiClose } from "@mdi/js";
import Icon from "@mdi/react";
import { useState } from "react";

export default function Checkout() {
    const [input, setInput] = useState("");
    
    return (
        <form className="flex w-[500px] h-[500px]">
            <Icon className="flex justify-end" path={mdiClose} size={1}/>
            <input value={input} placeholder="Enter email address" onChange={(e) => setInput(e.target.value)} />
            <div className="flex justify-between">
                <button type="reset">Reset</button>
                <button>Submit Order</button>
            </div>
        </form>
    )
}