"use client";

import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto mb-2"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-6">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-bold text-gray-800 mb-6">
          Welcome to RSS Reader
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Your personal RSS feed aggregator
        </p>
        <div className="space-y-4 mb-8">
          <button
            onClick={() => router.push('/feed')}
            className="bg-indigo-600 text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-indigo-700 transition-colors"
          >
            Go to Feed
          </button>
          <button
            onClick={() => router.push('/feed')}
            className="bg-white text-indigo-600 px-8 py-3 rounded-full text-lg font-medium hover:bg-gray-50 transition-colors border border-indigo-300"
          >
            Browse Posts
          </button>
        </div>
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h3 className="text-2xl font-semibold mb-4 text-gray-800">
            Quick Start
          </h3>
          <ul className="text-left space-y-2 text-gray-600">
            <li className="flex items-start">
              <span className="text-indigo-600 mr-2 mt-1">✓</span>
              Add RSS feed URLs from your favorite websites
            </li>
            <li className="flex items-start">
              <span className="text-indigo-600 mr-2 mt-1">✓</span>
              Organize feeds into categories (coming soon)
            </li>
            <li className="flex items-start">
              <span className="text-indigo-600 mr-2 mt-1">✓</span>
              Read articles with a clean, distraction-free interface
            </li>
            <li className="flex items-start">
              <span className="text-indigo-600 mr-2 mt-1">✓</span>
              Mark posts as read or favorite for later
            </li>
          </ul>
        </div>
        <div className="mt-8 text-gray-500 text-sm">
          <p className="mb-2">
            Built with ❤️ using Next.js, TypeScript, and PostgreSQL
          </p>
          <p className="mb-2">
            © 2026 RSS Reader. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}