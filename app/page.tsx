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

  const getAmazonLink = (product: any) => {
    const searchQuery = encodeURIComponent(product.name);
    return `https://www.amazon.com/s?k=${searchQuery}&tag=${AMAZON_TAG}`;
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-950 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Navbar */}
      <nav className={`border-b sticky top-0 z-50 shadow-sm ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <img src="/logo.png" alt="ShiftSupply" className="h-32 w-auto" />
          </div>

          <div className="flex items-center gap-8 text-sm font-medium">
            <Link href="/" className="hover:text-blue-600 transition">Home</Link>
            <Link href="/contact" className="hover:text-blue-600 transition">Contact</Link>
            
            <button onClick={() => setIsDark(!isDark)} className={`p-3 rounded-2xl transition ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}>
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <div className={`py-16 ${isDark ? 'bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-900' : 'bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700'} text-white`}>
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">Stop Overpaying<br />for Nursing Gear</h2>
          <p className="text-xl opacity-90">Real deals aggregated from top stores</p>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <input
            type="text"
            placeholder="Search stethoscope, figs, dansko, littmann..."
            className={`flex-1 px-6 py-4 rounded-2xl text-lg focus:outline-none focus:border-blue-500 ${
              isDark ? 'bg-gray-900 border border-gray-700 text-white' : 'bg-white border border-gray-200'
            }`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <select 
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value as 'price-low' | 'price-high')}
            className={`px-6 py-4 rounded-2xl focus:outline-none ${
              isDark ? 'bg-gray-900 border border-gray-700 text-white' : 'bg-white border border-gray-200'
            }`}
          >
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>

        <div className="flex gap-2 flex-wrap mb-10">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-3 rounded-2xl font-medium transition-all ${
                activeCategory === cat 
                  ? 'bg-blue-600 text-white' 
                  : isDark 
                    ? 'bg-gray-900 hover:bg-gray-800 border border-gray-700' 
                    : 'bg-white border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-semibold">
            {loading ? "Loading products..." : `${filteredProducts.length} Products`}
          </h3>
        </div>

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

      {/* Full Footer with your real socials */}
      <footer className={`border-t mt-20 ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-4 gap-10">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img src="/logo.png" alt="ShiftSupply" className="h-10 w-auto" />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Helping nurses and medical professionals find the best deals on gear.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2 text-sm">
                <p><Link href="/" className="hover:text-blue-600">Home</Link></p>
                <p><Link href="/contact" className="hover:text-blue-600">Contact</Link></p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Categories</h4>
              <div className="space-y-2 text-sm">
                <p>Stethoscopes</p>
                <p>Scrubs</p>
                <p>Nursing Shoes</p>
                <p>Accessories</p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Follow Us</h4>
              <div className="flex gap-6 text-3xl">
                <a href="https://www.instagram.com/shift.supply_" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500">📸</a>
                <a href="https://www.tiktok.com/@shiftsupply0" target="_blank" rel="noopener noreferrer" className="hover:text-black">♬</a>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-6">
                Built for nurses, by nurses.<br />
                © 2026 ShiftSupply
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}