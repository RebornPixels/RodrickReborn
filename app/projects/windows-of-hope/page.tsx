'use client';

import { motion } from 'framer-motion';
import { FiExternalLink, FiGithub } from 'react-icons/fi';
import { useTheme } from '../../theme-provider';

const techStack = [
  { name: 'Next.js', color: 'text-black dark:text-white', bg: 'bg-gray-100 dark:bg-gray-800' },
  { name: 'MongoDB', color: 'text-green-600 dark:text-green-400', bg: 'bg-green-100 dark:bg-green-900/30' },
  { name: 'Tailwind CSS', color: 'text-cyan-600 dark:text-cyan-400', bg: 'bg-cyan-100 dark:bg-cyan-900/30' },
  { name: 'Stripe', color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-100 dark:bg-purple-900/30' },
  { name: 'Nonprofit', color: 'text-red-600 dark:text-red-400', bg: 'bg-red-100 dark:bg-red-900/30' },
];

export default function WindowsOfHopePage() {
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
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-blue-500 dark:from-green-400 dark:to-blue-400">
              Windows of Hope
            </span>
          </h1>
          
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
            A compassionate platform supporting nonprofit initiatives with donation integration, 
            volunteer coordination, program information, and impactful storytelling through 
            blog/news updates.
          </p>

          <div className="mb-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800">
            <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-3">Key Features:</h3>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li className="flex items-start">
                <span className="mr-2 text-blue-500">✓</span>
                Secure donation processing
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-blue-500">✓</span>
                Volunteer management system
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-blue-500">✓</span>
                Program information hub
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-blue-500">✓</span>
                Impact stories and news updates
              </li>
            </ul>
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
              href="https://github.com/RebReborn/windows-of-hope"
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
              href="https://windowsofhope.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-500 transition-colors"
            >
              <FiExternalLink className="w-5 h-5" />
              Visit Site
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
          <div className={`relative rounded-2xl overflow-hidden shadow-xl ${isDark ? 'shadow-blue-900/20' : 'shadow-gray-400/30'}`}>
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-blue-500/10 dark:from-green-400/5 dark:to-blue-400/5" />
            <img
              src={isDark ? '/windowsofhope-dark.png' : '/windowsofhope-light.png'}
              alt="Windows of Hope Platform"
              className="w-full h-auto rounded-2xl border border-gray-200 dark:border-gray-700"
            />
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}