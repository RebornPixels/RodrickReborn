'use client';

import { motion } from 'framer-motion';
import { FiCode, FiCamera, FiLayers, FiGlobe } from 'react-icons/fi';
import { useTheme } from '../theme-provider';

const skills = [
  { name: 'React', category: 'Frontend', level: 90 },
  { name: 'Next.js', category: 'Fullstack', level: 85 },
  { name: 'TypeScript', category: 'Language', level: 80 },
  { name: 'Tailwind CSS', category: 'Styling', level: 95 },
  { name: 'Node.js', category: 'Backend', level: 75 },
  { name: 'Firebase', category: 'Database', level: 80 },
  { name: 'Figma', category: 'Design', level: 70 },
  { name: 'Git', category: 'Tools', level: 85 },
];

export default function AboutPage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <motion.section 
      className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900 transition-colors duration-300" 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left column - About content */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-800 dark:text-white">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-500 dark:from-blue-400 dark:to-purple-400">
              About Me
            </span>
          </h2>
          
          <div className="space-y-6 text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              I'm a passionate self-taught developer and creative based in Edmonton, Canada. With expertise in front-end development and UI/UX design, I specialize in building modern, accessible web applications that deliver exceptional user experiences.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800"
            >
              <div className="flex items-start">
                <FiCode className="w-6 h-6 mr-4 mt-1 text-blue-600 dark:text-blue-400" />
                <p>
                  My development philosophy centers around <span className="font-medium text-blue-800 dark:text-blue-200">clean code</span>, <span className="font-medium text-blue-800 dark:text-blue-200">thoughtful architecture</span>, and <span className="font-medium text-blue-800 dark:text-blue-200">performance optimization</span>. I stay current with industry trends to implement best practices in every project.
                </p>
              </div>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Beyond coding, I'm an avid photographer and videographer. This creative outlet enhances my development work, particularly in projects like <a href="/projects/reborn-pixels" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">Reborn Pixels</a> where I combine technical and artistic skills.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="p-6 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-100 dark:border-purple-800"
            >
              <div className="flex items-start">
                <FiGlobe className="w-6 h-6 mr-4 mt-1 text-purple-600 dark:text-purple-400" />
                <p>
                  I'm particularly interested in projects that <span className="font-medium text-purple-800 dark:text-purple-200">bridge technology and community</span>, like <a href="/projects/dzaleka-online" className="text-purple-600 dark:text-purple-400 hover:underline font-medium">Dzaleka Online</a>, which connects refugee communities through a custom social platform.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Right column - Skills */}
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">
            <span className="flex items-center">
              <FiLayers className="mr-3" />
              Skills & Expertise
            </span>
          </h3>
          
          <div className="space-y-6">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="group"
              >
                <div className="flex justify-between mb-2">
                  <span className="font-medium text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {skill.name}
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {skill.level}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2.5 rounded-full" 
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-12">
            <h3 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">
              <span className="flex items-center">
                <FiCamera className="mr-3" />
                Creative Pursuits
              </span>
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              When I'm not coding, you can find me:
            </p>
            <ul className="space-y-3 text-gray-700 dark:text-gray-300">
              <li className="flex items-start">
                <span className="mr-2 text-blue-500">•</span>
                Capturing landscapes and urban scenes with my DSLR
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-blue-500">•</span>
                Editing video projects and short films
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-blue-500">•</span>
                Experimenting with new photography techniques
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-blue-500">•</span>
                Teaching tech skills to local youth
              </li>
            </ul>
          </div>

        </motion.div>
      </div>

      <motion.a
            href="/Rodrick-Reborn-Resume.pdf"
            download="Rodrick-Reborn-Resume.pdf"
            aria-label="Download Resume (PDF)"
            className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg shadow-md transition-all duration-300 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.4)"
            }}
            whileTap={{ scale: 0.98 }}
            whileFocus={{ scale: 1.05 }}
          >
        <motion.svg 
          className="w-5 h-5"
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          viewBox="0 0 24 24"
          animate={{
            y: [0, -3, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 12v6m0 0l-3-3m3 3l3-3M12 4v8" 
          />
        </motion.svg>
        <span className="relative">
          Download Resume
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
        </span>
      </motion.a>
    </motion.section>
  );
}