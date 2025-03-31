'use client';
import { motion } from 'framer-motion';

export default function PhotographyPage() {
  return (
    <motion.section 
      className="max-w-4xl mx-auto py-16 px-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-4xl font-bold mb-6 text-gray-800 dark:text-white">Photography Portfolio</h1>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
        A collection of personal and professional photographs capturing meaningful moments, creative scenes, and emotional stories told through the lens.
      </p>
      <div className="flex flex-wrap gap-3">
        <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm px-3 py-1 rounded-full">Photography</span>
        <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm px-3 py-1 rounded-full">Creative</span>
        <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm px-3 py-1 rounded-full">Visual</span>
      </div>
    </motion.section>
  );
}
