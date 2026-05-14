import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { FiGithub, FiTwitter, FiLinkedin, FiArrowRight } from 'react-icons/fi';

const techs = [
  'React', 'Next.js', 'TypeScript', 'Firebase', 'Tailwind CSS',
  'Node.js', 'React Native', 'Stripe', 'Expo',
];

const socials = [
  { icon: FiGithub, href: 'https://github.com/Rebreborn', label: 'GitHub' },
  { icon: FiTwitter, href: 'https://x.com/mistakesacademy', label: 'Twitter' },
  { icon: FiLinkedin, href: 'https://linkedin.com/in/rodrickramadhani', label: 'LinkedIn' },
];

export default function HomePage() {
  return (
    <motion.section
      className="min-h-[88vh] flex flex-col justify-center items-center text-center px-6 py-16 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-4xl mx-auto w-full">
        {/* Availability badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="inline-flex items-center gap-2 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 text-xs font-medium px-3 py-1.5 rounded-full mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          Available for freelance &amp; collaborations
        </motion.div>

        <motion.h1
          className="text-5xl md:text-7xl font-extrabold text-gray-800 dark:text-white mb-6 leading-tight"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Hi, I'm{' '}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-500 dark:from-blue-400 dark:to-purple-400">
            Rodrick Reborn
          </span>
        </motion.h1>

        <motion.p
          className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          A full-stack developer &amp; creative thinker building digital experiences that are fast, functional, and meaningful — from web apps to mobile products.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="flex flex-wrap gap-4 justify-center mb-12"
        >
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 group"
          >
            View My Work
            <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 border-2 border-gray-300 hover:border-blue-600 dark:border-gray-600 dark:hover:border-blue-400 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-semibold px-8 py-3 rounded-xl transition-all duration-300"
          >
            Contact Me
          </Link>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.65 }}
          className="flex gap-4 justify-center mb-14"
        >
          {socials.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 shadow border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-300 dark:hover:border-blue-500 transition-all"
            >
              <Icon className="w-4 h-4" />
            </a>
          ))}
        </motion.div>

        {/* Tech pills */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.75 }}
        >
          <p className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-3 font-medium">Tech I work with</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {techs.map((tech) => (
              <span
                key={tech}
                className="text-xs px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 rounded-full shadow-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
