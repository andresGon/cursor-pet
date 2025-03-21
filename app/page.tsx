'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useCart } from './hooks/useCart';
import ProductModal from './components/ProductModal';
import Image from 'next/image';

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

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const { addItem } = useCart();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/products?populate=*`);
        if (response.data && Array.isArray(response.data.data)) {
          setProducts(response.data.data);
          setFilteredProducts(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter((product) => 
          product.category.slug.toLowerCase() === selectedCategory.toLowerCase()
        )
      );
    }
  }, [selectedCategory, products]);

  const calculateDiscountedPrice = (price: number, discount: number) => {
    return price - (price * (discount / 100));
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const categories = [
    { name: 'Todos', slug: 'all' },
    { name: 'Perros', slug: 'perros' },
    { name: 'Gatos', slug: 'gatos' }
  ];

  return (
    <main className="min-h-screen">
      {/* Banner Principal */}
      <div className="relative bg-[#FFF5F6] overflow-hidden">
        <div className="container mx-auto px-4 py-16 flex items-center">
          <div className="w-1/2">
            <h1 className="text-5xl font-bold mb-4 text-gray-900">
              Juguetes para Mascotas
              <br />
              de Alta Calidad
            </h1>
            <p className="text-gray-700 mb-6 text-lg">
              Los mejores productos para tus compañeros peludos
            </p>
            <div className="mb-8">
              <span className="text-orange-500 text-4xl font-bold">$29.99</span>
              <span className="text-gray-500 line-through ml-2">$49.99</span>
            </div>
            <Link
              href="/products"
              className="bg-purple-600 text-white px-8 py-3 rounded-full inline-flex items-center hover:bg-purple-700 transition-colors"
            >
              Comprar Ahora
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
          <div className="w-1/2">
            <div className="relative w-full aspect-[4/3]">
              <Image
                src="https://res.cloudinary.com/dzlg5jcqj/image/upload/v1740604345/71KkDedi53L._AC_SX522__rsrxzv.jpg"
                alt="Producto destacado"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* Sección de Productos Destacados */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center space-x-2">
              <h2 className="text-2xl font-bold text-gray-900">
                Productos Destacados
                <span className="inline-block ml-2">
                  <Image
                    src="/paw.svg"
                    alt="Paw icon"
                    width={24}
                    height={24}
                    className="w-6 h-6"
                  />
                </span>
              </h2>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex space-x-2">
                {categories.map((category) => (
                  <button
                    key={category.slug}
                    onClick={() => setSelectedCategory(category.slug)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedCategory === category.slug
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
              <Link href="/products" className="text-purple-600 hover:text-purple-700 flex items-center">
                Ver todos
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {filteredProducts.map((product, index) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 cursor-pointer"
                onClick={() => handleProductClick(product)}
              >
                <div className="relative w-full h-48">
                  <Image
                    src={product.images[0]?.url || '/placeholder.png'}
                    alt={product.title}
                    fill
                    className="object-cover rounded-t-lg"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={index === 0}
                  />
                </div>
                <div className="space-y-2">
                  <span className="text-sm text-gray-700">{product.category.categoryName}</span>
                  <h3 className="font-semibold text-gray-900 line-clamp-2">{product.title}</h3>
                  <div className="flex items-center">
                    <div className="flex-1">
                      {product.discount > 0 ? (
                        <div className="space-y-1">
                          <span className="text-lg font-bold text-orange-500">
                            ${calculateDiscountedPrice(product.price, product.discount).toFixed(2)}
                          </span>
                          <span className="text-sm text-gray-500 line-through block">
                            ${product.price.toFixed(2)}
                          </span>
                        </div>
                      ) : (
                        <span className="text-lg font-bold text-gray-900">
                          ${product.price.toFixed(2)}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addItem(product);
                      }}
                      className="p-2 rounded-full bg-purple-100 text-purple-600 hover:bg-purple-200 transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal de Producto */}
      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onAddToCart={addItem}
      />
    </main>
  );
}
