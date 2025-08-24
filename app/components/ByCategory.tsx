import Image from "next/image"

export default function ByCategory() {
    return (
        <div id="category-container" className="flex flex-col w-full pb-8">
            <div className="flex justify-center items-center relative py-8">
                <div className="text-3xl font-medium">Shop By Category</div>
                <button className="absolute right-12">See More</button>
            </div>
            <div className="flex w-full justify-center">
                <div className="grid gap-8 grid-flow-col grid-rows-2 pb-10">
                        <div className="flex flex-col justify-center items-center">
                            <Image className="container-image" src={"/beauty.jpeg"} alt="Category photo" width={280} height={300}/>
                            <div className="container-text">Beauty</div>
                        </div>
                        <div className="flex flex-col justify-center items-center">
                            <Image className="container-image" src={"/furniture.jpg"} alt="Category photo" width={280} height={300}/>
                            <div className="container-text">Furniture</div>
                        </div>
                        <div className="flex flex-col justify-center items-center">
                            <Image className="container-image" src={"/decorations.jpg"} alt="Category photo" width={280} height={300}/>
                            <div className="container-text">Home Decorations</div>
                        </div>
                        <div className="flex flex-col justify-center items-center">
                            <Image className="container-image" src={"/kitchen_accessories.jpg"} alt="Category photo" width={280} height={300}/>
                            <div className="container-text">Kitchen Accessories</div>
                        </div>
                        <div className="flex flex-col justify-center items-center">
                            <Image className="container-image" src={"/mens.jpg"} alt="Category photo" width={280} height={300}/>
                            <div className="container-text">Men&apos;s</div>
                        </div>
                        <div className="flex flex-col justify-center items-center">
                            <Image className="container-image" src={"/groceries.jpg"} alt="Category photo" width={280} height={300}/>
                            <div className="container-text">Groceries</div>
                        </div>
                        <div className="flex flex-col justify-center items-center">
                            <Image className="container-image" src={"/womens.jpg"} alt="Category photo" width={280} height={300}/>
                            <div className="container-text">Women&apos;s</div>
                        </div>
                        <div className="flex flex-col justify-center items-center">
                            <Image className="container-image" src={"/fragrances.jpg"} alt="Category photo" width={280} height={300}/>
                            <div className="container-text">Fragrances</div>
                        </div>
                </div>
            </div>
        </div>
    )
}