import { ProductObject } from '@/app/types/ProductObject';
import { NextResponse } from 'next/server';
import mysql, { ConnectionOptions, RowDataPacket } from 'mysql2/promise';

interface Product extends RowDataPacket {
  productItem: string,
  productID: number,
  productName: string
}

export async function GET() {
  const access: ConnectionOptions = {
    user: process.env.DB_USER,
    database: process.env.DB_NAME
  };

  const conn = await mysql.createConnection(access);

  const sql = 'SELECT * FROM products WHERE productID IS NOT NULL OR productName IS NOT NULL OR productItem IS NOT NULL';
  const [result] = await conn.query<Product[]>(sql);
  
  
  if (result.length === 0) {
    const products : Array<ProductObject> = (await (await fetch('https://dummyjson.com/products?limit=0')).json())["products"];
    
    try {
      for (const product of products) {
        const sql = 'INSERT INTO products (productID, productName, productItem) VALUES (?, ?, ?)';
        const execute = [product.id, product.title, JSON.stringify(product)]
        await conn.execute(sql, execute);
      }
    }
    catch(e) {
      console.log(`Error inserting product: ${e}`);
    }

    await conn.end();
    return NextResponse.json({message: "Products are already added to the database", products: products}, {status: 200});
  }
  else {
    const allProducts : Array<ProductObject> = [];

    result.forEach((product) => {
      allProducts.push(JSON.parse(product.productItem));
    });

    await conn.end();
    return NextResponse.json({message: "Products are already added to the database", products: allProducts}, {status: 200});
  }
}