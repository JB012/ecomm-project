"use client"
import { mdiMinus, mdiPlus, mdiTrashCan } from "@mdi/js";
import Icon from "@mdi/react";
import Image from "next/image";
import { useState } from "react";
import Checkout from "./Checkout";

export default function CartItem() {
    const [amount, setAmount] = useState(1);
    return (
        <div className="flex items-center py-4 gap-4 w-full">
            <Icon path={mdiTrashCan} size={1} />
            <Image src='/image1.jpg' alt='Item Image' width='50' height='50' />
            <div className="flex w-full justify-between">
                <div className="flex flex-col">
                    <div>Name</div>
                    <div className="flex gap-6">
                        <div onClick={() => {if (amount > 0) setAmount(amount - 1)}}><Icon path={mdiMinus} size={1} /></div>
                        <div>{amount}</div>
                        <div onClick={() => setAmount(amount + 1)}><Icon path={mdiPlus} size={1} /></div>
                    </div>
                </div>
                <div>
                    $0.00
                </div>
            </div>
        </div>
    )
}