import { useState } from "react";
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { useAuth } from "../../contexts/AuthContext";

function friendlyError(code: string): string {
  switch (code) {
    case "auth/operation-not-allowed":
      return "Email/Password sign-in is not enabled. Go to Firebase Console → Authentication → Sign-in method → Email/Password and enable it.";
    case "auth/user-not-found":
    case "auth/invalid-credential":
    case "auth/wrong-password":
      return "Invalid email or password. Make sure this account exists under Firebase Console → Authentication → Users.";
    case "auth/invalid-email":
      return "That doesn't look like a valid email address.";
    case "auth/too-many-requests":
      return "Too many failed attempts. Please wait a few minutes and try again.";
    case "auth/network-request-failed":
      return "Network error — check your internet connection and try again.";
    default:
      return "";
  }
}

export default function AdminLoginPage() {
  const { login } = useAuth();
  const [, navigate] = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSetup, setShowSetup] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      navigate("/admin/dashboard");
    } catch (err: any) {
      const code: string = err?.code ?? "";
      const friendly = friendlyError(code);
      if (friendly) {
        setError(friendly);
      } else if (err?.message?.includes("not authorized")) {
        setError("This email is not on the admin whitelist.");
      } else {
        setError(err.message || "Failed to sign in. Check your credentials.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700"
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-blue-100 dark:bg-blue-900/40 mb-4">
              <svg className="w-7 h-7 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Admin Login</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Sign in to manage projects</p>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 rounded-lg text-red-700 dark:text-red-300 text-sm"
            >
              {error}
              {(error.includes("not enabled") || error.includes("not exist") || error.includes("whitelist")) && (
                <button
                  onClick={() => setShowSetup(s => !s)}
                  className="ml-2 underline text-red-600 dark:text-red-400 hover:no-underline"
                >
                  {showSetup ? "Hide" : "Setup guide"}
                </button>
              )}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="username"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
              />
            </div>
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold rounded-lg transition-colors"
            >
              {loading ? "Signing in…" : "Sign In"}
            </motion.button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setShowSetup(s => !s)}
              className="text-xs text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              {showSetup ? "Hide" : "First time? View"} Firebase setup guide
            </button>
          </div>
        </motion.div>

        {showSetup && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-blue-100 dark:border-blue-900/40 text-sm text-gray-700 dark:text-gray-300 space-y-4"
          >
            <h2 className="font-bold text-gray-800 dark:text-white text-base">Firebase Setup Checklist</h2>

            <div className="space-y-3">
              <div>
                <p className="font-semibold text-gray-800 dark:text-white mb-1">1. Enable Email/Password sign-in</p>
                <p className="text-gray-500 dark:text-gray-400">
                  Firebase Console → <strong>Authentication</strong> → <em>Sign-in method</em> tab → <strong>Email/Password</strong> → Enable → Save
                </p>
              </div>

              <div>
                <p className="font-semibold text-gray-800 dark:text-white mb-1">2. Create your admin account</p>
                <p className="text-gray-500 dark:text-gray-400">
                  Firebase Console → <strong>Authentication</strong> → <em>Users</em> tab → <strong>Add user</strong> → enter <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">rodrickreborn@gmail.com</code> (or <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">rbrnproduction@gmail.com</code>) and a password
                </p>
              </div>

              <div>
                <p className="font-semibold text-gray-800 dark:text-white mb-1">3. Create Firestore database</p>
                <p className="text-gray-500 dark:text-gray-400">
                  Firebase Console → <strong>Firestore Database</strong> → <em>Create database</em> → choose <strong>Production mode</strong> → select a region → Done
                </p>
              </div>

              <div>
                <p className="font-semibold text-gray-800 dark:text-white mb-1">4. Set Firestore security rules</p>
                <p className="text-gray-500 dark:text-gray-400 mb-2">
                  Firestore → <em>Rules</em> tab → replace the contents with:
                </p>
                <pre className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 text-xs overflow-x-auto text-gray-800 dark:text-gray-200">
{`rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /projects/{id} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}`}
                </pre>
                <p className="text-gray-400 dark:text-gray-500 mt-1 text-xs">Click <strong>Publish</strong> after pasting.</p>
              </div>
            </div>

            <a
              href="https://console.firebase.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-blue-600 dark:text-blue-400 hover:underline font-medium"
            >
              Open Firebase Console →
            </a>
          </motion.div>
        )}
      </div>
    </div>
  );
}
