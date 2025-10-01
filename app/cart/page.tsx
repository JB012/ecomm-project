"use client"
import { useEffect, useState } from "react"
import CartItem from "../components/CartItem"
import Link from "next/link"
import { ProductObject } from "../types/ProductObject";
import { getDiscountedPrice } from "../utils";
import { addCartItem , subtractCartItem, getCart} from "../lib/data";

let key = 0;

export default function Cart() {
    const [cartItems, setCartItems] = useState(Array<{product: ProductObject, quantity: number}>);
    const [host, setHost] = useState("");

    useEffect(() => {
    fetch(`${window.location.origin}/api/cart`).then(res => res.json()).then(data => {
        if (data.cart !== null) {
            setCartItems(data.cart);
        }

        if (host === "") {
            setHost(window.location.origin);
        }
    });
    }, [host]);

    
    async function subtractQuantityFromCart(productID : number) {
        const productIndex = cartItems.findIndex((item) => item.product.id === productID);

        if (productIndex !== -1) {
            cartItems[productIndex].quantity -= 1;
            subtractCartItem(cartItems[productIndex].product, cartItems[productIndex].quantity);

            setCartItems(await getCart());
        }
    }

    function addQuantityToCartItem(productID : number) {
        const productIndex = cartItems.findIndex((item) => item.product.id === productID);
        if (productIndex !== -1) {
            cartItems[productIndex].quantity += 1;
            
            addCartItem(cartItems[productIndex].product, cartItems[productIndex].quantity);
        }
    }

    return (
        <div className="flex flex-col px-4 py-4 w-full h-full">
            <div className="text-3xl">Cart</div>
            <div className="flex py-3 justify-end">
                {cartItems.length > 0 ? <Link href={`${host}/checkout`}><button>Checkout</button></Link> : <button className="!bg-gray-400 text-gray-300">Checkout</button>}
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
                    Total ({cartItems.length} Items): ${cartItems.reduce((acc, item) => acc + getDiscountedPrice(item.product), 0).toFixed(2)}
                </div>
            </div>
        </div>
    )
}