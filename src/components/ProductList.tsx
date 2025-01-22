import type React from "react"
import { MdArrowBackIosNew, MdOutlineArrowForwardIos } from "react-icons/md"
import ProductItem from "./ProductItem"

interface Product {
  id: string
  productName: string
  price: number
  slug: string
  status: string
  description: string
  category: string
  image: {
    url: string
  }
}


interface ProductListProps {
  products: Product[]
  isProductListVisible: boolean
}

const ProductList: React.FC<ProductListProps> = ({ products, isProductListVisible }) => {
  const handleScrollLeft = () => {
    const slider = document.getElementById("productList")
    if (slider) {
      slider.scrollBy({ left: -500, behavior: "smooth" })
    }
  }

  const handleScrollRight = () => {
    const slider = document.getElementById("productList")
    if (slider) {
      slider.scrollBy({ left: 500, behavior: "smooth" })
    }
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-row justify-between mt-4">
        <h1 className="text-2xl font-bold mb-6">Best Of Air Max</h1>
        <div className="flex flex-row space-x-4">
          <h1 className="font-bold">Shop</h1>
          <div className="flex flex-row space-x-2">
            <MdArrowBackIosNew
              size={24}
              className="bg-secondary rounded-full cursor-pointer"
              onClick={handleScrollLeft}
            />
            <MdOutlineArrowForwardIos
              size={24}
              className="bg-secondary rounded-full cursor-pointer"
              onClick={handleScrollRight}
            />
          </div>
        </div>
      </div>
      <ul
        id="productList"
        className={`flex flex-row justify-start items-center overflow-x-auto scroll-smooth snap-x snap-mandatory space-x-4 mb-11 no-scrollbar ${!isProductListVisible ? "hidden" : ""}`}
      >
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </ul>
    </section>
  )
}

export default ProductList

