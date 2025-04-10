'use client';

import { motion } from 'framer-motion';
import { FiCamera, FiFilm, FiExternalLink, FiGithub } from 'react-icons/fi';
import { useTheme } from '../../theme-provider';

const techStack = [
  { name: 'Next.js', color: 'text-black dark:text-white', bg: 'bg-gray-100 dark:bg-gray-800' },
  { name: 'Cloudinary', color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-100 dark:bg-blue-900/30' },
  { name: 'Photography', color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-100 dark:bg-purple-900/30' },
  { name: 'Videography', color: 'text-red-600 dark:text-red-400', bg: 'bg-red-100 dark:bg-red-900/30' },
  { name: 'Admin Dashboard', color: 'text-green-600 dark:text-green-400', bg: 'bg-green-100 dark:bg-green-900/30' },
];

export default function RebornPixelsPage() {
  const { theme, isDark } = useTheme();

  return (
    <motion.section
      className="max-w-6xl mx-auto py-16 px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left column - Text content */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800 dark:text-white">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-500 dark:from-purple-400 dark:to-pink-400">
              Reborn Pixels
            </span>
          </h1>
          
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
            A creative portfolio platform showcasing stunning photography and videography work.
            Featuring Cloudinary integration for media management, client booking system,
            YouTube embedding, and a comprehensive admin dashboard for content management.
          </p>

          <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-100 dark:border-purple-800">
              <div className="flex items-center mb-2 text-purple-600 dark:text-purple-400">
                <FiCamera className="mr-2" />
                <h3 className="font-semibold">Photography</h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                High-resolution image galleries with EXIF data display and tagging.
              </p>
            </div>
            <div className="p-4 bg-pink-50 dark:bg-pink-900/20 rounded-lg border border-pink-100 dark:border-pink-800">
              <div className="flex items-center mb-2 text-pink-600 dark:text-pink-400">
                <FiFilm className="mr-2" />
                <h3 className="font-semibold">Videography</h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Embedded video portfolios with YouTube integration and custom players.
              </p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3 mb-8">
            {techStack.map((tech, index) => (
              <motion.span
                key={tech.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className={`${tech.bg} ${tech.color} text-sm px-3 py-1 rounded-full flex items-center`}
              >
                {tech.name}
              </motion.span>
            ))}
          </div>
          
          <div className="flex gap-4">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="https://github.com/RebornPixels/portfolio"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-3 bg-gray-800 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
            >
              <FiGithub className="w-5 h-5" />
              View Code
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="https://reborn-pixels-production.web.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 dark:hover:bg-purple-500 transition-colors"
            >
              <FiExternalLink className="w-5 h-5" />
              Visit Portfolio
            </motion.a>
          </div>
        </motion.div>

        {/* Right column - Project showcase */}
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="relative"
        >
          <div className={`relative rounded-2xl overflow-hidden shadow-xl ${isDark ? 'shadow-purple-900/20' : 'shadow-gray-400/30'}`}>
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 dark:from-purple-400/5 dark:to-pink-400/5" />
            <img
              src={isDark ? '/images/rebornpixels.png' : '/images/rebornpixels.png'}
              alt="Reborn Pixels Portfolio"
              className="w-full h-auto rounded-2xl border border-gray-200 dark:border-gray-700"
            />
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}