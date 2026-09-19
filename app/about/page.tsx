'use client';

import React, { useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import Link from 'next/link';

export default function About() {
  const [isDark, setIsDark] = useState(false);

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-950 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <nav className={`border-b sticky top-0 z-50 shadow-sm ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/">
            <img src="/logo.png" alt="ShiftSupply" className="h-32 w-auto" />
          </Link>
          <div className="flex items-center gap-8 text-sm font-medium">
            <Link href="/" className="hover:text-blue-600 transition">Home</Link>
            <Link href="/about" className="text-blue-600">About</Link>
            <Link href="/contact" className="hover:text-blue-600 transition">Contact</Link>
            <button
              onClick={() => setIsDark(!isDark)}
              className={`p-3 rounded-2xl transition ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      <div className={`py-16 ${isDark ? 'bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-900' : 'bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700'} text-white`}>
        <div className="max-w-4xl mx-auto text-center px-6">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">About ShiftSupply</h1>
          <p className="text-xl opacity-90">Helping nurses find better prices on the gear they actually use</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-16 space-y-10 leading-relaxed">
        <section>
          <h2 className="text-3xl font-bold mb-4">Why this exists</h2>
          <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Nursing gear adds up fast. Stethoscopes, scrubs, shoes, and everyday accessories
            can cost a lot more than they should if you only check one store.
            ShiftSupply was built to make those prices easier to compare in one place.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-4">What we do</h2>
          <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            We track common nursing products and highlight current deals from retailers like Amazon.
            The goal is simple: less searching, fewer overpriced purchases, and a faster way
            to find gear that fits a real shift schedule.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-4">How it works</h2>
          <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Some product links are affiliate links. If you buy through them, ShiftSupply may
            earn a small commission at no extra cost to you. That helps keep the site running
            while we keep adding products and improving the experience.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-4">Who’s behind it</h2>
          <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            ShiftSupply is an independent project built after seeing how expensive everyday
            nursing gear can get. It isn’t owned by a hospital system or a scrub brand.
            The focus is practical: better prices, clearer comparisons, and a site that stays useful.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-4">Have a suggestion?</h2>
          <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} mb-6`}>
            If there’s a product, brand, or deal you want added, send it over.
            Real nurse feedback is how the catalog gets better.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-medium transition"
          >
            Contact Us
          </Link>
        </section>
      </div>

      <footer className={`border-t ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-6 py-10 text-sm text-gray-500">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <span className="mx-3">•</span>
          <Link href="/about" className="hover:text-blue-600">About</Link>
          <span className="mx-3">•</span>
          <Link href="/contact" className="hover:text-blue-600">Contact</Link>
        </div>
      </footer>
    </div>
  );
}