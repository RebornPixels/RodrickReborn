'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTheme } from './theme-provider';

export default function NotFoundPage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <motion.section
      className="min-h-screen flex flex-col justify-center items-center text-center px-4 bg-white dark:bg-gray-900 transition-colors duration-300"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-2xl mx-auto">
        {/* Animated 404 text */}
        <motion.div
          initial={{ scale: 0.8, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ delay: 0.2, type: 'spring' }}
        >
          <h1 className="text-8xl md:text-9xl font-extrabold mb-6 relative">
            <span className="text-blue-600 dark:text-blue-400">4</span>
            <motion.span
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              transition={{ 
                repeat: Infinity,
                repeatType: 'reverse',
                duration: 2
              }}
              className="inline-block text-blue-600 dark:text-blue-400 mx-2"
            >
              0
            </motion.span>
            <span className="text-blue-600 dark:text-blue-400">4</span>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-75" />
          </h1>
        </motion.div>

        {/* Main content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
            Lost in the {isDark ? 'void' : 'light'}?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved. 
            Maybe try searching or check out these popular pages:
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-10">
            {['/', '/about', '/projects', '/contact'].map((path) => (
              <Link
                key={path}
                href={path}
                className="px-4 py-2 text-sm font-medium rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                {path === '/' ? 'Home' : path.slice(1).charAt(0).toUpperCase() + path.slice(2)}
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Back to home button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-medium rounded-full transition-colors shadow-lg hover:shadow-blue-500/30 dark:hover:shadow-blue-600/30"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Back to Home
          </Link>
        </motion.div>

        {/* Optional decorative elements */}
        {isDark ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ delay: 1 }}
            className="absolute inset-0 overflow-hidden pointer-events-none"
          >
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-blue-400"
                style={{
                  width: Math.random() * 5 + 2,
                  height: Math.random() * 5 + 2,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, (Math.random() - 0.5) * 100],
                  x: [0, (Math.random() - 0.5) * 50],
                  opacity: [0.3, 0, 0.3],
                }}
                transition={{
                  duration: Math.random() * 10 + 10,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1 }}
            transition={{ delay: 1 }}
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle, #3b82f6 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />
        )}
      </div>
    </motion.section>
  );
}