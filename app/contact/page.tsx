'use client';

import { motion } from 'framer-motion';

export default function ContactPage() {
  return (
    <motion.section
      className="max-w-2xl mx-auto py-16 px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-4xl font-bold mb-8 text-gray-800 dark:text-white">Get In Touch</h2>
      
      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md">
        <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg">
          I'm always open to discussing new projects, creative ideas or opportunities to be part of your vision.
        </p>
        
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-800 dark:text-white">Email</h3>
            <a 
              href="rodrickreborn@gmail.com" 
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
            >
              rodrickreborn@gmail.com
            </a>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-800 dark:text-white">Social Media</h3>
            <div className="flex gap-4 mt-2">
              {['Twitter', 'LinkedIn', 'GitHub'].map(platform => (
                <a 
                  key={platform}
                  href="https://github.com/RebornPixels"
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {platform}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}