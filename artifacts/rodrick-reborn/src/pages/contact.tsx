import { motion } from 'framer-motion';
import { FiMail, FiTwitter, FiLinkedin, FiGithub, FiSend, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const response = await fetch('https://formspree.io/f/xanepngl', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus('idle'), 6000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 6000);
      }
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 6000);
    }
  };

  return (
    <motion.section
      className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-500 dark:from-blue-400 dark:to-purple-400">
            Let's Connect
          </span>
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Have a project in mind or want to discuss opportunities? Reach out and let's create something amazing together.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Form */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg dark:shadow-gray-700/30"
        >
          <h3 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">Send Me a Message</h3>

          {status === 'success' && (
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700 text-green-800 dark:text-green-200 rounded-xl flex items-start gap-3">
              <FiCheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
              <p className="text-sm">Message sent! I'll get back to you within 24 hours.</p>
            </motion.div>
          )}
          {status === 'error' && (
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 text-red-800 dark:text-red-200 rounded-xl flex items-start gap-3">
              <FiAlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
              <p className="text-sm">Something went wrong. Please try again or email me directly at <a href="mailto:rodrickreborn@gmail.com" className="underline">rodrickreborn@gmail.com</a>.</p>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
              <input
                type="text" id="name" name="name" value={formData.name} onChange={handleChange} required
                placeholder="Your full name"
                className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-colors placeholder-gray-400"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
              <input
                type="email" id="email" name="email" value={formData.email} onChange={handleChange} required
                placeholder="your@email.com"
                className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-colors placeholder-gray-400"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message</label>
              <textarea
                id="message" name="message" value={formData.message} onChange={handleChange} required rows={5}
                placeholder="Tell me about your project or what you'd like to discuss..."
                className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-colors placeholder-gray-400 resize-none"
              />
            </div>
            <motion.button
              type="submit"
              disabled={status === 'sending'}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors disabled:opacity-60"
            >
              {status === 'sending' ? (
                <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Sending…</>
              ) : (
                <><FiSend className="w-4 h-4" /> Send Message</>
              )}
            </motion.button>
          </form>
        </motion.div>

        {/* Info */}
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg dark:shadow-gray-700/30 flex flex-col"
        >
          <h3 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">Contact Information</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-8 text-sm leading-relaxed">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
          </p>

          <div className="space-y-6">
            <a href="mailto:rodrickreborn@gmail.com" className="flex items-center gap-4 group">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full">
                <FiMail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-500 uppercase tracking-wider mb-0.5">Email</p>
                <span className="text-sm text-blue-600 dark:text-blue-400 group-hover:underline transition-colors">
                  rodrickreborn@gmail.com
                </span>
              </div>
            </a>

            <div className="flex items-center gap-4">
              <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full">
                <FiTwitter className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-500 uppercase tracking-wider mb-2">Socials</p>
                <div className="flex gap-3">
                  {[
                    { icon: FiTwitter, href: 'https://x.com/mistakesacademy', label: 'Twitter' },
                    { icon: FiLinkedin, href: 'https://linkedin.com/in/rodrickramadhani', label: 'LinkedIn' },
                    { icon: FiGithub, href: 'https://github.com/Rebreborn', label: 'GitHub' },
                  ].map(({ icon: Icon, href, label }) => (
                    <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      <Icon className="w-4 h-4" /> {label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-auto pt-8 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Available for work</span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-500">
              I typically respond within 24 hours. For urgent inquiries, mention it in your message.
            </p>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
