'use client';

import Link from 'next/link';

export default function MainBanner() {
  return (
    <div 
      className="relative overflow-hidden bg-cover bg-center bg-no-repeat py-20" 
      style={{ 
        backgroundImage: "url('https://res.cloudinary.com/dzlg5jcqj/image/upload/v1743623083/Leonardo_Phoenix_10_Image_features_a_product_layout_showcasing_2_afuzfo.jpg')",
        backgroundSize: 'cover',
        minHeight: '50vh',
        backgroundPosition: 'right',
      }}
    >
      <div className="absolute inset-0"></div>
      <div className="container relative mx-auto px-4 py-16">
        <div className="max-w-lg">
          <h1 className="text-5xl mb-4 text-white font-nunito font-extrabold bg-black/30 p-4">
            Juguetes para Mascotas
            <br />
            de Alta Calidad
          </h1>
          <p className="text-white mb-6 text-lg bg-black/30 p-4">
            Los mejores productos para tus compañeros peludos
          </p>
          <div className="mb-8">
            <span className="text-[#a5f41d] text-4xl font-bold">$29.99</span>
            <span className="text-white line-through ml-2 bg-black/30">$49.99</span>
          </div>
          <Link
            href="/products"
            className="bg-[#a5f41d] px-8 py-3 rounded-full inline-flex items-center hover:bg-[#94dc1a] transition-colors"
          >
            Comprar Ahora
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}