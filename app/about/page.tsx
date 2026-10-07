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
          <p className="text-xl opacity-90">A simple idea from a nurse, built so the gear costs less</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-16 space-y-10 leading-relaxed">
        <section>
          <h2 className="text-3xl font-bold mb-4">Where it came from</h2>
          <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
            ShiftSupply started with my mom. She’s a registered nurse, and she was the one who pointed out
            how much of a shift gets spent just trying to find a fair price on scrubs, shoes, and the rest
            of the gear. The broad idea was hers. I built the site so that search isn’t something you have
            to do store by store after a long day.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-4">What this is</h2>
          <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
            It’s a price list for the stuff nurses actually buy. Stethoscopes, scrubs, shoes, badge reels,
            pen lights, and the smaller things that still add up. Prices are compared across stores so you
            can see a better option without opening ten tabs.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-4">How the links work</h2>
          <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
            Some product links are affiliate links. If you buy through one, ShiftSupply may earn a small
            commission at no extra cost to you. That’s what keeps the site up while more products get added.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-4">Privacy</h2>
          <div className={`space-y-3 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            <p>
              Email signups are stored so we can send occasional deal updates. Contact form messages are
              stored so we can reply. We do not sell your information.
            </p>
            <p>
              The site may also store a basic preference in your browser, such as whether you’ve already
              closed the email popup. Affiliate links may share a referral tag with the store you visit.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-4">If something’s missing</h2>
          <p className={`mb-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            If there’s a product, brand, or deal that should be on here, send it. The useful stuff has
            mostly come from nurses who already know what they need.
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