'use client'
import { mdiMinus } from "@mdi/js";
import Icon from "@mdi/react";
import { useEffect, useState } from "react";
import ProductItem from "../components/ProductItem";
import { useSearchParams } from "next/navigation";
import { ProductObject } from "../types/ProductObject";
import Link from "next/link";
import { getDiscountedPrice } from "../utils";
import { useRouter } from "next/navigation";

function getMostExpensiveProduct(products: ProductObject[]) : number {
    return products.reduce((acc, product) => acc < (product.price - (product.price * (product.discountPercentage/100))) && 
    acceptableCategories(product) ? (product.price - (product.price * (product.discountPercentage/100))) : acc, 0);
}

function acceptableCategories(product: ProductObject) : boolean {
    if (product.category === "all" || product.category === "beauty" || product.category === "fragrances" || product.category === "furniture" || product.category === "groceries"
        || product.category === "home-decoration" || product.category === "kitchen-accessories" || product.category === "mens-shirts" || product.category === "womens-shoes") {
        return true;
    }

    return false;
}

interface CategoryTitle {
    [key: string] : string;
}

export default function ViewProducts() {
    const searchParams = useSearchParams();
    const category = searchParams.get('category');
    const sort = searchParams.get('sort');
    const router = useRouter();
    const [products, setProducts] = useState(Array<ProductObject>);
    const [sortProducts, setSortProducts] = useState(sort);
    const [sliderValue, setSliderValue] = useState('100');

    const title : CategoryTitle = {"all": "Shop All", "beauty": "Beauty", "fragrances": "Fragrances", "furniture": "Furniture", "groceries": "Groceries",
        "home-decoration": "Home Decorations", "kitchen-accessories": "Kitchen Accessories", "mens-shirts": "Men's Shirts", "womens-shoes": "Women's Shoes"};
    

    function changeURL(sortValue: string) {
        router.replace(`viewProducts?category=${category}&sort=${sortValue}`);
    }

    useEffect(() => {
       fetch(`${window.location.origin}/api/products`).then(res => res.json()).then(data => {
        const products = data.products.filter((product : ProductObject) => acceptableCategories(product));
        
        if (category === "all") {
            setProducts(products);
        }
        else {
            const filteredData = products.filter((product : ProductObject) => product.category === category);
            setProducts(filteredData);
        }

        const mostExpensivePrice = getMostExpensiveProduct(products);
        setSliderValue(Math.ceil(mostExpensivePrice).toString());
        setSortProducts(sort);
       });
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
                            <div className="flex left-0 top-0 sticky pt-25 gap-8 flex-col">
                                <div className="flex flex-col">
                                    <div className="text-2xl pb-2">Browse By</div>
                                    <hr className="py-2"></hr>
                                    <ul className="flex flex-col text-sm gap-1">
                                        <li><Link href={"/viewProducts?category=all&sort=asc_name"}>All Products</Link></li>
                                        <li><Link href={"viewProducts?category=beauty&sort=asc_name"}>Beauty</Link></li>
                                        <li><Link href={"viewProducts?category=fragrances&sort=asc_name"}>Fragrances</Link></li>
                                        <li><Link href={"viewProducts?category=furniture&sort=asc_name"}>Furniture</Link></li>
                                        <li><Link href={"viewProducts?category=groceries&sort=asc_name"}>Groceries</Link></li>
                                        <li><Link href={"viewProducts?category=kitchen-accessories&sort=asc_name"}>Kitchen Accessories</Link></li>
                                        <li><Link href={"viewProducts?category=home-decoration&sort=asc_name"}>Home Decorations</Link></li>
                                        <li><Link href={"viewProducts?category=womens-shoes&sort=asc_name"}>Women&apos;s Shoes</Link></li>
                                        <li><Link href={"viewProducts?category=mens-shirts&sort=asc_name"}>Men&apos;s Shirts</Link></li>
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
                                            <input className="slider" type="range" onChange={(e) => setSliderValue(e.target.value)} value={sliderValue} min={1} max={getMostExpensiveProduct(products)} />
                                        </div>
                                        <div className="flex justify-between">
                                            <div>$1</div>
                                            <div>${sliderValue}</div>
                                        </div>
                                    </div>
                                    <hr></hr>
                                </div>
                            </div>
    
                        </div>
                        <div className="flex w-full flex-col px-8 pb-8 gap-2">
                            <div className="flex justify-between">
                                <div>{products.length} products</div>
                                <div className="flex">
                                    <div>Sort By:</div>    
                                    <select value={sortProducts!} onChange={(e) => {setSortProducts(e.target.value); changeURL(e.target.value)}} name="sort_options">
                                        <option value={'asc_name'}>Name (A-Z)</option>
                                        <option value={'desc_name'}>Name (Z-A)</option>
                                        <option value={'asc_price'}>Price (Low to High)</option>
                                        <option value={'desc_price'}>Price (High to Low)</option>
                                        <option value={'best_sellers'}>Best Sellers</option>
                                        <option value={'highest_discount'}>Highest Discount</option>
                                    </select>
                                </div>
                            </div>
                            <div className="products-container">
                                {
                                    sortProducts === "asc_name" && products.sort((a, b) => a.title.localeCompare(b.title)).map(product => {if (getDiscountedPrice(product) <= Number(sliderValue)) {return <ProductItem key={product.id} product={product} />}})
                                }
                                {
                                    sortProducts === "desc_name" && products.sort((a, b) => b.title.localeCompare(a.title)).map(product => {if (getDiscountedPrice(product) <= Number(sliderValue)) {return <ProductItem key={product.id} product={product} />}})
                                }
                                {
                                    sortProducts === "asc_price" && products.sort((a, b) => getDiscountedPrice(a) - getDiscountedPrice(b)).map(product => {if (getDiscountedPrice(product) <= Number(sliderValue)) {return <ProductItem key={product.id} product={product} />}})
                                }
                                {
                                    sortProducts === "desc_price" && products.sort((a, b) => getDiscountedPrice(b) - getDiscountedPrice(a)).map(product => {if (getDiscountedPrice(product) <= Number(sliderValue)) {return <ProductItem key={product.id} product={product} />}})
                                }
                                {
                                    sortProducts === "best_sellers" && products.sort((a, b) => b.rating - a.rating).map(product => {if (getDiscountedPrice(product) <= Number(sliderValue)) {return <ProductItem key={product.id} product={product} />}})
                                }
                                {
                                    sortProducts === "highest_discount" && products.sort((a, b) => b.discountPercentage - a.discountPercentage).map(product => {if (getDiscountedPrice(product) <= Number(sliderValue)) {return <ProductItem key={product.id} product={product} />}})
                                }
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}