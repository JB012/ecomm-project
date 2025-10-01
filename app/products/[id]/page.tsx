"use client"
import Image from "next/image"
import Icon from "@mdi/react"
import { mdiArrowLeft, mdiPlus, mdiStar } from "@mdi/js"
import { use, useEffect, useState } from "react"
import Review from "../../components/Review"
import Link from "next/link"
import '../../globals.css';
import { ProductObject } from "../../types/ProductObject"
import { useRouter } from "next/navigation"
import { getDiscountedPrice } from "@/app/utils"
import { addCartItem } from "@/app/lib/data"

let reviewKey = 0;

function sortByDate(a: string, b: string) : number {
    const firstDate = new Date(a);
    const secondDate = new Date(b);

    if (firstDate < secondDate) {
        return -1;
    }
    else if (firstDate > secondDate) {
        return 1;
    }

    return 0;
}


export default function Products({params}: {params: Promise<{ id: string }>}) {
    const router = useRouter();
    const {id} = use(params);
    const [viewProductInfo, setViewProductInfo] = useState(true);
    const [viewShippingInfo, setViewShippingInfo] = useState(true);
    const [shoppingOption, setShoppingOption] = useState(false);
    const [product, setProduct] = useState({} as ProductObject);
    const [stockSelected, setStockSelected] = useState("1");
    const [currentImage, setCurrentImage] = useState("");
    const [reviewSort, setReviewSort] = useState("Recent");

    function CartPopup() {
        return (
            <div className="flex w-full !opacity-100 absolute">
                <div className={`flex flex-col absolute top-25 left-105 w-170 h-45 p-1 ${shoppingOption ? "popup" : ""}`}>
                    <div>
                        Added to Cart
                    </div>
                    <div className="flex justify-between">
                        <div className="flex">
                            <Image src={product.images[0]} alt="Product Image" width={100} height={180} />
                            <div className="flex gap-4">
                                <div>{product.title}</div>
                                <div>x{stockSelected}</div>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <div className="flex gap-4">
                                <div className="line-through">${product.price}</div>
                                <div className="text-green-500">${getDiscountedPrice(product).toFixed(2)}</div>
                            </div>
                            <div className="self-center text-red-500">{product.discountPercentage}% off</div>
                        </div>
                    </div>
                    <hr></hr>
                    <div className="flex justify-between pt-3">
                        <button onClick={() => setShoppingOption(false)}>Keep Shopping</button>
                        <Link href={"/checkout"}><button>Checkout</button></Link>
                    </div>
                </div>
            </div>
        )
    }
    
    function handleCartClick() {
        addCartItem(product, Number(stockSelected));
        setShoppingOption(true);
    }

    useEffect(() => {
        fetch(`${window.location.origin}/api/products`).then(res => res.json()).then(data => {
            const findProduct = data.products.find((product : ProductObject) => product.id.toString() === id);

            if (findProduct !== undefined) {
                setProduct(findProduct);
                setCurrentImage(findProduct.images[0]);
                console.log(findProduct);
            }
        });
    }, [id]);

    return(
        <>
        {
            Object.keys(product).length !== 0 &&
            <div className="flex flex-col w-full h-full px-6" style={shoppingOption === true ? {backgroundColor: 'rgba(0,0,0,0.5)'} : {opacity: '100%'}}>
                <div className="flex gap-1.5 py-4">
                    <div className="flex cursor-pointer gap-2" onClick={() => router.back()}>
                        <Icon path={mdiArrowLeft} size={1} />
                        Go Back
                    </div>
                </div>
                <div className="flex w-full gap-12 justify-center pb-14">
                    <div className="flex flex-1 h-[365px] w-[480px] flex-col">
                        <Image className="cursor-pointer" src={currentImage} alt="Product Image" height={0} width={0} sizes="100vw" style={{height: '100%', width: '100%', objectFit: 'cover'}} />

                        <div className="flex h-[50px] w-[50px]">
                            {product.images.map((url) => <Image className='cursor-pointer' key={url} src={url} alt={'Image of ' + product.title} onClick={() => setCurrentImage(url)} height={0} width={0} sizes="100vw" style={{height: '100%', width: '100%', objectFit: 'cover'}} />)}
                        </div>
                    </div>
                    <div className="flex flex-2 flex-col gap-2">
                        <div className="text-4xl">
                            {product.title}
                        </div>
                        <div className="flex gap-5">
                            <div className="line-through">${product.price}</div>
                            <div className="text-green-500">${(product.price - (product.price * (product.discountPercentage/100))).toFixed(2)}</div>
                            <div className="text-red-500">{product.discountPercentage}% off</div>
                        </div>
                        <div className="flex gap-5">
                            <div className="flex">
                                {[...Array(5)].map((elem, index) => {if (index <= Math.floor(product.rating)) {return <Icon key={index} path={mdiStar} size={1} color={'yellow'} />} else { return (<Icon key={index}  path={mdiStar} size={1} />)}})}
                            </div>
                            <div>{product.reviews.length} ratings</div>
                        </div>
                        <div className="flex gap-8.5 pb-4">
                            <div>In Stock - {product.stock} Left</div>
                            <div className="flex justify-center gap-4">
                                <select value={stockSelected} onChange={(e) => setStockSelected(e.target.value)}>
                                    {[...Array(product.minimumOrderQuantity)].map((elem,index) =>{if (index !== 0 && index <= product.stock) { return (<option value={index} key={index}>{index}</option>)} })}
                                </select>
                                <button className="add-item-button cursor-pointer" onClick={() => handleCartClick()}>Add to Cart</button>
                            </div>
                        </div>
                        <div className="py-4">
                            {product.description}
                        </div>
                        <hr></hr>
                        <div className="flex flex-col">
                            <div onClick={() => setViewProductInfo(!viewProductInfo)} className="flex cursor-pointer justify-between">
                                <div>Product Information</div>
                                <div onClick={() => setViewProductInfo(!viewProductInfo)}><Icon path={mdiPlus} size={1}/></div>
                            </div>
                            {
                                viewProductInfo ?
                                <div className="flex flex-col py-2">
                                    <div>Brand: {product.brand}</div>
                                    <div>Dimension: {product.dimensions.width}W {product.dimensions.height}H {product.dimensions.depth}D</div>
                                    <div>Weight: {product.weight} lbs</div>
                                    <div>Category: {product.category}</div>
                                </div>
                                : <div></div>
                            }
                        </div>
                        <hr></hr>
                        <div className="flex flex-col">
                            <div onClick={() => setViewShippingInfo(!viewShippingInfo)} className="flex cursor-pointer justify-between">
                                <div>Shipping & Returns</div>
                                <div onClick={() => setViewShippingInfo(!viewShippingInfo)}><Icon path={mdiPlus} size={1}/></div>
                            </div>
                            {
                                viewShippingInfo ?
                                <div className="flex flex-col py-2">
                                    <div>Shipping: {product.shippingInformation}</div>
                                    <div>Warranty: {product.warrantyInformation}</div>
                                    <div>Return Policy: {product.returnPolicy}</div>
                                </div>
                                : <div></div>
                            }
                        </div>
                    </div>
                    {shoppingOption && <CartPopup />}
                </div>
                <div className="flex justify-between py-2.5 items-center">
                    <div className="text-2xl">Reviews</div>
                    <div className="flex">
                        <div>Sort By:</div>
                        <select value={reviewSort} onChange={(e) => setReviewSort(e.target.value)}>
                            <>        
                                <option value={"Recent"}>Recent</option>
                                <option value={"Stars"}>Stars</option>
                            </>
                
                        </select>
                    </div>
                </div>
                <div>
                    {reviewSort === "Stars" && product.reviews.sort((a, b) => a.rating - b.rating).map((review) => <Review key={reviewKey++} review={review}/>)}
                    {reviewSort === "Recent" && product.reviews.sort((a, b) => sortByDate(a.date, b.date)).map((review) => <Review key={reviewKey++} review={review}/>)}
                </div>
            </div>
        }
        </>
    )
}
