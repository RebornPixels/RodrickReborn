'use client';

import { motion } from 'framer-motion';
import { FiMic, FiBookOpen, FiUsers, FiGithub, FiExternalLink } from 'react-icons/fi';
import { useTheme } from '../../theme-provider';

const features = [
  { icon: <FiMic className="w-5 h-5" />, title: "Audio Contributions", description: "Users contribute voice recordings of Kibembe words for pronunciation preservation." },
  { icon: <FiBookOpen className="w-5 h-5" />, title: "Interactive Dictionary", description: "Explore a growing dictionary of Kibembe words with English translations." },
  { icon: <FiUsers className="w-5 h-5" />, title: "Community Driven", description: "Validate and review word entries to keep the language learning experience authentic." }
];

const techStack = [
  { name: 'React', color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-100 dark:bg-blue-900/30' },
  { name: 'Firebase', color: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-100 dark:bg-orange-900/30' },
  { name: 'Cloudinary', color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-100 dark:bg-purple-900/30' },
  { name: 'AI Validation', color: 'text-pink-600 dark:text-pink-400', bg: 'bg-pink-100 dark:bg-pink-900/30' }
];

export default function KibembePage() {
  const { theme, isDark } = useTheme();

  return (
    <motion.section className="max-w-6xl mx-auto py-16 px-4 sm:px-6 lg:px-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2, duration: 0.5 }}>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800 dark:text-white">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-blue-500 dark:from-green-400 dark:to-blue-400">Kibembe Language App</span>
          </h1>

          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
            Kibembe App is a community-powered language preservation tool featuring audio contributions, validation, and AI help to keep the Bembe language alive.
          </p>

          <div className="mb-8 grid grid-cols-1 gap-4">
            {features.map((feature, index) => (
              <motion.div key={index} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + index * 0.1 }} className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-100 dark:border-green-800 flex items-start">
                <div className="mr-3 mt-0.5 text-green-600 dark:text-green-400">{feature.icon}</div>
                <div>
                  <h3 className="font-semibold text-green-800 dark:text-green-200 mb-1">{feature.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 mb-8">
            {techStack.map((tech, index) => (
              <motion.span key={tech.name} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + index * 0.1 }} className={`${tech.bg} ${tech.color} text-sm px-3 py-1 rounded-full flex items-center`}>
                {tech.name}
              </motion.span>
            ))}
          </div>

          <div className="flex gap-4">
            <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="https://github.com/rebreborn/kibembe" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-3 bg-gray-800 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors">
              <FiGithub className="w-5 h-5" /> View Code
            </motion.a>
            <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="https://kibembe.netlify.app/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 dark:hover:bg-green-500 transition-colors">
              <FiExternalLink className="w-5 h-5" /> Visit App
            </motion.a>
          </div>
        </motion.div>

        <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.4, duration: 0.5 }} className="relative">
          <div className={`relative rounded-2xl overflow-hidden shadow-xl ${isDark ? 'shadow-green-900/20' : 'shadow-gray-400/30'}`}>
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-blue-500/10 dark:from-green-400/5 dark:to-blue-400/5" />
            <img
              src={isDark ? '/images/kibembe.png' : '/images/kibembe.png'}
              alt="Kibembe App Screenshot"
              className="w-full h-auto rounded-2xl border border-gray-200 dark:border-gray-700"
            />
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
