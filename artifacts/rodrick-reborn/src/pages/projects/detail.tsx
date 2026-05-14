import { useEffect, useState } from 'react';
import { useParams, Link } from 'wouter';
import { doc, getDoc } from 'firebase/firestore';
import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink, FiArrowLeft } from 'react-icons/fi';
import { db } from '../../lib/firebase';
import { useTheme } from '../../theme-provider';
import { STATIC_PROJECTS } from '../../lib/staticProjects';
import { ensureAbsolute } from '../../lib/urlUtils';

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

export default function ProjectDetailPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!id) { setNotFound(true); setLoading(false); return; }

    const fetch = async () => {
      try {
        const snap = await getDoc(doc(db, 'projects', id));
        if (snap.exists()) {
          setProject({ id: snap.id, ...snap.data() } as Project);
        } else {
          setNotFound(true);
        }
      } catch {
        // Fallback: try matching by slug in static data
        const slug = id;
        const match = STATIC_PROJECTS.find(p => p.link === `/projects/${slug}`);
        if (match) {
          setProject({ id: slug, ...match });
        } else {
          setNotFound(true);
        }
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (notFound || !project || project.hidden) {
    return (
      <div className="max-w-2xl mx-auto py-20 px-4 text-center">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">Project Not Found</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8">This project doesn't exist or may have been removed.</p>
        <Link href="/projects" className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline">
          <FiArrowLeft /> Back to all projects
        </Link>
      </div>
    );
  }

  const image =
    (isDark ? (project.imageDark || project.imageLight) : (project.imageLight || project.imageDark))
    || '/images/project-placeholder.svg';

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto py-12 px-4"
    >
      <Link href="/projects" className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors mb-8">
        <FiArrowLeft /> All Projects
      </Link>

      <div className="rounded-2xl overflow-hidden shadow-xl mb-8 border border-gray-200 dark:border-gray-700">
        <img src={image} alt={project.title} className="w-full h-72 object-cover" />
      </div>

      <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">{project.title}</h1>

      <div className="flex flex-wrap gap-2 mb-6">
        {project.tags.map((tag, i) => (
          <span key={i} className="text-sm px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full">
            {tag}
          </span>
        ))}
      </div>

      <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-4">
        {project.github && (
          <a
            href={ensureAbsolute(project.github)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 dark:bg-gray-700 hover:bg-gray-800 dark:hover:bg-gray-600 text-white rounded-lg transition-colors font-medium"
          >
            <FiGithub className="w-4 h-4" /> View Code
          </a>
        )}
        {project.demo && (
          <a
            href={ensureAbsolute(project.demo)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
          >
            <FiExternalLink className="w-4 h-4" /> Live Demo
          </a>
        )}
      </div>
    </motion.div>
  );
}
