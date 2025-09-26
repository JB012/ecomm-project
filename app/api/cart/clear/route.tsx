import mysql, { ConnectionOptions } from "mysql2/promise";
import { NextResponse } from "next/server";

const access: ConnectionOptions = {
    user: process.env.DB_USER,
    database: process.env.DB_NAME
};

export async function POST() {
    const conn = await mysql.createConnection(access);
    const sql = "TRUNCATE TABLE cart";
   
    try {
        await conn.execute(sql);

    }
    catch(e) {
        console.log(`Error clearing out the table: ${e}`);
    }

    await conn.end();
    return NextResponse.json({message: "Cleared"}, {status: 200});
     
}