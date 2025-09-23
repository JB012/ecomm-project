import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
    const res = await req.json();
    const content = "Thank you for subscribing to the BuyMyStuff Newsletter! You'll receive daily deals, notifications on low-stock orders, and news on the latest and popular items!";

    const email = process.env.SMTP_EMAIL;
    const password = process.env.SMTP_PASSWORD;
    
    const transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: email,
            pass: password
        }
    });

    try {
        const testResult = await transport.verify();
        console.log(testResult);
    }
    catch(e) {
        console.log(e);
    }

    try {
        const sendResult = await transport.sendMail({
            from: email,
            to: res.email,
            subject: "BuyMyStuff Newsletter Subscription",
            html: content
        });
        
        console.log(sendResult);
        return NextResponse.json({response: sendResult});
    }
    catch(e) {
        return NextResponse.json({error: e});
    }
}