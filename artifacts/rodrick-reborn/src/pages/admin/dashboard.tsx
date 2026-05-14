import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  orderBy,
  query,
  serverTimestamp,
  writeBatch,
} from "firebase/firestore";
import { db } from "../../lib/firebase";
import { useAuth } from "../../contexts/AuthContext";
import { STATIC_PROJECTS } from "../../lib/staticProjects";
import { FiPlus, FiEdit2, FiTrash2, FiLogOut, FiExternalLink, FiGithub, FiX, FiCheck } from "react-icons/fi";

export type Project = {
  id?: string;
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

const emptyProject: Omit<Project, "id"> = {
  title: "",
  description: "",
  tags: [],
  imageLight: "",
  imageDark: "",
  link: "",
  github: "",
  demo: "",
  order: 0,
};

export default function AdminDashboard() {
  const { logout, user } = useAuth();
  const [, navigate] = useLocation();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [form, setForm] = useState<Omit<Project, "id">>(emptyProject);
  const [tagsInput, setTagsInput] = useState("");
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);

  const showToast = (msg: string, type: "success" | "error" = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, "projects"), orderBy("order", "asc"));
      const snap = await getDocs(q);
      setProjects(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Project)));
    } catch (e: any) {
      showToast("Failed to load projects: " + (e?.message ?? "unknown error"), "error");
    } finally {
      setLoading(false);
    }
  };

  const importDefaultProjects = async () => {
    if (!confirm(`This will add all ${STATIC_PROJECTS.length} default projects to Firestore. Your existing projects will not be removed. Continue?`)) return;
    setSeeding(true);
    try {
      const batch = writeBatch(db);
      const colRef = collection(db, "projects");
      for (const p of STATIC_PROJECTS) {
        const newRef = doc(colRef);
        batch.set(newRef, { ...p, createdAt: serverTimestamp() });
      }
      await batch.commit();
      showToast(`Imported ${STATIC_PROJECTS.length} default projects!`);
      const q = query(collection(db, "projects"), orderBy("order", "asc"));
      const snap = await getDocs(q);
      setProjects(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Project)));
    } catch (e: any) {
      showToast("Import failed: " + (e?.message ?? "unknown error"), "error");
    } finally {
      setSeeding(false);
    }
  };

  useEffect(() => { fetchProjects(); }, []);

  const openCreate = () => {
    setEditingProject(null);
    setForm({ ...emptyProject, order: projects.length });
    setTagsInput("");
    setModalOpen(true);
  };

  const openEdit = (p: Project) => {
    setEditingProject(p);
    setForm({
      title: p.title,
      description: p.description,
      tags: p.tags,
      imageLight: p.imageLight,
      imageDark: p.imageDark,
      link: p.link,
      github: p.github,
      demo: p.demo,
      order: p.order,
    });
    setTagsInput(p.tags.join(", "));
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!form.title.trim()) return showToast("Title is required", "error");
    setSaving(true);
    const data = {
      ...form,
      tags: tagsInput.split(",").map((t) => t.trim()).filter(Boolean),
    };
    try {
      if (editingProject?.id) {
        await updateDoc(doc(db, "projects", editingProject.id), {
          ...data,
          updatedAt: serverTimestamp(),
        });
        showToast("Project updated!");
      } else {
        // Create the document first to get its ID
        const newRef = await addDoc(collection(db, "projects"), {
          ...data,
          createdAt: serverTimestamp(),
        });
        // Auto-set the link to the Firestore doc ID so the detail page works
        if (!data.link) {
          await updateDoc(newRef, { link: `/projects/${newRef.id}` });
        }
        showToast("Project added!");
      }
      setModalOpen(false);
      fetchProjects();
    } catch (e: any) {
      showToast(e.message || "Save failed", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, "projects", id));
      showToast("Project deleted");
      setDeleteConfirm(null);
      fetchProjects();
    } catch {
      showToast("Delete failed", "error");
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Admin Dashboard</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{user?.email}</p>
          </div>
          <div className="flex gap-3 flex-wrap">
            <motion.button
              onClick={openCreate}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            >
              <FiPlus /> Add Project
            </motion.button>
            <motion.button
              onClick={importDefaultProjects}
              disabled={seeding}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              title="Import all 15 default portfolio projects into Firestore"
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:opacity-60 text-white font-medium rounded-lg transition-colors text-sm"
            >
              {seeding ? "Importing…" : "Import Defaults"}
            </motion.button>
            <motion.button
              onClick={handleLogout}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg transition-colors"
            >
              <FiLogOut /> Logout
            </motion.button>
          </div>
        </div>

        {/* Toast */}
        <AnimatePresence>
          {toast && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`fixed top-6 right-6 z-50 px-5 py-3 rounded-lg shadow-lg text-white font-medium flex items-center gap-2 ${toast.type === "success" ? "bg-green-600" : "bg-red-600"}`}
            >
              {toast.type === "success" ? <FiCheck /> : <FiX />} {toast.msg}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Projects Table */}
        {loading || seeding ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
            {seeding && (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                First time setup — seeding projects into Firestore…
              </p>
            )}
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 dark:text-gray-400 mb-4">No projects found.</p>
            <button onClick={openCreate} className="text-blue-600 dark:text-blue-400 underline">
              Add your first project
            </button>
          </div>
        ) : (
          <div className="grid gap-4">
            {projects.map((p) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 shadow-sm"
              >
                {(p.imageLight || p.imageDark) ? (
                  <img
                    src={p.imageLight || p.imageDark}
                    alt={p.title}
                    className="w-20 h-14 object-cover rounded-lg border border-gray-200 dark:border-gray-600 flex-shrink-0"
                  />
                ) : (
                  <div className="w-20 h-14 rounded-lg border border-gray-200 dark:border-gray-600 flex-shrink-0 bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-400 text-xs">
                    No img
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-800 dark:text-white truncate">{p.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{p.description}</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {p.tags.slice(0, 4).map((t) => (
                      <span key={t} className="text-xs px-2 py-0.5 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  {p.demo && (
                    <a href={p.demo} target="_blank" rel="noopener noreferrer" className="p-2 text-gray-400 hover:text-blue-500 transition-colors">
                      <FiExternalLink />
                    </a>
                  )}
                  {p.github && (
                    <a href={p.github} target="_blank" rel="noopener noreferrer" className="p-2 text-gray-400 hover:text-gray-700 dark:hover:text-white transition-colors">
                      <FiGithub />
                    </a>
                  )}
                  <button onClick={() => openEdit(p)} className="p-2 text-gray-400 hover:text-yellow-500 transition-colors">
                    <FiEdit2 />
                  </button>
                  {deleteConfirm === p.id ? (
                    <div className="flex items-center gap-1">
                      <button onClick={() => handleDelete(p.id!)} className="px-2 py-1 bg-red-600 text-white text-xs rounded">
                        Yes
                      </button>
                      <button onClick={() => setDeleteConfirm(null)} className="px-2 py-1 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-white text-xs rounded">
                        No
                      </button>
                    </div>
                  ) : (
                    <button onClick={() => setDeleteConfirm(p.id!)} className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                      <FiTrash2 />
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Modal */}
        <AnimatePresence>
          {modalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center p-4"
              onClick={(e) => { if (e.target === e.currentTarget) setModalOpen(false); }}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              >
                <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800 z-10">
                  <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                    {editingProject ? "Edit Project" : "Add New Project"}
                  </h2>
                  <button onClick={() => setModalOpen(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                    <FiX />
                  </button>
                </div>

                <div className="p-6 space-y-4">
                  {[
                    { label: "Title *", key: "title", type: "text", placeholder: "My Awesome Project" },
                    { label: "Route link — leave blank to auto-generate (e.g. /projects/dtunes)", key: "link", type: "text", placeholder: "/projects/my-project (leave blank to auto-generate)" },
                    { label: "GitHub URL", key: "github", type: "text", placeholder: "https://github.com/..." },
                    { label: "Live Demo URL", key: "demo", type: "text", placeholder: "https://myproject.vercel.app" },
                    { label: "Image (light mode) — URL or /images/filename.png", key: "imageLight", type: "text", placeholder: "/images/myproject.png" },
                    { label: "Image (dark mode) — URL or /images/filename.png", key: "imageDark", type: "text", placeholder: "/images/myproject_dark.png" },
                    { label: "Display order (0 = first)", key: "order", type: "number", placeholder: "0" },
                  ].map(({ label, key, type, placeholder }) => (
                    <div key={key}>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>
                      <input
                        type={type}
                        value={(form as any)[key]}
                        onChange={(e) => setForm((f) => ({ ...f, [key]: type === "number" ? Number(e.target.value) : e.target.value }))}
                        placeholder={placeholder}
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      />
                    </div>
                  ))}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                    <textarea
                      value={form.description}
                      onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                      rows={3}
                      placeholder="A short description of what this project does..."
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tags (comma-separated)</label>
                    <input
                      type="text"
                      value={tagsInput}
                      onChange={(e) => setTagsInput(e.target.value)}
                      placeholder="React, Firebase, Tailwind CSS"
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                  </div>

                  {!editingProject && (
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                      Leave the route link blank and a detail page URL will be automatically generated using the project's ID.
                    </p>
                  )}
                </div>

                <div className="flex justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={() => setModalOpen(false)}
                    className="px-5 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <motion.button
                    onClick={handleSave}
                    disabled={saving}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-5 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-60 rounded-lg transition-colors"
                  >
                    {saving ? "Saving…" : editingProject ? "Update" : "Add Project"}
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
