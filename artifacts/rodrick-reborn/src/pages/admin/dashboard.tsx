import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "wouter";
import {
  collection, getDocs, addDoc, updateDoc,
  deleteDoc, doc, orderBy, query,
  serverTimestamp, writeBatch,
} from "firebase/firestore";
import { db } from "../../lib/firebase";
import { useAuth } from "../../contexts/AuthContext";
import { STATIC_PROJECTS } from "../../lib/staticProjects";
import { ensureAbsolute } from "../../lib/urlUtils";
import {
  FiPlus, FiEdit2, FiTrash2, FiLogOut, FiExternalLink,
  FiGithub, FiX, FiCheck, FiSearch, FiArrowUp, FiArrowDown,
  FiEye, FiEyeOff, FiDownload, FiGrid, FiList, FiAlertTriangle, FiHome,
} from "react-icons/fi";

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
  hidden?: boolean;
};

const emptyProject: Omit<Project, "id"> = {
  title: "", description: "", tags: [],
  imageLight: "", imageDark: "",
  link: "", github: "", demo: "", order: 0,
  hidden: false,
};

type ViewMode = "list" | "grid";

export default function AdminDashboard() {
  const { logout, user } = useAuth();
  const [, navigate] = useLocation();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState<Project | null>(null);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [form, setForm] = useState<Omit<Project, "id">>(emptyProject);
  const [tagsInput, setTagsInput] = useState("");
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("list");

  const showToast = (msg: string, type: "success" | "error" = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const loadProjects = async () => {
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
    setSeeding(true);
    try {
      const batch = writeBatch(db);
      const colRef = collection(db, "projects");
      for (const p of STATIC_PROJECTS) {
        batch.set(doc(colRef), { ...p, createdAt: serverTimestamp() });
      }
      await batch.commit();
      showToast(`Imported ${STATIC_PROJECTS.length} default projects!`);
      await loadProjects();
    } catch (e: any) {
      showToast("Import failed: " + (e?.message ?? "unknown error"), "error");
    } finally {
      setSeeding(false);
    }
  };

  useEffect(() => { loadProjects(); }, []);

  // Filtered list
  const filtered = useMemo(() => {
    if (!search.trim()) return projects;
    const q = search.toLowerCase();
    return projects.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
    );
  }, [projects, search]);

  const openCreate = () => {
    setEditingProject(null);
    setForm({ ...emptyProject, order: projects.length });
    setTagsInput("");
    setModalOpen(true);
  };

  const openEdit = (p: Project) => {
    setEditingProject(p);
    setForm({
      title: p.title, description: p.description, tags: p.tags,
      imageLight: p.imageLight, imageDark: p.imageDark,
      link: p.link, github: p.github, demo: p.demo, order: p.order,
      hidden: p.hidden ?? false,
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
      github: ensureAbsolute(form.github),
      demo: ensureAbsolute(form.demo),
    };
    try {
      if (editingProject?.id) {
        await updateDoc(doc(db, "projects", editingProject.id), { ...data, updatedAt: serverTimestamp() });
        showToast("Project updated!");
      } else {
        const newRef = await addDoc(collection(db, "projects"), { ...data, createdAt: serverTimestamp() });
        if (!data.link) {
          await updateDoc(newRef, { link: `/projects/${newRef.id}` });
        }
        showToast("Project added!");
      }
      setModalOpen(false);
      loadProjects();
    } catch (e: any) {
      showToast(e.message || "Save failed", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteModal?.id) return;
    setDeleting(true);
    try {
      await deleteDoc(doc(db, "projects", deleteModal.id));
      showToast("Project deleted");
      setDeleteModal(null);
      loadProjects();
    } catch {
      showToast("Delete failed", "error");
    } finally {
      setDeleting(false);
    }
  };

  const moveOrder = async (project: Project, direction: "up" | "down") => {
    const idx = projects.findIndex((p) => p.id === project.id);
    const swapIdx = direction === "up" ? idx - 1 : idx + 1;
    if (swapIdx < 0 || swapIdx >= projects.length) return;
    const other = projects[swapIdx];
    try {
      await Promise.all([
        updateDoc(doc(db, "projects", project.id!), { order: other.order }),
        updateDoc(doc(db, "projects", other.id!), { order: project.order }),
      ]);
      loadProjects();
    } catch {
      showToast("Reorder failed", "error");
    }
  };

  const toggleHidden = async (project: Project) => {
    if (!project.id) return;
    const next = !project.hidden;
    try {
      await updateDoc(doc(db, "projects", project.id), { hidden: next, updatedAt: serverTimestamp() });
      setProjects(prev => prev.map(p => p.id === project.id ? { ...p, hidden: next } : p));
      showToast(next ? "Project hidden from public" : "Project is now visible");
    } catch {
      showToast("Failed to update visibility", "error");
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const formFields = [
    { label: "Title *", key: "title", type: "text", placeholder: "My Awesome Project" },
    { label: "Route link (leave blank to auto-generate)", key: "link", type: "text", placeholder: "/projects/my-project" },
    { label: "GitHub URL", key: "github", type: "text", placeholder: "https://github.com/..." },
    { label: "Live Demo URL", key: "demo", type: "text", placeholder: "https://myproject.vercel.app" },
    { label: "Image – light mode (URL or /images/file.png)", key: "imageLight", type: "text", placeholder: "/images/myproject.png" },
    { label: "Image – dark mode (URL or /images/file.png)", key: "imageDark", type: "text", placeholder: "/images/myproject_dark.png" },
    { label: "Display order (0 = first)", key: "order", type: "number", placeholder: "0" },
  ] as const;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Top bar */}
      <div className="sticky top-0 z-30 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link href="/" className="p-2 rounded-lg text-gray-500 hover:text-gray-800 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <FiHome className="w-4 h-4" />
            </Link>
            <div className="h-5 w-px bg-gray-300 dark:bg-gray-700" />
            <div>
              <h1 className="text-lg font-bold text-gray-800 dark:text-white leading-none">Admin Dashboard</h1>
              <p className="text-xs text-gray-400 mt-0.5">{user?.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap justify-end">
            <motion.button onClick={openCreate} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
              className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors text-sm">
              <FiPlus className="w-4 h-4" /> Add Project
            </motion.button>
            <motion.button onClick={() => {
              if (confirm(`Import all ${STATIC_PROJECTS.length} default projects? Existing projects will not be removed.`)) importDefaultProjects();
            }}
              disabled={seeding}
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
              className="flex items-center gap-1.5 px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:opacity-60 text-white font-medium rounded-lg transition-colors text-sm">
              <FiDownload className="w-4 h-4" /> {seeding ? "Importing…" : "Import Defaults"}
            </motion.button>
            <motion.button onClick={handleLogout} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
              className="flex items-center gap-1.5 px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg transition-colors text-sm">
              <FiLogOut className="w-4 h-4" /> Logout
            </motion.button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {[
            { label: "Total Projects", value: projects.length, color: "blue" },
            { label: "With Live Demo", value: projects.filter(p => p.demo).length, color: "green" },
            { label: "With GitHub", value: projects.filter(p => p.github).length, color: "purple" },
            { label: "Hidden", value: projects.filter(p => p.hidden).length, color: "red" },
            { label: "Search Results", value: filtered.length, color: "orange" },
          ].map(({ label, value, color }) => (
            <div key={label} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4">
              <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">{label}</p>
              <p className={`text-2xl font-bold ${
                color === "blue" ? "text-blue-600" :
                color === "green" ? "text-green-600" :
                color === "purple" ? "text-purple-600" :
                color === "red" ? "text-red-500" : "text-orange-500"
              }`}>{value}</p>
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3 mb-6">
          <div className="relative flex-1 max-w-sm">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title, tag, or description…"
              className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                <FiX className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
          <div className="flex items-center gap-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-1">
            <button onClick={() => setViewMode("list")}
              className={`p-2 rounded-lg transition-colors ${viewMode === "list" ? "bg-blue-50 dark:bg-blue-900/40 text-blue-600" : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"}`}>
              <FiList className="w-4 h-4" />
            </button>
            <button onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg transition-colors ${viewMode === "grid" ? "bg-blue-50 dark:bg-blue-900/40 text-blue-600" : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"}`}>
              <FiGrid className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Toast */}
        <AnimatePresence>
          {toast && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className={`fixed top-6 right-6 z-50 px-5 py-3 rounded-xl shadow-lg text-white font-medium flex items-center gap-2 ${toast.type === "success" ? "bg-green-600" : "bg-red-600"}`}>
              {toast.type === "success" ? <FiCheck /> : <FiX />} {toast.msg}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Content */}
        {loading || seeding ? (
          <div className="flex flex-col items-center justify-center py-24 gap-3">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
            {seeding && <p className="text-sm text-gray-500 dark:text-gray-400">Importing projects into Firestore…</p>}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24 bg-white dark:bg-gray-900 rounded-2xl border border-dashed border-gray-300 dark:border-gray-700">
            {search ? (
              <>
                <FiSearch className="w-10 h-10 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                <p className="text-gray-500 dark:text-gray-400 mb-1">No projects match "{search}"</p>
                <button onClick={() => setSearch("")} className="text-sm text-blue-600 dark:text-blue-400 underline">Clear search</button>
              </>
            ) : (
              <>
                <FiGrid className="w-10 h-10 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                <p className="text-gray-500 dark:text-gray-400 mb-4">No projects yet</p>
                <div className="flex gap-3 justify-center">
                  <button onClick={openCreate} className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700">Add a project</button>
                  <button onClick={() => importDefaultProjects()} className="px-4 py-2 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700">Import defaults</button>
                </div>
              </>
            )}
          </div>
        ) : viewMode === "list" ? (
          <div className="space-y-3">
            {filtered.map((p, i) => (
              <motion.div key={p.id} layout initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
                className="flex items-center gap-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4 hover:border-blue-300 dark:hover:border-blue-700 transition-colors group">

                {/* Order controls */}
                <div className="flex flex-col gap-0.5 flex-shrink-0">
                  <button onClick={() => moveOrder(p, "up")} disabled={i === 0}
                    className="p-1 rounded text-gray-300 hover:text-blue-500 disabled:opacity-20 transition-colors">
                    <FiArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-xs text-gray-400 text-center font-mono w-5 text-center">{p.order}</span>
                  <button onClick={() => moveOrder(p, "down")} disabled={i === filtered.length - 1}
                    className="p-1 rounded text-gray-300 hover:text-blue-500 disabled:opacity-20 transition-colors">
                    <FiArrowDown className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Thumbnail */}
                <img
                  src={p.imageLight || p.imageDark || '/images/project-placeholder.svg'}
                  alt={p.title}
                  className="w-20 h-14 object-cover rounded-lg border border-gray-200 dark:border-gray-700 flex-shrink-0 bg-gray-100 dark:bg-gray-800"
                />

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className={`font-semibold truncate ${p.hidden ? "text-gray-400 dark:text-gray-500" : "text-gray-800 dark:text-white"}`}>{p.title}</h3>
                    {p.hidden && (
                      <span className="flex-shrink-0 inline-flex items-center gap-1 text-xs px-2 py-0.5 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full font-medium border border-red-200 dark:border-red-800">
                        <FiEyeOff className="w-3 h-3" /> Hidden
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{p.description}</p>
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {p.tags.slice(0, 4).map((t) => (
                      <span key={t} className="text-xs px-2 py-0.5 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full">{t}</span>
                    ))}
                    {p.tags.length > 4 && <span className="text-xs text-gray-400">+{p.tags.length - 4}</span>}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 flex-shrink-0 opacity-60 group-hover:opacity-100 transition-opacity">
                  {p.link && !p.hidden && (
                    <a href={p.link} target="_blank" rel="noopener noreferrer"
                      className="p-2 rounded-lg text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors" title="Preview public page">
                      <FiEye className="w-4 h-4" />
                    </a>
                  )}
                  {p.demo && (
                    <a href={ensureAbsolute(p.demo)} target="_blank" rel="noopener noreferrer"
                      className="p-2 rounded-lg text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors" title="Live demo">
                      <FiExternalLink className="w-4 h-4" />
                    </a>
                  )}
                  {p.github && (
                    <a href={ensureAbsolute(p.github)} target="_blank" rel="noopener noreferrer"
                      className="p-2 rounded-lg text-gray-400 hover:text-gray-700 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" title="GitHub">
                      <FiGithub className="w-4 h-4" />
                    </a>
                  )}
                  <button onClick={() => toggleHidden(p)}
                    className={`p-2 rounded-lg transition-colors ${p.hidden ? "text-red-400 hover:text-green-500 hover:bg-green-50 dark:hover:bg-green-900/20" : "text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"}`}
                    title={p.hidden ? "Make visible to public" : "Hide from public"}>
                    {p.hidden ? <FiEye className="w-4 h-4" /> : <FiEyeOff className="w-4 h-4" />}
                  </button>
                  <button onClick={() => openEdit(p)}
                    className="p-2 rounded-lg text-gray-400 hover:text-yellow-500 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 transition-colors" title="Edit">
                    <FiEdit2 className="w-4 h-4" />
                  </button>
                  <button onClick={() => setDeleteModal(p)}
                    className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors" title="Delete">
                    <FiTrash2 className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          /* Grid view */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((p, i) => (
              <motion.div key={p.id} layout initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.04 }}
                className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden group hover:border-blue-300 dark:hover:border-blue-700 transition-colors">
                <div className="h-40 bg-gray-100 dark:bg-gray-800 overflow-hidden">
                  <img
                    src={p.imageLight || p.imageDark || '/images/project-placeholder.svg'}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className={`font-semibold text-sm leading-snug ${p.hidden ? "text-gray-400 dark:text-gray-500" : "text-gray-800 dark:text-white"}`}>{p.title}</h3>
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      {p.hidden && (
                        <span className="inline-flex items-center gap-1 text-xs px-1.5 py-0.5 bg-red-50 dark:bg-red-900/30 text-red-500 dark:text-red-400 rounded font-medium">
                          <FiEyeOff className="w-2.5 h-2.5" />
                        </span>
                      )}
                      <span className="text-xs text-gray-400 bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded font-mono">#{p.order}</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mb-3">{p.description}</p>
                  <div className="flex gap-2 justify-end items-center">
                    {p.link && !p.hidden && (
                      <a href={p.link} target="_blank" rel="noopener noreferrer" className="p-1.5 text-gray-400 hover:text-blue-500 transition-colors" title="Preview"><FiEye className="w-3.5 h-3.5" /></a>
                    )}
                    <button onClick={() => toggleHidden(p)}
                      className={`p-1.5 transition-colors ${p.hidden ? "text-red-400 hover:text-green-500" : "text-gray-400 hover:text-red-500"}`}
                      title={p.hidden ? "Make visible" : "Hide from public"}>
                      {p.hidden ? <FiEye className="w-3.5 h-3.5" /> : <FiEyeOff className="w-3.5 h-3.5" />}
                    </button>
                    <button onClick={() => openEdit(p)} className="p-1.5 text-gray-400 hover:text-yellow-500 transition-colors" title="Edit"><FiEdit2 className="w-3.5 h-3.5" /></button>
                    <button onClick={() => setDeleteModal(p)} className="p-1.5 text-gray-400 hover:text-red-500 transition-colors" title="Delete"><FiTrash2 className="w-3.5 h-3.5" /></button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-40 flex items-center justify-center p-4"
            onClick={(e) => { if (e.target === e.currentTarget) setModalOpen(false); }}>
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-gray-200 dark:border-gray-800">

              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800 sticky top-0 bg-white dark:bg-gray-900 z-10">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                  {editingProject ? "Edit Project" : "Add New Project"}
                </h2>
                <button onClick={() => setModalOpen(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                  <FiX className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                {formFields.map(({ label, key, type, placeholder }) => (
                  <div key={key}>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>
                    <input
                      type={type}
                      value={(form as any)[key]}
                      onChange={(e) => setForm((f) => ({ ...f, [key]: type === "number" ? Number(e.target.value) : e.target.value }))}
                      placeholder={placeholder}
                      className="w-full px-3 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition-colors"
                    />
                  </div>
                ))}

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                  <textarea value={form.description}
                    onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                    rows={3} placeholder="A short description of what this project does…"
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition-colors resize-none" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tags (comma-separated)</label>
                  <input type="text" value={tagsInput} onChange={(e) => setTagsInput(e.target.value)}
                    placeholder="React, Firebase, Tailwind CSS"
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition-colors" />
                  {tagsInput && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {tagsInput.split(",").map((t) => t.trim()).filter(Boolean).map((t) => (
                        <span key={t} className="text-xs px-2 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full">{t}</span>
                      ))}
                    </div>
                  )}
                </div>

                {!editingProject && (
                  <p className="text-xs text-gray-400 bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                    Leave the route link blank and a URL will be auto-generated using the project's Firestore ID (e.g. <code className="font-mono">/projects/abc123</code>).
                  </p>
                )}

                {/* Visibility toggle */}
                <div className="flex items-center justify-between p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Hide from public</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                      {form.hidden ? "This project is hidden and won't appear on the portfolio." : "This project is visible on the public portfolio."}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setForm(f => ({ ...f, hidden: !f.hidden }))}
                    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none ${form.hidden ? "bg-red-500" : "bg-gray-300 dark:bg-gray-600"}`}
                  >
                    <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${form.hidden ? "translate-x-5" : "translate-x-0"}`} />
                  </button>
                </div>
              </div>

              <div className="flex justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-800 sticky bottom-0 bg-white dark:bg-gray-900">
                <button onClick={() => setModalOpen(false)}
                  className="px-5 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl transition-colors">
                  Cancel
                </button>
                <motion.button onClick={handleSave} disabled={saving}
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  className="px-5 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-60 rounded-xl transition-colors">
                  {saving ? "Saving…" : editingProject ? "Update Project" : "Add Project"}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
            onClick={(e) => { if (e.target === e.currentTarget) setDeleteModal(null); }}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md p-6 border border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center flex-shrink-0">
                  <FiAlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white">Delete Project</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">This action cannot be undone.</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-6 bg-gray-50 dark:bg-gray-800 rounded-xl p-3">
                Are you sure you want to delete <strong className="text-gray-800 dark:text-white">"{deleteModal.title}"</strong>?
              </p>
              <div className="flex gap-3 justify-end">
                <button onClick={() => setDeleteModal(null)} disabled={deleting}
                  className="px-5 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl transition-colors">
                  Cancel
                </button>
                <motion.button onClick={handleDelete} disabled={deleting}
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  className="px-5 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 disabled:opacity-60 rounded-xl transition-colors flex items-center gap-2">
                  {deleting ? <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Deleting…</> : <><FiTrash2 className="w-4 h-4" /> Delete</>}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
