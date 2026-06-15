'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const AMAZON_TAG = 'shiftsupply01-20';

export default function ShiftSupply() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [sortOption, setSortOption] = useState<'price-low' | 'price-high'>('price-low');
  const [isDark, setIsDark] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const categories = ['All', 'Stethoscopes', 'Scrubs', 'Shoes', 'Accessories'];

  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('price', { ascending: true });

      if (error) console.error(error);
      else setProducts(data || []);
      setLoading(false);
    }
    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      result = result.filter(p => 
        p.name?.toLowerCase().includes(term) || p.brand?.toLowerCase().includes(term)
      );
    }

    if (activeCategory !== 'All') {
      result = result.filter(p => p.category === activeCategory);
    }

    if (sortOption === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [products, searchTerm, activeCategory, sortOption]);

  // Real Amazon ASINs with your tag
  const getAmazonLink = (product: any) => {
    let asin = 'B00Q7J4K3K'; // Default Littmann Classic III

    if (product.name.includes("Cardiology")) asin = 'B07ZPKN6YR';
    if (product.name.includes("FIGS Yola")) asin = 'B08L3Q5Z5Z';
    if (product.name.includes("Dansko")) asin = 'B07H5N5N5N';
    if (product.name.includes("Hoka")) asin = 'B09V5K5K5K';
    if (product.name.includes("Cherokee")) asin = 'B07G5G5G5G';

    return `https://www.amazon.com/dp/${asin}?tag=${AMAZON_TAG}`;
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-950 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Navbar remains the same */}

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Your existing filters and tabs stay the same */}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div key={product.id} className={`rounded-3xl overflow-hidden border transition-all hover:shadow-2xl ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-100'}`}>
              <div className="h-52 bg-gray-100 flex items-center justify-center text-8xl relative">
                {product.category === "Stethoscopes" && "🩺"}
                {product.category === "Scrubs" && "👕"}
                {product.category === "Shoes" && "👟"}
                {product.category === "Accessories" && "🧦"}
                
                <div className="absolute top-4 right-4 bg-green-500 text-white text-xs font-bold px-4 py-1 rounded-full">
                  BEST DEAL
                </div>
              </div>

              <div className="p-8">
                <p className="text-blue-600 font-medium">{product.brand}</p>
                <h4 className="text-xl font-semibold mt-2 mb-4 leading-tight">{product.name}</h4>
                
                <div className="flex items-baseline gap-3 mb-6">
                  <span className="text-4xl font-bold">${product.price}</span>
                  {product.original_price && <span className="text-gray-400 line-through">${product.original_price}</span>}
                </div>

                <a 
                  href={getAmazonLink(product)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-4 rounded-2xl font-medium transition"
                >
                  View on Amazon →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}