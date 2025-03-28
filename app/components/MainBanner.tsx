'use client';

import Link from 'next/link';

export default function MainBanner() {
  return (
    <div className="relative bg-white overflow-hidden">
      <div className="container mx-auto px-4 py-16 flex items-start">
        <div className="w-1/2">
          <h1 className="text-5xl  mb-4 text-gray-900 font-nunito font-extrabold">
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
        <div className="w-1/2 relative">
          <img
            src="https://res.cloudinary.com/dzlg5jcqj/image/upload/v1740604345/71KkDedi53L._AC_SX522__rsrxzv.jpg"
            alt="Producto destacado"
            className="w-full h-auto object-contain"
          />
        </div>
      </div>
    </div>
  );
}