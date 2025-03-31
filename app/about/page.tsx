'use client';

import { motion } from 'framer-motion';

export default function AboutPage() {
  return (
    <motion.section 
      className="max-w-4xl mx-auto py-16 px-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-12">
        <h2 className="text-4xl font-bold mb-6 text-gray-800 dark:text-white">About Me</h2>
        <div className="space-y-6 text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
          <p>
            I'm a self-taught developer and creative based in Edmonton, Canada. With a strong focus on front-end development,
            I love turning ideas into reality through code.
          </p>
          <p>
            Whether it's building web apps, designing interfaces, or experimenting with new tools,
            I'm always up for a challenge that pushes my boundaries and helps me grow.
          </p>
          <p>
            My approach combines technical expertise with creative problem-solving to deliver solutions
            that are not just functional but also delightful to use.
          </p>
          <p>
            Outside of coding, I enjoy photography and videography as a creative outlet. Capturing meaningful moments through a lens gives me a fresh perspective and lets me tell visual stories in ways code can't.
            I blend this hobby into my professional work, especially with projects like <a href="/projects" className="text-blue-600 dark:text-blue-400 underline">Reborn Pixels</a>.
          </p>
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Skills & Technologies</h3>
        <div className="flex flex-wrap gap-3">
          {['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Firebase', 'Figma', 'Git'].map((skill) => (
            <span 
              key={skill}
              className="bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded-full text-gray-800 dark:text-gray-200 font-medium"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </motion.section>
  );
}