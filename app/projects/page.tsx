'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const projects = [
  {
    title: "Dzaleka Online",
    description: "A community platform with posts, likes, comments, artist profiles, and music uploads. Built using React, Firebase, and Firestore.",
    tags: ["React", "Firebase", "Tailwind CSS"],
    link: "https://dzalekaonlineh.web.app/"
  },
  {
    title: "The 100 DoPe Project",
    description: "A collaborative farming initiative aimed at generating passive income for members. Includes a modern dashboard and admin panel.",
    tags: ["Next.js", "MongoDB", "Node.js"],
    link: "#"
  },
  {
    title: "Reborn Pixels",
    description: "A photography and videography portfolio website with admin panel, booking system, image uploads, and Cloudinary integration.",
    tags: ["Next.js", "Tailwind CSS", "Cloudinary"],
    link: "https://reborn-pixels-production.web.app"
  },
  {
    title: "dTunes",
    description: "A full music streaming platform for local artists with profiles, payments (Stripe & Flutterwave), playlists, and an admin dashboard.",
    tags: ["React", "Firebase", "Stripe", "Flutterwave"],
    link: "https://dtunes-3f94b.web.app/"
  },
  {
    title: "Photography Portfolio",
    description: "A curated collection of my favorite shots and creative captures. Photography is a passion that blends well with my visual storytelling.",
    tags: ["Creative", "Hobby", "Photography"],
    link: "https://reborn-pixels-production.web.app/"
  }
];

export default function ProjectsPage() {
  return (
    <motion.section 
      className="max-w-4xl mx-auto py-16 px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-4xl font-bold mb-12 text-gray-800 dark:text-white">My Projects</h2>
      
      <div className="space-y-10">
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <h3 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white">{project.title}</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map(tag => (
                <span key={tag} className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm px-3 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
            
            <Link 
              href={project.link}
              className="inline-block text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors"
            >
              View Project →
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}