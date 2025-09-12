"use client"
import { useEffect, useState } from "react";
import CartItem from "../components/CartItem";
import { ProductObject } from "../types/ProductObject";
import { getDiscountedPrice } from "../utils";

export default function Checkout() {
    const [cartItems, setCartItems] = useState(Array<{product: ProductObject, quantity: number}>)
    
    useEffect(() => {
        const cart = localStorage.getItem("cart");
        if (cart) {
            setCartItems(JSON.parse(cart));
        }
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
                            <input name="full_name"/>
                        </div>
                        <div className="flex flex-col w-72">
                            <div>Email</div>
                            <input name="email" type="email" />
                        </div>
                    </fieldset>
                    <fieldset>
                        <legend className="text-2xl">Your Order</legend>
                        <div className="flex flex-col">
                            {
                                cartItems.map((cartItem) => <CartItem />)
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
                        <div>$0.00</div>
                    </div>
                </fieldset>
            </div>
        </form>
    )
}