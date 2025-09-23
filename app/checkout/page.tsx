"use client"
import { useEffect, useState } from "react";
import CartItem from "../components/CartItem";
import { ProductObject } from "../types/ProductObject";
import { getDiscountedPrice } from "../utils";
import CheckoutItem from "../components/CheckoutItem";

export default function Checkout() {
    const [cartItems, setCartItems] = useState(Array<{product: ProductObject, quantity: number}>)
    
    useEffect(() => {
        fetch(`${window.location.origin}/api/cart`).then(res => res.json()).then(data => {
            if (data.cart !== null) {
                setCartItems(data.cart);
            }
        });
    }, []);

    return (
        <form className="flex flex-col w-full px-3">
            <div className="text-3xl py-4">Checkout</div>
            <div className="flex gap-4 pb-8">
                <div className="flex flex-2 flex-col">
                    <fieldset>
                        <legend className="text-2xl">Your Information</legend>
                        <div className="flex flex-col w-72">
                            <div>Name</div>
                            <input className="bg-gray-100 outline outline-black" name="full_name"/>
                        </div>
                        <div className="flex flex-col w-72">
                            <div>Email</div>
                            <input className="bg-gray-100 outline outline-black" name="email" type="email" />
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
                    <button className="self-center">Confirm Order</button>
                    <div>After confirming the order, a receipt will be sent to the corresponding email</div>
                    <div className="flex justify-between">
                        <div>Total Cost:</div>
                        <div>${cartItems.reduce((acc, item) => acc + getDiscountedPrice(item.product), 0).toFixed(2)}</div>
                    </div>
                </fieldset>
            </div>
        </form>
    )
}