import Image from "next/image"

export default function ProductItem() {
    return (
        <div className="flex flex-col gap-2">
            <div className="h-70 w-50">
                <Image src="/image1.jpg" alt="Product Item" width={0} height={0} sizes="100px" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
            </div>
            <div>
                Title
            </div>
            <div>
                $0.00
            </div>
        </div>
    )
}