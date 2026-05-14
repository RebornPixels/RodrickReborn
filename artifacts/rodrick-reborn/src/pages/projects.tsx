import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import { useTheme } from '../theme-provider';
import { useState, useEffect } from 'react';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../lib/firebase';

type Project = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  imageLight: string;
  imageDark: string;
  link: string;
  github: string;
  demo: string;
  order: number;
};

const STATIC_PROJECTS: Omit<Project, 'id'>[] = [
  {
    title: "dTunes",
    description: "A full-stack music platform for local artists to upload, share, and monetize their music.",
    tags: ["Next.js", "Firebase", "Stripe", "Tailwind CSS"],
    imageLight: "/images/dtunes.png",
    imageDark: "/images/dtunes.png",
    link: "/projects/dtunes",
    github: "https://github.com/RebornPixels/dTunes",
    demo: "https://dtunes.vercel.app",
    order: 0,
  },
  {
    title: "Dzaleka Online",
    description: "Community social platform connecting refugees through stories, media sharing, and real-time chat.",
    tags: ["Next.js", "Firestore", "Real-time", "Social"],
    imageLight: "/images/dcitylight.png",
    imageDark: "/images/dcitydark.png",
    link: "/projects/dzaleka-online",
    github: "https://github.com/RebReborn/dzalekaonline",
    demo: "https://dzalekaonlineh.web.app/",
    order: 1,
  },
  {
    title: "Reborn Pixels",
    description: "Creative portfolio showcasing photography and videography work with Cloudinary integration.",
    tags: ["Next.js", "Cloudinary", "Photography", "Admin"],
    imageLight: "/images/reborn.png",
    imageDark: "/images/rebornGold.png",
    link: "/projects/reborn-pixels",
    github: "https://github.com/RebornPixels/portfolio",
    demo: "https://reborn-pixels-production.web.app",
    order: 2,
  },
  {
    title: "Windows of Hope",
    description: "Non-profit platform featuring donation processing, volunteer coordination, and impact stories.",
    tags: ["Next.js", "MongoDB", "Non-profit", "Stripe"],
    imageLight: "/images/wohopelight.png",
    imageDark: "/images/wohopedark.png",
    link: "/projects/windows-of-hope",
    github: "https://github.com/RebReborn/windows-of-hope",
    demo: "https://windowsofhope.vercel.app",
    order: 3,
  },
  {
    title: "Telegram Media Downloader",
    description: "Browser-based tool to securely download media from Telegram chats and channels.",
    tags: ["React", "Telegram API", "GramJS", "Media Downloader"],
    imageLight: "/images/tmdownloader.png",
    imageDark: "/images/tmdownloader.png",
    link: "/projects/tmdownloader",
    github: "https://github.com/rebreborn/telegram-media-downloader",
    demo: "https://tmdownloader.vercel.app/",
    order: 4,
  },
  {
    title: "LoopHire",
    description: "A social job referral platform that connects job seekers with professionals willing to refer them.",
    tags: ["React", "Firebase", "Job Board", "Referral Platform"],
    imageLight: "/images/loophire.png",
    imageDark: "/images/loophire.png",
    link: "/projects/loophire",
    github: "https://github.com/rebreborn/referral",
    demo: "https://loophire.netlify.app/",
    order: 5,
  },
  {
    title: "Instagram Non-Followers Checker",
    description: "A browser-based tool that helps Instagram users identify who isn't following them back.",
    tags: ["Instagram", "Non-Followers", "Browser Tool", "Social Media"],
    imageLight: "/images/instagram.png",
    imageDark: "/images/instagram.png",
    link: "/projects/instagram-non-followers-checker",
    github: "",
    demo: "https://instagram-non-followers.vercel.app/",
    order: 6,
  },
  {
    title: "Malawi Maketi",
    description: "An e-commerce marketplace tailored for Malawi, featuring local mobile money (Airtel API) and vendor stores.",
    tags: ["React", "Firebase", "Mobile Money", "E-Commerce"],
    imageLight: "/images/maketi_light.png",
    imageDark: "/images/maketi_dark.png",
    link: "/projects/maketi",
    github: "https://github.com/rebreborn/malawi-maketi",
    demo: "https://maketi.vercel.app",
    order: 7,
  },
  {
    title: "FtBuddy",
    description: "Voice-powered AI fitness assistant with workout tracking, nutrition analysis, and real-time coaching.",
    tags: ["React Native", "Firebase", "Voice AI", "Fitness"],
    imageLight: "/images/ftbuddy_light.png",
    imageDark: "/images/ftbuddy_dark.png",
    link: "/projects/ftbuddy",
    github: "https://github.com/rebreborn/",
    demo: "https://ftbuddy.netlify.app/",
    order: 8,
  },
  {
    title: "Kibembe Language App",
    description: "A community-driven language learning app for Kibembe featuring audio/image contributions and AI validation.",
    tags: ["React", "Firebase", "Language Learning", "AI"],
    imageLight: "/images/kibembe_light.png",
    imageDark: "/images/kibembe_dark.png",
    link: "/projects/kibembe",
    github: "https://github.com/rebreborn/",
    demo: "https://kibembe.com/",
    order: 9,
  },
  {
    title: "Swahili Number Converter",
    description: "A simple tool that converts numeric values into written Swahili words.",
    tags: ["React", "Swahili", "Language Tools", "Education"],
    imageLight: "/images/swahili2words.png",
    imageDark: "/images/swahili2words_2.png",
    link: "/projects/swahili-number-converter",
    github: "https://github.com/RebReborn/swahili2words",
    demo: "",
    order: 10,
  },
  {
    title: "Lunax Decor",
    description: "An event and wedding decor service offering elegant setups, floral arrangements, and personalized design.",
    tags: ["Business", "Event Decor", "Weddings", "Creative Services"],
    imageLight: "/images/lunax_light.png",
    imageDark: "/images/lunax_dark.png",
    link: "/projects/lunaxdecor",
    github: "",
    demo: "https://lunaxdecor.com/",
    order: 11,
  },
  {
    title: "MoodShare",
    description: "A social media app for sharing moods, moments, and expressions.",
    tags: ["React Native", "Firebase", "Social Media", "Mobile App"],
    imageLight: "/images/moodshare_light.png",
    imageDark: "/images/moodshare_dark.png",
    link: "/projects/moodshare",
    github: "https://github.com/rebreborn/",
    demo: "https://moodshare.netlify.app/",
    order: 12,
  },
  {
    title: "Reborn Pixels (Photography)",
    description: "A creative photography and videography portfolio showcasing events, weddings, portraits, and brand visuals.",
    tags: ["Photography", "Videography", "Portfolio", "Creative Services"],
    imageLight: "/images/rebornpixels.png",
    imageDark: "/images/rebornpixels.png",
    link: "/projects/reborn-netflix",
    github: "",
    demo: "https://rebornpixels.netlify.app/",
    order: 13,
  },
  {
    title: "DoPeVest",
    description: "A community-driven investment platform where 100 members pool resources to generate passive income.",
    tags: ["React", "Firebase", "Community Investment", "Netlify"],
    imageLight: "/images/dopevest_light.png",
    imageDark: "/images/dopevest_dark.png",
    link: "/projects/dopevest",
    github: "",
    demo: "https://dopevest.netlify.app/",
    order: 14,
  },
];

export default function ProjectsPage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const staticFallback = STATIC_PROJECTS.map((p, i) => ({ ...p, id: `static-${i}` }));
  const [projects, setProjects] = useState<Project[]>(staticFallback);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const fetchProjects = async () => {
      try {
        const timeout = new Promise<null>((_, reject) =>
          setTimeout(() => reject(new Error('timeout')), 6000)
        );
        const q = query(collection(db, 'projects'), orderBy('order', 'asc'));
        const snap = await Promise.race([getDocs(q), timeout]);
        if (cancelled || !snap) return;
        const firestoreProjects = (snap as Awaited<ReturnType<typeof getDocs>>).docs.map(
          d => ({ id: d.id, ...d.data() } as Project)
        );
        if (firestoreProjects.length > 0) {
          setProjects(firestoreProjects);
        }
      } catch {
        // keep static fallback already shown
      }
    };
    fetchProjects();
    return () => { cancelled = true; };
  }, []);

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

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.05 }}
              className="group relative overflow-hidden rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl dark:hover:shadow-blue-900/20 transition-all duration-300"
              whileHover={{ y: -5 }}
            >
              <div className="relative h-60 overflow-hidden bg-gray-100 dark:bg-gray-800">
                <img
                  src={isDark ? (project.imageDark || project.imageLight) : (project.imageLight || project.imageDark)}
                  alt={project.title}
                  className="w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>

              <div className="p-6 bg-white dark:bg-gray-900">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {project.link ? <Link href={project.link}>{project.title}</Link> : project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="text-xs px-2.5 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3 mt-4">
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      <FiGithub className="w-4 h-4" /> Code
                    </a>
                  )}
                  {project.demo && (
                    <a href={project.demo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      <FiExternalLink className="w-4 h-4" /> Live
                    </a>
                  )}
                  {project.link && (
                    <Link href={project.link} className="flex items-center gap-1.5 text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors ml-auto">
                      Details →
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

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
