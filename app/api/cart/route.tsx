import { ProductObject } from "@/app/types/ProductObject";
import mysql, { RowDataPacket } from "mysql2/promise";
import { NextResponse } from "next/server";
import { access } from "@/app/lib/data";


interface Cart extends RowDataPacket {
    cartID: number,
    cartItem: string,
    cartName: string,
    cartQuantity: number
}

export async function GET() {
    
    const conn = await mysql.createConnection(access);

    const sql = "SELECT * FROM cart";
    try {
        const [result] = await conn.query<Cart[]>(sql);

        if (result.length !== 0) {
            const cart : Array<{product: ProductObject, quantity: number}> = [];

        result.forEach((item) => {
                cart.push({product: JSON.parse(item.cartItem), quantity: item.cartQuantity});
        });
            
        await conn.end();
        return NextResponse.json({cart: cart}, {status: 200});
        }
    }
    catch(e) {
        console.log(`Error retrieving cart: ${e}`);
    }


    await conn.end();
    return NextResponse.json({cart: null}, {status: 200});
}

export async function POST(req: Request) {
    const res = await req.json();
    const product = res.product;


    const conn = await mysql.createConnection(access);

    try {
        const sql = `SELECT * FROM cart WHERE cartID=? AND cartItem=? AND cartName=?`;
        const execute = [product.id, JSON.stringify(product), product.title];
        const [result] = await conn.execute<RowDataPacket[]>(sql, execute);

        if (result.length === 0) {
            const sql = "INSERT INTO cart (cartID, cartItem, cartName, cartQuantity) VALUES (?,?,?,?)";
            const execute = [product.id, JSON.stringify(product), product.title, res.quantity];
            
            try {
                await conn.execute(sql, execute);
                console.log('Inserted cartItem');
            }
            catch(e) {
                console.log(`Error inserting cart item: ${e}`);
            }

            await conn.end();
            return NextResponse.json({message: "Added"}, {status: 200});
        }
        else {
            const sql = `UPDATE cart SET cartQuantity = cartQuantity + 1 WHERE cartID=? AND cartItem=? AND cartName=?`;
            const execute = [product.id, JSON.stringify(product), product.title];
            
            try {
                await conn.execute(sql, execute);
                console.log('Updated cartQuantity');
            }
            catch(e) {
                console.log(`Error on updating cart quantity: ${e}`);
            }

            await conn.end();
            return NextResponse.json({message: "Already added, incremented quantity"}, {status: 200});
        }
    }
    catch(e) {
        console.log(`Error on retrieving cart via post request: ${e}`);
    }

    await conn.end();
    return NextResponse.json({message: "Error"}, {status: 200});
}