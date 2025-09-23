"use client"
import { mdiMinus, mdiPlus, mdiTrashCan } from "@mdi/js";
import Icon from "@mdi/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ProductObject } from "../types/ProductObject";
import { getDiscountedPrice } from "../utils";
import Link from "next/link";

interface Prop {
    product: ProductObject, 
    quantity: number,
    subtractQuantityFromCart: (productID: number) => void;
    addQuantityToCartItem: (productID: number) => void;
}

export default function CartItem({product, quantity, subtractQuantityFromCart, addQuantityToCartItem}: Prop) {
    const [amount, setAmount] = useState(quantity);
    const [host, setHost] = useState("");

    function handleDecrease() {
        if (amount > 1) {
            setAmount(amount-1);
        }
    }

    useEffect(() => {
        if (host === "") { 
            setHost(window.location.origin);
        }
    }, [host]);

    return (
        <div className="flex items-center py-4 gap-4 w-full">
            <Image src={product.images[0]} alt={`Image of ${product.title}`} width='50' height='50' />
            <div className="flex w-full justify-between">
                <div className="flex flex-col">
                    <Link href={`${host}/products/${product.id}`}>{product.title}</Link>
                    <div className="flex gap-6">
                        {
                            amount > 1 ? <div className="cursor-pointer" onClick={() => {handleDecrease(); subtractQuantityFromCart(product.id)}}><Icon path={mdiMinus} size={1} /></div> :
                            <div className="cursor-pointer" onClick={() => {subtractQuantityFromCart(product.id)}}><Icon path={mdiTrashCan} size={1} /></div>
                        }
                        <div>{amount}</div>
                        <div className="cursor-pointer" onClick={() => {setAmount(amount + 1); addQuantityToCartItem(product.id)}}><Icon path={mdiPlus} size={1} /></div>
                    </div>
                </div>
                <div>
                    ${getDiscountedPrice(product).toFixed(2)}
                </div>
            </div>
        </div>
    )
}