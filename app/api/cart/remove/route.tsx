import mysql, { ConnectionOptions } from "mysql2/promise";
import { NextResponse } from "next/server";

const access: ConnectionOptions = {
    user: process.env.DB_USER,
    database: process.env.DB_NAME
};


export async function POST(req: Request) {
    const res = await req.json();
    const product = res.product;
    const quantity = res.quantity;
    
    const conn = await mysql.createConnection(access);

    if (quantity > 1) {
        const sql = `UPDATE cart SET cartQuantity = cartQuantity - 1 WHERE cartQuantity=? AND cartItem=?`;
        const execute = [quantity, JSON.stringify(product)];

        try {
            await conn.execute(sql, execute);
            await conn.end();

            return NextResponse.json({message: "Decreased"}, {status: 200});
        }
        catch(e) {
            console.log(`Error on decreasing the quantity: ${e}`);
        }
    }
    else {
        const sql = `DELETE FROM cart WHERE cartItem=?`;
        const execute = [JSON.stringify(product)];

        try {
            await conn.execute(sql, execute);
            await conn.end();
            
            return NextResponse.json({message: "Deleted"}, {status: 200});
        }
        catch(e) {
            console.log(`Error on deleting cart item: ${e}`);
        }
    }

    await conn.end();
    return NextResponse.json({message: ""}, {status: 200});
     
}