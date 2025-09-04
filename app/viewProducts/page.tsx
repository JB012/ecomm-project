'use client'
import { mdiMinus } from "@mdi/js";
import Icon from "@mdi/react";
import { useEffect, useState } from "react";
import ProductItem from "../components/ProductItem";
import { useSearchParams } from "next/navigation";
import { ProductObject } from "../types/ProductObject";

export default function ViewProducts() {
    const searchParams = useSearchParams();
    const category = searchParams.get('category');

    const [products, setProducts] = useState(Array<ProductObject>);
    const [sliderValue, setSliderValue] = useState('100');

    useEffect(() => {
        const data = localStorage.getItem('products');
        if (typeof data === "string") {
            if (category === "all") {
                setProducts(JSON.parse(data));
            }
            else {
                const allProducts = JSON.parse(data) as Array<ProductObject>;
                const filteredData = allProducts.filter(product => product.category === category);
                setProducts(filteredData);
            }
        }
    }, [category]);

    return (
        <>
            {
                products.length !== 0 &&
                <div className="flex flex-col w-full">
                    <div className="flex text-4xl py-8 justify-center">
                        {category === "all" ? "Shop All" : category}
                    </div>
                    <div className="flex">
                        <div className="flex flex-col gap-10 pl-4">
                            <div className="flex flex-col">
                                <div className="text-2xl pb-2">Browse By</div>
                                <hr className="py-2"></hr>
                                <ul>
                                    <li>All Products</li>
                                    <li>Beauty</li>
                                    <li>Fragrances</li>
                                    <li>Groceries</li>
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
                                        <input className="slider" type="range" onChange={(e) => setSliderValue(e.target.value)} value={sliderValue} min={1} max={100} />
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
                                <div>100 products</div>
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
                                    products.map(product => <ProductItem key={product.id} thumbnail={product.thumbnail} title={product.title} price={product.price}  />)
                                }
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}