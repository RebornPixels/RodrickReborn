'use client';

import { motion } from 'framer-motion';
import { useTheme } from 'next-themes'; // Optional, for manual control

export default function ContactPage() {
  // Optional: If you want to manually control dark mode
  // const { theme } = useTheme();
  
  return (
    <motion.section
      className="max-w-2xl mx-auto py-16 px-6 bg-white dark:bg-gray-900 transition-colors duration-300"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-4xl font-bold mb-8 text-gray-800 dark:text-white">Get In Touch</h2>

      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md dark:shadow-gray-700/50">
        <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg">
          I'm always open to discussing new projects, creative ideas or opportunities to be part of your vision.
        </p>

        <div className="space-y-4">
          {/* Email */}
          <div>
            <h3 className="font-semibold text-gray-800 dark:text-white">Email</h3>
            <a 
              href="mailto:rodrickreborn@gmail.com" 
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
            >
              rodrickreborn@gmail.com
            </a>
          </div>

          {/* Socials */}
          <div>
            <h3 className="font-semibold text-gray-800 dark:text-white">Social Media</h3>
            <div className="flex gap-6 mt-2">
              <a 
                href="https://twitter.com/your-username"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
              >
                Twitter
              </a>
              <a 
                href="https://linkedin.com/in/your-username"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
              >
                LinkedIn
              </a>
              <a 
                href="https://github.com/RebornPixels"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}