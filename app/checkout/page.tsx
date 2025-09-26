"use client"
import { FormEvent, useEffect, useState } from "react";
import { ProductObject } from "../types/ProductObject";
import { getDiscountedPrice } from "../utils";
import CheckoutItem from "../components/CheckoutItem";
import { redirect } from 'next/navigation'

export default function Checkout() {
    const [cartItems, setCartItems] = useState(Array<{product: ProductObject, quantity: number}>)
    const [clicked, setClicked] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        fetch(`${window.location.origin}/api/cart`).then(res => res.json()).then(data => {
            if (data.cart !== null) {
                setCartItems(data.cart);
            }
        });

        function handleInterval() {
            const intervalID = setInterval(() => {
                if (clicked && name !== "" && email !== "") {
                    clearInterval(intervalID);
                    fetch('api/cart/clear', {method: "POST"});
                    redirect("/");
                }
               
            }, 10000);
        }
        
        handleInterval();
    }, [clicked, name, email]);

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        fetch("api/send/checkout", {method: "POST", body: JSON.stringify({name: name, email: email, cartItems: cartItems})})
    }

    function handleClick() {
        if (name !== "" && email !== "") {
            setClicked(true);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col w-full px-3">
            <div className="text-3xl py-4">Checkout</div>
            <div className="flex gap-4 pb-8">
                <div className="flex flex-2 flex-col">
                    <fieldset>
                        <legend className="text-2xl my-2">Your Information</legend>
                        <div className="flex flex-col w-72">
                            <div>Name</div>
                            <input required onChange={(e) => setName(e.target.value)} value={name} className="bg-gray-100 outline outline-black" name="full_name"/>
                        </div>
                        <div className="flex flex-col w-72">
                            <div>Email</div>
                            <input required onChange={(e) => setEmail(e.target.value)} value={email} className="bg-gray-100 outline outline-black" name="email" type="email" />
                        </div>
                    </fieldset>
                    <fieldset>
                        <legend className="text-2xl">Your Order</legend>
                        <div className="flex flex-col">
                            {
                                cartItems.map((cartItem) => <CheckoutItem key={cartItem.product.id} product={cartItem.product} quantity={cartItem.quantity} />)
                            }
                        </div>
                    </fieldset>
                </div>    
                <fieldset className="flex w-24 flex-1 text-center flex-col">
                    <legend className="self-start text-start">Confirmation</legend>
                    <button onClick={() => handleClick()} type="submit" className="self-center">Confirm Order</button>
                    <div>After confirming the order, a receipt will be sent to the corresponding email</div>
                    <div className="flex justify-between">
                        <div>Total Cost:</div>
                        <div>${cartItems.reduce((acc, item) => acc + getDiscountedPrice(item.product), 0).toFixed(2)}</div>
                    </div>
                    { clicked && name !== "" && email !== "" &&
                    <div className="py-8">
                        Thank you for your purchase! Please check your email for the order confirmation. You&apos;ll be redirected to the home page shortly.
                    </div> 
                    }
                </fieldset>
            </div>
        </form>
    )
}