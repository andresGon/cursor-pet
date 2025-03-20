'use client';

import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useCart } from '../hooks/useCart';
import { useSearchParams } from 'next/navigation';
import ProductModal from '../components/ProductModal';
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

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addItem } = useCart();
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const apiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;
      if (!apiUrl) {
        throw new Error('La URL de la API no está configurada');
      }
      
      const response = await axios.get<{ data: Product[] }>(`${apiUrl}/api/products?populate=*`);
      
      if (response.data && Array.isArray(response.data.data)) {
        setProducts(response.data.data);
      } else {
        setProducts([]);
        console.error('Formato de respuesta inválido:', response.data);
      }
      setError(null);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      console.error('Error fetching products:', errorMessage);
      setError('Error al cargar los productos. Por favor, intente más tarde.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    if (categoryParam) {
      const filtered = products.filter(
        product => product.category.slug.toLowerCase() === categoryParam.toLowerCase()
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [products, categoryParam]);

  const handleProductClick = useCallback((product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  }, []);

  const calculateDiscountedPrice = useCallback((price: number, discount: number): number => {
    return price - (price * (discount / 100));
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-center text-xl">Cargando productos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-center text-xl text-red-500">{error}</p>
      </div>
    );
  }

  const categoryTitle = categoryParam 
    ? `Productos para ${categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1)}`
    : 'Todos los Productos';

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{categoryTitle}</h1>
      {filteredProducts.length === 0 ? (
        <p className="text-center text-xl text-gray-600">
          {categoryParam 
            ? `No hay productos disponibles para ${categoryParam}`
            : 'No hay productos disponibles'}
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 cursor-pointer"
              onClick={() => handleProductClick(product)}
            >
              <div className="relative aspect-square mb-4">
                {product.images && product.images.length > 0 ? (
                  <Image
                    src={product.images[0].url}
                    alt={product.imageAlt}
                    fill
                    className="object-cover rounded-lg"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 20vw"
                    priority={false}
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
                    <span className="text-gray-500">Sin imagen</span>
                  </div>
                )}
                {product.discount > 0 && (
                  <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                    -{product.discount}%
                  </span>
                )}
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
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                      e.stopPropagation();
                      addItem(product);
                    }}
                    className="p-2 rounded-full bg-purple-100 text-purple-600 hover:bg-purple-200 transition-colors"
                    type="button"
                    aria-label="Agregar al carrito"
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
      )}

      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onAddToCart={addItem}
      />
    </div>
  );
} 