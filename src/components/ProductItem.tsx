import Image from "next/image"
import Link from "next/link"
import type React from "react"

interface ProductItemProps {
  product: {
    id: string
    productName: string
    price: number
    slug: string
    category: string
    image: {
      url: string
    }
  }
}


const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  return (
    <div className="flex-none w-60 h-auto p-4 bg-white rounded-lg shadow-lg snap-start relative">
      <Image
        src={product.image?.url || "/placeholder.svg"}
        alt={product.productName}
        width={790}
        height={600}
        className="object-cover rounded-md"
      />
      <div className="flex flex-col justify-start mt-4 p-3 text-center">
        <div className="flex flex-col text-base">
          <Link href={`/products/${product.slug}`} className="font-semibold">
            {product.productName}
          </Link>
          <h3 className="">${product.price.toLocaleString()}</h3>
        </div>
        <p className="text-gray-900">{product.category}</p>
      </div>
    </div>
  )
}

export default ProductItem

