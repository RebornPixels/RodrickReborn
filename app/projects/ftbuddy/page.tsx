'use client';

import { motion } from 'framer-motion';
import { FiCpu, FiHeart, FiMusic, FiExternalLink, FiGithub } from 'react-icons/fi';
import { useTheme } from '../../theme-provider';

const features = [
  { icon: <FiCpu className="w-5 h-5" />, title: "AI Voice Coaching", description: "Get real-time motivation and guidance through voice interaction" },
  { icon: <FiHeart className="w-5 h-5" />, title: "Workout Tracking", description: "Log your daily workouts and monitor intensity and progress" },
  { icon: <FiMusic className="w-5 h-5" />, title: "Music Playback", description: "Enhance your workout sessions with integrated music support" }
];

const techStack = [
  { name: 'React Native', color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-100 dark:bg-blue-900/30' },
  { name: 'Firebase', color: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-100 dark:bg-orange-900/30' },
  { name: 'Voice AI', color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-100 dark:bg-purple-900/30' },
  { name: 'TTS', color: 'text-green-600 dark:text-green-400', bg: 'bg-green-100 dark:bg-green-900/30' }
];

export default function FitBuddyPage() {
  const { theme, isDark } = useTheme();

  return (
    <motion.section className="max-w-6xl mx-auto py-16 px-4 sm:px-6 lg:px-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2, duration: 0.5 }}>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800 dark:text-white">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-500 dark:from-purple-400 dark:to-pink-400">FtBuddy</span>
          </h1>

          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
            FtBuddy is your smart AI fitness companion with voice-powered coaching, music support, and workout logging.
            Perfect for home and gym users looking to stay consistent and motivated.
          </p>

          <div className="mb-8 grid grid-cols-1 gap-4">
            {features.map((feature, index) => (
              <motion.div key={index} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + index * 0.1 }} className="p-4 bg-pink-50 dark:bg-pink-900/20 rounded-lg border border-pink-100 dark:border-pink-800 flex items-start">
                <div className="mr-3 mt-0.5 text-pink-600 dark:text-pink-400">{feature.icon}</div>
                <div>
                  <h3 className="font-semibold text-pink-800 dark:text-pink-200 mb-1">{feature.title}</h3>
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
            <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="https://github.com/rebreborn/fitbuddy" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-3 bg-gray-800 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors">
              <FiGithub className="w-5 h-5" /> View Code
            </motion.a>
            <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="https://ftbuddy.netlify.app/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 dark:hover:bg-purple-500 transition-colors">
              <FiExternalLink className="w-5 h-5" /> Visit App
            </motion.a>
          </div>
        </motion.div>

        <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.4, duration: 0.5 }} className="relative">
          <div className={`relative rounded-2xl overflow-hidden shadow-xl ${isDark ? 'shadow-pink-900/20' : 'shadow-gray-400/30'}`}>
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 dark:from-purple-400/5 dark:to-pink-400/5" />
            <img
              src={isDark ? '/images/ftbuddy.png' : '/images/ftbuddy.png'}
              alt="FitBuddy App Screenshot"
              className="w-full h-auto rounded-2xl border border-gray-200 dark:border-gray-700"
            />
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}