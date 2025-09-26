import { ProductObject } from "@/app/types/ProductObject";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { getDiscountedPrice } from "@/app/utils";

export async function POST(req: Request) {
    const res = await req.json();
    const name = res.name;
    const cartItems = res.cartItems;
    const email = process.env.SMTP_EMAIL;
    const password = process.env.SMTP_PASSWORD;
    let content = `Thanks for your order, ${name}!<br>Your Order:<br>`;
    let table = "<table><tr><th>Item</th><th>Quantity</th><th>Shipping</th><th>Price</th></tr>";


    cartItems.forEach((cartItem : {product : ProductObject, quantity: number}) => table += `<tr><td>${cartItem.product.title}</td><td>${cartItem.quantity}</td><td>${cartItem.product.shippingInformation}</td><td>$${getDiscountedPrice(cartItem.product).toFixed(2)}</td></tr>`);
    
    const fullPrice = cartItems.reduce((acc : number, elem : {product : ProductObject, quantity: number}) => acc + getDiscountedPrice(elem.product) , 0);
    
    table += `<tr><td>Total Items</td><td>${cartItems.length}</td><td></td><td>$${fullPrice.toFixed(2)}</td></tr></table>`
    content += table;
    const transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: email,
            pass: password
        }
    });

    try {
        await transport.verify();
    }
    catch(e) {
        console.log(e);
    }

    try {
        const sendResult = await transport.sendMail({
            from: email,
            to: res.email,
            subject: "BuyMyStuff Order",
            html: content
        });
        
        console.log(sendResult);
        return NextResponse.json({response: sendResult});
    }
    catch(e) {
        return NextResponse.json({error: e});
    }
}