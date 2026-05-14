import { motion } from 'framer-motion';
import { FiExternalLink, FiGithub } from 'react-icons/fi';
import { useTheme } from '../../theme-provider';

const techStack = [
  { name: 'React', color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-100 dark:bg-blue-900/30' },
  { name: 'Telegram API', color: 'text-cyan-600 dark:text-cyan-400', bg: 'bg-cyan-100 dark:bg-cyan-900/30' },
  { name: 'GramJS', color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-100 dark:bg-emerald-900/30' },
  { name: 'Tailwind CSS', color: 'text-cyan-600 dark:text-cyan-400', bg: 'bg-cyan-100 dark:bg-cyan-900/30' },
  { name: 'Framer Motion', color: 'text-pink-600 dark:text-pink-400', bg: 'bg-pink-100 dark:bg-pink-900/30' },
];

export default function TelegramMediaPage() {
  const { isDark } = useTheme();

  return (
    <motion.section className="max-w-6xl mx-auto py-16 px-4 sm:px-6 lg:px-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2, duration: 0.5 }}>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800 dark:text-white">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-500 dark:from-blue-400 dark:to-teal-400">Telegram Media Downloader</span>
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
            Browser-based tool to securely download media from Telegram chats and channels. Features authentication with Telegram API, media previews, and batch downloading capabilities.
          </p>
          <div className="flex flex-wrap gap-3 mb-8">
            {techStack.map((tech, index) => (
              <motion.span key={tech.name} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + index * 0.1 }} className={`${tech.bg} ${tech.color} text-sm px-3 py-1 rounded-full flex items-center`}>
                {tech.name}
              </motion.span>
            ))}
          </div>
          <div className="flex gap-4">
            <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="https://github.com/rebreborn/telegram-media-downloader" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-3 bg-gray-800 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors">
              <FiGithub className="w-5 h-5" /> View Code
            </motion.a>
            <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="https://tmdownloader.vercel.app" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-500 transition-colors">
              <FiExternalLink className="w-5 h-5" /> Live Demo
            </motion.a>
          </div>
        </motion.div>
        <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.4, duration: 0.5 }} className="relative">
          <div className={`relative rounded-2xl overflow-hidden shadow-xl ${isDark ? 'shadow-blue-900/20' : 'shadow-gray-400/30'}`}>
            <img src="/images/tmdownloader.png" alt="Telegram Media Downloader Interface" className="w-full h-auto rounded-2xl border border-gray-200 dark:border-gray-700" />
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
