'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import { MdArrowBackIosNew, MdOutlineArrowForwardIos } from "react-icons/md";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import Feature from './Feature';
import Variety from './Variety';
import Miss from './Miss';
import Essential from './Essential';
import { client } from '@/sanity/lib/client';
import Link from 'next/link';
import { useWishlist } from '../context/WishlistContext';

interface Product {
    id: string;
    productName: string;
    price: number;
    slug: string;
    status: string;
    description: string;
    category: string;
    image: {
        _id: string;
        url: string;
        mimeType: string;
        extension: string;
        size: number;
        metadata: object;
        originalFilename: string;
        _createdAt: string;
        _updatedAt: string;
    };
}

const Category = () => {
    const [isProductListVisible, setIsProductListVisible] = useState(true);
    const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
    const [products, setProducts] = useState<Product[]>([]);

    React.useEffect(() => {
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
            }`;
            const fetchedProducts: Product[] = await client.fetch(query);
            setProducts(fetchedProducts);
        };

        fetchProducts();
    }, []);

    const handleScrollLeft = () => {
        const slider = document.getElementById('productList');
        if (slider) {
            slider.scrollBy({ left: -500, behavior: 'smooth' });
        }
    };

    const handleScrollRight = () => {
        const slider = document.getElementById('productList');
        if (slider) {
            slider.scrollBy({ left: 500, behavior: 'smooth' });
        }
    };

    const handleWishlistToggle = (product: Product) => {
        const isInWishlist = wishlist.some((item) => item.id === product.id);
        if (isInWishlist) {
            removeFromWishlist(product.id);
        } else {
            addToWishlist({
                id: product.id,
                productName: product.productName,
                price: product.price,
                image: product.image.url,
                slug: product.slug,
            });
        }
    };

    return (
        <div>
            <div className="px-8">
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

                {/* Product List Section */}
                <div
                    id="productList"
                    className={`flex flex-row justify-start items-center overflow-x-auto scroll-smooth snap-x snap-mandatory space-x-4 mb-11 no-scrollbar ${!isProductListVisible ? 'hidden' : ''
                        }`}
                >
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="flex-none w-60 h-auto p-4 bg-white rounded-lg shadow-lg snap-start relative"
                        >
                            <Image
                                src={product.image?.url || "/placeholder.svg"}
                                alt={product.productName}
                                width={790}
                                height={600}
                                className="object-cover rounded-md"
                            />
                            <div className="flex flex-col justify-start mt-4 p-3 text-center">
                                <div className="flex flex-col text-base">
                                    <Link href={`/products/${product.slug}`} className='font-semibold'>{product.productName}</Link>
                                    <h1 className=''>${product.price.toLocaleString()}</h1>
                                </div>
                                <p className="text-gray-900">{product.category}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Feature />
            <Variety />
            <Miss />
            <Essential />
        </div>
    );
};

export default Category;

