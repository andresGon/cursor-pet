'use client';

import { useCart } from '../hooks/useCart';

export default function CartPage() {
  const { items, removeItem, updateQuantity } = useCart();

  const calculateDiscountedPrice = (price: number, discount: number) => {
    return price - (price * (discount / 100));
  };

  const total = items.reduce((sum, item) => {
    const finalPrice = calculateDiscountedPrice(item.price, item.discount);
    return sum + (finalPrice * item.quantity);
  }, 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Carrito de Compras</h1>
      
      {items.length === 0 ? (
        <p className="text-xl text-gray-600">Tu carrito está vacío</p>
      ) : (
        <>
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border rounded-lg p-4"
              >
                <div className="flex items-center space-x-4">
                  {item.images && item.images.length > 0 ? (
                    <img
                      src={item.images[0].url}
                      alt={item.imageAlt}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                  ) : (
                    <div className="w-20 h-20 bg-gray-200 rounded-md flex items-center justify-center">
                      <span className="text-gray-500">Sin imagen</span>
                    </div>
                  )}
                  <div>
                    <h2 className="text-xl font-semibold">{item.title}</h2>
                    <div className="flex items-center space-x-2">
                      {item.discount > 0 ? (
                        <>
                          <span className="text-lg font-bold text-red-600">
                            ${calculateDiscountedPrice(item.price, item.discount).toFixed(2)}
                          </span>
                          <span className="text-sm text-gray-500 line-through">
                            ${item.price.toFixed(2)}
                          </span>
                        </>
                      ) : (
                        <span className="text-lg font-bold">${item.price.toFixed(2)}</span>
                      )}
                    </div>
                    <div className="flex items-center space-x-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 rounded-full bg-gray-100 hover:bg-gray-200"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                        </svg>
                      </button>
                      <span className="text-gray-700">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 rounded-full bg-gray-100 hover:bg-gray-200"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Eliminar
                  </button>
                  <span className="text-sm text-gray-500">
                    Subtotal: ${(calculateDiscountedPrice(item.price, item.discount) * item.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 border-t pt-4">
            <div className="flex justify-between items-center">
              <span className="text-xl font-semibold">Total:</span>
              <span className="text-2xl font-bold">${total.toFixed(2)}</span>
            </div>
            <button
              className="w-full mt-4 bg-green-500 text-white py-3 rounded-lg hover:bg-green-600"
              onClick={() => alert('¡Gracias por tu compra!')}
            >
              Proceder al Pago
            </button>
          </div>
        </>
      )}
    </div>
  );
} 