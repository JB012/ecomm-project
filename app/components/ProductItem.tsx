import Image from "next/image"

interface Prop {
    thumbnail: string,
    title: string,
    price: number;
}

export default function ProductItem({thumbnail, title, price}: Prop) {

    return (
        <div className="flex flex-col gap-2">
            <div className="h-70 w-50">
                <Image src={thumbnail} alt="Product Item" width={0} height={0} sizes="100px" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
            </div>
            <div>
                {title}
            </div>
            <div>
                ${price}
            </div>
        </div>
    )
}