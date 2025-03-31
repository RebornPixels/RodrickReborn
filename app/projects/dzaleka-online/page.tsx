'use client';
import { motion } from 'framer-motion';

export default function DzalekaOnlinePage() {
  return (
    <motion.section 
      className="max-w-4xl mx-auto py-16 px-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-4xl font-bold mb-6 text-gray-800 dark:text-white">Dzaleka Online</h1>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
        Dzaleka Online is a social platform focused on community engagement, real-time posts, likes, comments, and artist profiles.
        Built using React and Firebase, it offers a dynamic way to connect people through content sharing and expression.
      </p>
      <div className="flex flex-wrap gap-3">
        <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm px-3 py-1 rounded-full">React</span>
        <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm px-3 py-1 rounded-full">Firebase</span>
        <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm px-3 py-1 rounded-full">Tailwind CSS</span>
      </div>
    </motion.section>
  );
}
