import { motion } from 'framer-motion';
import { FiExternalLink } from 'react-icons/fi';
import { useTheme } from '../../theme-provider';

const techStack = [
  { name: 'HTML', color: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-100 dark:bg-orange-900/30' },
  { name: 'CSS', color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-100 dark:bg-blue-900/30' },
  { name: 'JavaScript', color: 'text-yellow-600 dark:text-yellow-400', bg: 'bg-yellow-100 dark:bg-yellow-900/30' },
];

export default function InstagramNonFollowersCheckerPage() {
  const { isDark } = useTheme();

  return (
    <motion.section className="max-w-6xl mx-auto py-16 px-4 sm:px-6 lg:px-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2, duration: 0.5 }}>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800 dark:text-white">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-purple-500 dark:from-pink-400 dark:to-purple-400">Instagram Non-Followers Checker</span>
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
            A browser-based tool that helps Instagram users identify who isn't following them back. Simply paste or upload your followers and following lists to generate a list of non-followers.
          </p>
          <div className="flex flex-wrap gap-3 mb-8">
            {techStack.map((tech, index) => (
              <motion.span key={tech.name} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + index * 0.1 }} className={`${tech.bg} ${tech.color} text-sm px-3 py-1 rounded-full flex items-center`}>
                {tech.name}
              </motion.span>
            ))}
          </div>
          <div className="flex gap-4">
            <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="https://instagram-non-followers.vercel.app/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors">
              <FiExternalLink className="w-5 h-5" /> Try Tool
            </motion.a>
          </div>
        </motion.div>
        <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.4, duration: 0.5 }} className="relative">
          <div className={`relative rounded-2xl overflow-hidden shadow-xl ${isDark ? 'shadow-pink-900/20' : 'shadow-gray-400/30'}`}>
            <img src="/images/instagram.png" alt="Instagram Non-Followers Checker" className="w-full h-auto rounded-2xl border border-gray-200 dark:border-gray-700" />
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
