'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function HomePage() {
  return (
    <motion.section
      className="text-center py-20 px-6 min-h-[80vh] flex flex-col justify-center items-center bg-gradient-to-br from-blue-50 to-white dark:from-gray-800 dark:to-gray-900"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-4xl mx-auto">
        <motion.h1 
          className="text-5xl md:text-6xl font-extrabold text-gray-800 dark:text-white mb-6"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Hi, I'm <span className="text-blue-600 dark:text-blue-400">Rodrick Reborn</span>
        </motion.h1>
        
        <motion.p 
          className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          A passionate developer, creative thinker & problem-solver. I build digital experiences that are fast, functional, and meaningful.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex gap-4 justify-center"
        >
          <Link
            href="/projects"
            className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg"
          >
            View My Work
          </Link>
          <Link
            href="/contact"
            className="border-2 border-gray-300 hover:border-blue-600 dark:border-gray-600 dark:hover:border-blue-400 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-semibold px-8 py-3 rounded-lg transition-all duration-300"
          >
            Contact Me
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}