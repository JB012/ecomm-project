"use client"
import { useEffect, useState } from "react"
import CartItem from "../components/CartItem"
import Link from "next/link"
import { ProductObject } from "../types/ProductObject";
import { getDiscountedPrice } from "../utils";

let key = 0;

export default function Cart() {
    const [cartItems, setCartItems] = useState(Array<{product: ProductObject, quantity: number}>);

    useEffect(() => {
        const cart = localStorage.getItem("cart");
        if (cart !== null) {
            setCartItems(JSON.parse(cart));        
        }
    }, []);
    
    function subtractQuantityFromCart(productID : number) {
        const productIndex = cartItems.findIndex((item) => item.product.id === productID);

        if (productIndex !== -1) {
            if (cartItems[productIndex].quantity > 1) {
                cartItems[productIndex].quantity -= 1;

                localStorage.setItem("cart", JSON.stringify(cartItems));
                setCartItems(cartItems);
            }
            else {
                const filteredCart = cartItems.filter((item) => item.product.id !== productID);
            
                localStorage.setItem("cart", JSON.stringify(filteredCart));
                setCartItems(filteredCart);
            }  
        }
    }

    function addQuantityToCartItem(productID : number) {
        const productIndex = cartItems.findIndex((item) => item.product.id === productID);
        if (productIndex !== -1) {
            cartItems[productIndex].quantity += 1;

            localStorage.setItem("cart", JSON.stringify(cartItems));
            setCartItems(cartItems);
        }
    }

    return (
        <div className="flex flex-col px-4 py-4 w-full h-full">
            <div className="text-3xl">Cart</div>
            <div className="flex py-3 justify-end">
                <Link href='/checkout'><button>Checkout</button></Link>
            </div>
            <div className="flex justify-between">
                <div>Items</div>
                <div>Price</div>
            </div>
            <div className="flex flex-col">
               {
                cartItems.map((item) => <CartItem key={++key} subtractQuantityFromCart={subtractQuantityFromCart} addQuantityToCartItem={addQuantityToCartItem} product={item.product} quantity={item.quantity}/>)
               }
            </div>
            <div className="items-end">
                <hr></hr>
                <div className="flex pt-4 justify-end">
                    Total ({cartItems.length} Item): ${cartItems.reduce((acc, item) => acc + getDiscountedPrice(item.product), 0).toFixed(2)}
                </div>
            </div>
        </div>
    )
}