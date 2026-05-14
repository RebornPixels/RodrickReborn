import { motion } from 'framer-motion';
import { FiUsers, FiDollarSign, FiTrendingUp, FiGithub, FiExternalLink } from 'react-icons/fi';
import { useTheme } from '../../theme-provider';

const features = [
  { icon: <FiUsers className="w-5 h-5" />, title: "Community-Powered", description: "100 members contribute $100/month to build a $10,000 monthly investment pool." },
  { icon: <FiDollarSign className="w-5 h-5" />, title: "Strategic Investments", description: "Funds are allocated to agriculture, livestock, and agro-processing ventures." },
  { icon: <FiTrendingUp className="w-5 h-5" />, title: "Sustainable Returns", description: "Targeted 8–15% annual ROI through diversified and professionally managed investments." }
];

const techStack = [
  { name: 'React', color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-100 dark:bg-blue-900/30' },
  { name: 'Firebase', color: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-100 dark:bg-orange-900/30' },
  { name: 'Tailwind CSS', color: 'text-teal-600 dark:text-teal-400', bg: 'bg-teal-100 dark:bg-teal-900/30' },
  { name: 'Netlify', color: 'text-green-600 dark:text-green-400', bg: 'bg-green-100 dark:bg-green-900/30' }
];

export default function DoPeVestPage() {
  const { isDark } = useTheme();

  return (
    <motion.section className="max-w-6xl mx-auto py-16 px-4 sm:px-6 lg:px-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2, duration: 0.5 }}>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800 dark:text-white">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-blue-500 dark:from-green-400 dark:to-blue-400">DoPeVest</span>
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
            DoPeVest is a community-driven investment platform where 100 members pool resources to generate passive income through strategic investments in agriculture, livestock, and agro-processing.
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
            <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="https://dopevest.netlify.app/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              <FiExternalLink className="w-5 h-5" /> Visit Platform
            </motion.a>
          </div>
        </motion.div>
        <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.4, duration: 0.5 }} className="relative">
          <div className={`relative rounded-2xl overflow-hidden shadow-xl ${isDark ? 'shadow-green-900/20' : 'shadow-gray-400/30'}`}>
            <img src={isDark ? '/images/dopevest_dark.png' : '/images/dopevest_light.png'} alt="DoPeVest Screenshot" className="w-full h-auto rounded-2xl border border-gray-200 dark:border-gray-700" />
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
