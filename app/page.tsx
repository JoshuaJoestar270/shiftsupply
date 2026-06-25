'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function ShiftSupply() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [sortOption, setSortOption] = useState<'price-low' | 'price-high'>('price-low');
  const [isDark, setIsDark] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const categories = ['All', 'Stethoscopes', 'Scrubs', 'Shoes', 'Accessories'];

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        setError(null);
        const { data, error: supabaseError } = await supabase
          .from('products')
          .select('*')
          .order('price', { ascending: true });

        if (supabaseError) {
          console.error(supabaseError);
          setError('Failed to load products');
        } else {
          setProducts(data || []);
        }
      } catch (err) {
        console.error(err);
        setError('Connection error');
      } finally {
        setLoading(false);
      }
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
    if (product.affiliate_link) return product.affiliate_link;

    if (product.name.includes("Master Cardiology")) return "https://amzn.to/4veMsDb";
    if (product.name.includes("Classic III")) return "https://amzn.to/43AP0PZ";
    if (product.name.includes("Cardiology IV")) return "https://amzn.to/4ecPkKR";
    if (product.name.includes("Lightweight II")) return "https://amzn.to/4vgXoAo";
    if (product.name.includes("Yola")) return "https://amzn.to/4a6fZ9P";
    if (product.name.includes("Catarina")) return "https://amzn.to/4ed0lvI";
    if (product.name.includes("High Waisted")) return "https://amzn.to/4eJiFwB";
    if (product.name.includes("Cherokee")) return "https://amzn.to/3QjyUHr";
    if (product.name.includes("Grey's Anatomy")) return "https://amzn.to/4aNf6mF";
    if (product.name.includes("Dansko")) return "https://amzn.to/4ovhX9w";
    if (product.name.includes("Hoka")) return "https://amzn.to/4fKFOjg";
    if (product.name.includes("Skechers")) return "https://amzn.to/4vYsqwW";
    if (product.name.includes("Adidas")) return "https://amzn.to/4eJey3D";
    if (product.name.includes("Compression Socks")) return "https://amzn.to/4a6Zavk";
    if (product.name.includes("Fanny Pack")) return "https://amzn.to/3QkEObl";
    if (product.name.includes("Blood Pressure")) return "https://amzn.to/3Scot9i";
    if (product.name.includes("Clipboard")) return "https://amzn.to/43GhE24";
    if (product.name.includes("Waterproof")) return "https://amzn.to/4vaDWVH";
    if (product.name.includes("ID Tag") || product.name.includes("Littmann stethoscope ID tag")) 
      return "https://amzn.to/4vkCWhS";
    if (product.name.includes("MDF Acoustica")) return "https://amzn.to/4oGSASn";

    const searchQuery = encodeURIComponent(product.name);
    return `https://www.amazon.com/s?k=${searchQuery}&tag=shiftsupply01-20`;
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
        <div className="flex flex-col md:flex-row gap-4 mb-8 items-end">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search stethoscopes, scrubs, shoes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full px-5 py-4 rounded-3xl border text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isDark ? 'bg-gray-900 border-gray-700 text-white' : 'bg-white border-gray-200'
              }`}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-3 rounded-3xl text-sm font-medium transition-all ${
                  activeCategory === cat ? 'bg-blue-600 text-white' : isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value as 'price-low' | 'price-high')}
            className={`px-5 py-4 rounded-3xl border ${isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'}`}
          >
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>

        {/* Products Grid */}
        {loading && <div className="text-center py-20 text-xl">Loading the best deals...</div>}
        {error && <div className="text-center py-20 text-red-500">{error}</div>}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div key={product.id} className={`rounded-3xl overflow-hidden border transition-all hover:shadow-2xl group ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-100'}`}>
              <div className="h-52 bg-gray-100 relative overflow-hidden">
                {product.image_url ? (
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                ) : (
                  <div className="h-full flex items-center justify-center text-8xl bg-gradient-to-br from-gray-100 to-gray-200">
                    {product.image_emoji || '🛍️'}
                  </div>
                )}
                
                <div className="absolute top-4 right-4 bg-green-500 text-white text-xs font-bold px-4 py-1 rounded-full">
                  BEST DEAL
                </div>
              </div>

              <div className="p-8">
                <p className="text-blue-600 font-medium">{product.brand}</p>
                <h4 className="text-xl font-semibold mt-2 mb-3 leading-tight">{product.name}</h4>
                
                <div className="flex items-baseline gap-3 mb-6">
                  <span className="text-4xl font-bold">
                    ${Number(product.price).toFixed(2)}
                  </span>
                  {product.original_price && (
                    <span className="text-gray-400 line-through">
                      ${Number(product.original_price).toFixed(2)}
                    </span>
                  )}
                </div>

                <a 
                  href={getAmazonLink(product)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-4 rounded-2xl font-medium transition group-hover:scale-105"
                >
                  View on Amazon →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
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
              <div className="flex gap-6">
                <a href="https://www.instagram.com/shift.supply_" target="_blank" rel="noopener noreferrer">
                  <img src="/instagram.png" alt="Instagram" className="h-10 w-10 hover:scale-110 transition" />
                </a>
                <a href="https://www.tiktok.com/@shiftsupply0" target="_blank" rel="noopener noreferrer">
                  <img src="/tiktok.png" alt="TikTok" className="h-10 w-10 hover:scale-110 transition" />
                </a>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-8">
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