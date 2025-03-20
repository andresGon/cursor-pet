'use client';

import { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discount: number;
  images: Array<{
    url: string;
  }>;
  imageAlt: string;
  category: {
    categoryName: string;
    slug: string;
  };
}

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

export default function ProductModal({ product, isOpen, onClose, onAddToCart }: ProductModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!product || !isOpen) return null;

  const calculateDiscountedPrice = (price: number, discount: number) => {
    return price - (price * (discount / 100));
  };

  const handleAddToCart = (product: Product) => {
    onAddToCart(product);
    onClose();
  };

  return (
    <div 
      className={`fixed inset-0 z-50 overflow-y-auto bg-black/50 flex items-center justify-center p-4 transition-opacity duration-300 ${
        isOpen ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={onClose}
    >
      <div 
        className={`bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto transition-all duration-300 ${
          isOpen ? 'translate-y-0 opacity-100' : 'translate-y-[100vh] opacity-0'
        }`}
        onClick={e => e.stopPropagation()}
      >
        <div className="relative p-6">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10 transition-transform duration-300 hover:rotate-180 bg-white rounded-full p-2 shadow-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="relative">
            <Swiper
              modules={[Navigation, Pagination]}
              navigation
              pagination={{ clickable: true }}
              loop={true}
              className="w-full aspect-square rounded-lg"
            >
              {product.images.map((image, index) => (
                <SwiperSlide key={index}>
                  <div className="relative aspect-square w-full">
                    <Image
                      src={image.url}
                      alt={`${product.imageAlt} - imagen ${index + 1}`}
                      fill
                      className="object-cover rounded-lg"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className="mt-6">
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 bg-purple-100 text-purple-800 rounded-full text-sm">
                {product.category.categoryName}
              </span>
              {product.discount > 0 && (
                <span className="px-2.5 py-0.5 bg-red-100 text-red-800 rounded-full text-sm">
                  {product.discount}% OFF
                </span>
              )}
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mt-4">{product.title}</h2>
            
            <div className="space-y-1 mt-4">
              {product.discount > 0 ? (
                <>
                  <p className="text-3xl font-bold text-orange-500">
                    ${calculateDiscountedPrice(product.price, product.discount).toFixed(2)}
                  </p>
                  <p className="text-lg text-gray-500 line-through">
                    ${product.price.toFixed(2)}
                  </p>
                </>
              ) : (
                <p className="text-3xl font-bold text-gray-900">
                  ${product.price.toFixed(2)}
                </p>
              )}
            </div>

            <div className="border-t border-b py-4 mt-6">
              <p className="text-gray-700 whitespace-pre-line">
                {product.description}
              </p>
            </div>

            <button
              onClick={() => handleAddToCart(product)}
              className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors mt-6 flex items-center justify-center space-x-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span>Agregar al Carrito</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 