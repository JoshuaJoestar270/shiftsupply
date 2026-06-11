'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase
      .from('contact_messages')
      .insert([formData]);

    setLoading(false);

    if (error) {
      alert("Error sending message. Please try again.");
      console.error(error);
    } else {
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      setTimeout(() => {
        setSubmitted(false);
      }, 4000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12">
      <div className="max-w-2xl mx-auto px-6">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8 font-medium"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </Link>

        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-3">Get in Touch</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Have a deal suggestion, partnership request, or feedback?
          </p>
        </div>

        {submitted ? (
          <div className="text-center py-20 bg-green-50 dark:bg-green-950 rounded-3xl">
            <div className="text-6xl mb-6">✅</div>
            <h3 className="text-2xl font-semibold mb-3">Message Received!</h3>
            <p className="text-gray-600 dark:text-gray-400">Thank you. We'll get back to you soon.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-5 py-4 rounded-2xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:border-blue-500"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-5 py-4 rounded-2xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:border-blue-500"
                  placeholder="you@email.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Subject</label>
              <input
                type="text"
                required
                value={formData.subject}
                onChange={(e) => setFormData({...formData, subject: e.target.value})}
                className="w-full px-5 py-4 rounded-2xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:border-blue-500"
                placeholder="Deal suggestion, partnership, etc."
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Message</label>
              <textarea
                required
                rows={7}
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full px-5 py-4 rounded-2xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:border-blue-500"
                placeholder="Write your message here..."
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-4 rounded-2xl text-lg transition"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}