'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

export default function DTunesPage() {
  return (
    <motion.section
      className="max-w-5xl mx-auto py-16 px-6 bg-white dark:bg-gray-900 transition-colors"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Banner Image */}
      <div className="mb-8 rounded-xl overflow-hidden shadow-md">
        <Image
          src="/images/dtunes-cover.jpg"
          alt="dTunes Preview"
          width={1200}
          height={600}
          className="w-full object-cover"
        />
      </div>

      {/* Title & Description */}
      <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">dTunes</h1>
      <p className="text-gray-700 dark:text-gray-300 text-lg mb-6">
        dTunes is a full-stack music platform designed for local artists to upload, share, and manage their music. Features artist verification, payments (Stripe), profiles, and community feedback.
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-3 mb-8">
        {["Next.js", "Firebase", "Stripe", "Tailwind CSS"].map((tag, i) => (
          <span key={i} className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 px-3 py-1 text-sm rounded-full">
            {tag}
          </span>
        ))}
      </div>

      {/* Buttons */}
      <div className="flex gap-4 mb-12">
        <a
          href="https://dtunes.example.com"
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 dark:hover:bg-blue-500 transition"
        >
          Live Demo
        </a>
        <a
          href="https://github.com/RebornPixels/dTunes"
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2 border border-gray-300 dark:border-gray-600 rounded-full text-gray-800 dark:text-gray-200 hover:border-blue-400 transition"
        >
          GitHub
        </a>
      </div>

      {/* Learnings */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">What I Learned</h2>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          Building dTunes gave me deep experience in Firebase, authentication flows, and payment integration with Stripe. I also focused heavily on real-time UX, responsive design, and maintaining clean component structure.
        </p>
      </div>
    </motion.section>
  );
}
