"use client"
import React, { useState, useEffect } from "react"
import { client } from "@/sanity/lib/client"
import { useWishlist } from "../app/context/WishlistContext"
import ProductList from "./ProductList"
import Feature from "./Feature"
import Miss from "./Miss"
import Essential from "./Essential"

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

const Category = () => {
  const [isProductListVisible, setIsProductListVisible] = useState(true)
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist()
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    const fetchProducts = async () => {
      const query = `*[_type == "product"] {
        id,
        productName,
        status,
        price,
        slug,
        description,
        category,
        "image": image.asset->{
           url
        }
      }`
      const fetchedProducts: Product[] = await client.fetch(query)
      setProducts(fetchedProducts)
    }

    fetchProducts()
  }, [])

  const handleWishlistToggle = (product: Product) => {
    const isInWishlist = wishlist.some((item) => item.id === product.id)
    if (isInWishlist) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist({
        id: product.id,
        productName: product.productName,
        price: product.price,
        image: product.image.url,
        slug: product.slug,
      })
    }
  }

  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <ProductList products={products} isProductListVisible={isProductListVisible} />
      <Feature />
      <Miss />
      <Essential />
    </div>
  )
}

export default Category

