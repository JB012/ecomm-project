import mysql, { ConnectionOptions } from "mysql2/promise";
import { NextResponse } from "next/server";
import { access } from "@/app/lib/data";

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