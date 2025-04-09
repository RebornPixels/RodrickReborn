'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import { useTheme } from '../theme-provider';

const projects = [
  {
    title: "dTunes",
    description: "A full-stack music platform for local artists to upload, share, and monetize their music.",
    tags: ["Next.js", "Firebase", "Stripe", "Tailwind CSS"],
    imageLight: "/images/dtunes-light.jpg",
    imageDark: "/images/dtunes-dark.jpg",
    link: "/projects/dtunes",
    github: "https://github.com/yourusername/dtunes",
    demo: "https://dtunes.app"
  },
  {
    title: "Dzaleka Online",
    description: "Community social platform connecting refugees through stories, media sharing, and real-time chat.",
    tags: ["Next.js", "Firestore", "Real-time", "Social"],
    imageLight: "/images/dzaleka-light.jpg",
    imageDark: "/images/dzaleka-dark.jpg",
    link: "/projects/dzaleka-online",
    github: "https://github.com/yourusername/dzaleka-online",
    demo: "https://dzaleka.online"
  },
  {
    title: "Reborn Pixels",
    description: "Creative portfolio showcasing photography and videography work with Cloudinary integration.",
    tags: ["Next.js", "Cloudinary", "Photography", "Admin"],
    imageLight: "/images/rebornpixels-light.jpg",
    imageDark: "/images/rebornpixels-dark.jpg",
    link: "/projects/reborn-pixels",
    github: "https://github.com/RebornPixels/portfolio",
    demo: "https://rebornpixels.com"
  },
  {
    title: "Windows of Hope",
    description: "Non-profit platform featuring donation processing, volunteer coordination, and impact stories.",
    tags: ["Next.js", "MongoDB", "Non-profit", "Stripe"],
    imageLight: "/images/woh-light.jpg",
    imageDark: "/images/woh-dark.jpg",
    link: "/projects/windows-of-hope",
    github: "https://github.com/yourusername/windowsofhope",
    demo: "https://windowsofhope.org"
  },
];

export default function ProjectsPage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <motion.section
      className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800 dark:text-white">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-500 dark:from-blue-400 dark:to-purple-400">
            My Projects
          </span>
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Here are some of my featured projects. Each one represents unique challenges and creative solutions.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            className="group relative overflow-hidden rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl dark:hover:shadow-blue-900/20 transition-all duration-300"
            whileHover={{ y: -5 }}
          >
            <div className="relative h-60 overflow-hidden">
              <Image
                src={isDark ? project.imageDark : project.imageLight}
                alt={project.title}
                fill
                className="object-cover transition-opacity duration-500 group-hover:opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>

            <div className="p-6 bg-white dark:bg-gray-900">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                <Link href={project.link}>{project.title}</Link>
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag, i) => (
                  <span 
                    key={i} 
                    className="text-xs px-2.5 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex gap-3 mt-4">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    <FiGithub className="w-4 h-4" />
                    Code
                  </a>
                )}
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    <FiExternalLink className="w-4 h-4" />
                    Live
                  </a>
                )}
                <Link 
                  href={project.link}
                  className="flex items-center gap-1.5 text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors ml-auto"
                >
                  Details →
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-center mt-16"
      >
        <Link
          href="/contact"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 dark:hover:bg-blue-500 transition-colors"
        >
          Interested in working together?
        </Link>
      </motion.div>
    </motion.section>
  );
}