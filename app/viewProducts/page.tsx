'use client'
import { mdiMinus } from "@mdi/js";
import Icon from "@mdi/react";
import { useEffect, useState } from "react";
import ProductItem from "../components/ProductItem";
import { useSearchParams } from "next/navigation";
import { ProductObject } from "../types/ProductObject";
import Link from "next/link";


function getMostExpensiveProduct(products: ProductObject[], category: string) : number {
    return products.reduce((acc, product) => acc < (product.price - (product.price * (product.discountPercentage/100))) && 
    product.category === category ? (product.price - (product.price * (product.discountPercentage/100))) : acc, 0);
}

interface CategoryTitle {
    [key: string] : string;
}

export default function ViewProducts() {
    const searchParams = useSearchParams();
    const category = searchParams.get('category');

    const [products, setProducts] = useState(Array<ProductObject>);
    const [sliderValue, setSliderValue] = useState('100');

    const title : CategoryTitle = {"all": "Shop All", "beauty": "Beauty", "fragrances": "Fragrances", "furniture": "Furniture", "groceries": "Groceries",
        "home-decoration": "Home Decorations", "kitchen-accessories": "Kitchen Accessories", "mens-shirts": "Men's Shirts", "womens-shoes": "Women's Shoes"};
    
    useEffect(() => {
        const data = localStorage.getItem('products');
        if (typeof data === "string") {
            if (category === "all") {
                setProducts(JSON.parse(data));
            }
            else {
                const allProducts = JSON.parse(data) as Array<ProductObject>;
                const filteredData = allProducts.filter(product => product.category === category);
                const mostExpensivePrice = getMostExpensiveProduct(allProducts, category!);
                setProducts(filteredData);
                setSliderValue(Math.ceil(mostExpensivePrice).toString());
            }
        }
    }, [category]);

    return (
        <>
            {
                products.length !== 0 &&
                <div className="flex flex-col w-full">
                    <div className="flex text-4xl py-8 justify-center">
                        {title[category!]}
                    </div>
                    <div className="flex">
                        <div className="flex flex-col gap-10 pl-4">
                            <div className="flex flex-col">
                                <div className="text-2xl pb-2">Browse By</div>
                                <hr className="py-2"></hr>
                                <ul className="flex flex-col text-sm gap-1">
                                    <li><Link href={"/viewProducts?category=all"}>All Products</Link></li>
                                    <li><Link href={"viewProducts?category=beauty"}>Beauty</Link></li>
                                    <li><Link href={"viewProducts?category=fragrances"}>Fragrances</Link></li>
                                    <li><Link href={"viewProducts?category=furniture"}>Furniture</Link></li>
                                    <li><Link href={"viewProducts?category=groceries"}>Groceries</Link></li>
                                    <li><Link href={"viewProducts?category=kitchen-accessories"}>Kitchen Accessories</Link></li>
                                    <li><Link href={"viewProducts?category=home-decoration"}>Home Decorations</Link></li>
                                    <li><Link href={"viewProducts?category=womens-shoes"}>Women&apos;s Shoes</Link></li>
                                    <li><Link href={"viewProducts?category=mens-shirts"}>Men&apos;s Shirts</Link></li>
                                </ul>
                            </div>
                            <div className="flex flex-col">
                                <div className="text-2xl pb-4">Filter By</div>
                                <hr></hr>
                                <div className="flex flex-col py-4">
                                    <div className="flex justify-between">
                                        <div>Price</div>
                                        <div><Icon path={mdiMinus} size={1}/></div>
                                    </div>
                                    <div>
                                        <input className="slider" type="range" onChange={(e) => setSliderValue(e.target.value)} value={sliderValue} min={1} max={getMostExpensiveProduct(products, category!)} />
                                    </div>
                                    <div className="flex justify-between">
                                        <div>$1</div>
                                        <div>${sliderValue}</div>
                                    </div>
                                </div>
                                <hr></hr>
                            </div>
                        </div>
                        <div className="flex w-full flex-col px-8 pb-8 gap-2">
                            <div className="flex justify-between">
                                <div>{products.length} products</div>
                                <div className="flex">
                                    <div>Sort By:</div>    
                                    <select name="sort_options">
                                        <option value={'recommended'}>Recommended</option>
                                        <option value={'newest'}>Newest</option>
                                        <option value={'asc_price'}>Price (Low to High)</option>
                                        <option value={'desc_price'}>Price (High to Low)</option>
                                        <option value={'asc_name'}>Name (A-Z)</option>
                                        <option value={'desc_name'}>Name (Z-A)</option>
                                    </select>
                                </div>
                            </div>
                            <div className="products-container">
                                {
                                    products.map(product => {if ((product.price - (product.price * (product.discountPercentage/100))) <= Number(sliderValue)) {return <ProductItem key={product.id} product={product} />}})
                                }
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}