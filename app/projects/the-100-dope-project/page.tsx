'use client';
import { motion } from 'framer-motion';

export default function The100DopeProjectPage() {
  return (
    <motion.section 
      className="max-w-4xl mx-auto py-16 px-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-4xl font-bold mb-6 text-gray-800 dark:text-white">The 100 DoPe Project</h1>
      
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
        The 100 DoPe Project is a collaborative farming and investment initiative where 100 members contribute monthly toward building profitable, sustainable agricultural ventures. The project's goal is to generate passive income for each member while fostering community ownership, resilience, and economic growth.
      </p>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
        The platform includes a custom-built dashboard for members to track contributions, view farming progress, receive updates, and interact with administrative announcements. Admins have a dedicated panel to manage financial records, monitor crop cycles, and send notifications to participants.
      </p>

      <div className="flex flex-wrap gap-3 mt-6">
        <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-sm px-3 py-1 rounded-full">Next.js</span>
        <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-sm px-3 py-1 rounded-full">MongoDB</span>
        <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-sm px-3 py-1 rounded-full">Node.js</span>
        <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-sm px-3 py-1 rounded-full">Admin Panel</span>
        <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-sm px-3 py-1 rounded-full">Community Project</span>
      </div>
    </motion.section>
  );
}
