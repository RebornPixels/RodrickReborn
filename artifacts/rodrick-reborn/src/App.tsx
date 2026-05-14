import { Switch, Route, Router as WouterRouter } from "wouter";
import { ThemeProvider } from "./theme-provider";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import HomePage from "./pages/home";
import AboutPage from "./pages/about";
import ProjectsPage from "./pages/projects";
import ContactPage from "./pages/contact";
import NotFoundPage from "./pages/not-found";
import AdminLoginPage from "./pages/admin/login";
import AdminDashboard from "./pages/admin/dashboard";
import ProjectDetailPage from "./pages/projects/detail";
import DTunesPage from "./pages/projects/dtunes";
import DzalekaOnlinePage from "./pages/projects/dzaleka-online";
import WindowsOfHopePage from "./pages/projects/windows-of-hope";
import RebornPixelsPage from "./pages/projects/reborn-pixels";
import LoopHirePage from "./pages/projects/loophire";
import InstagramPage from "./pages/projects/instagram-non-followers-checker";
import TelegramPage from "./pages/projects/tmdownloader";
import MaketiPage from "./pages/projects/maketi";
import FitBuddyPage from "./pages/projects/ftbuddy";
import KibembePage from "./pages/projects/kibembe";
import SwahiliPage from "./pages/projects/swahili-number-converter";
import MoodSharePage from "./pages/projects/moodshare";
import RebornNetflixPage from "./pages/projects/reborn-netflix";
import DoPeVestPage from "./pages/projects/dopevest";
import LunaxDecorPage from "./pages/projects/lunaxdecor";
import PhotographyPage from "./pages/projects/photography";
import The100DopePage from "./pages/projects/the-100-dope-project";

function Router() {
  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Switch>
        {/* Admin routes — no Navbar */}
        <Route path="/admin/login" component={AdminLoginPage} />
        <Route path="/admin/dashboard">
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        </Route>

        {/* Public routes — with Navbar */}
        <Route>
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <Switch>
              <Route path="/" component={HomePage} />
              <Route path="/about" component={AboutPage} />
              <Route path="/projects" component={ProjectsPage} />
              <Route path="/contact" component={ContactPage} />

              {/* Named static detail pages */}
              <Route path="/projects/dtunes" component={DTunesPage} />
              <Route path="/projects/dzaleka-online" component={DzalekaOnlinePage} />
              <Route path="/projects/windows-of-hope" component={WindowsOfHopePage} />
              <Route path="/projects/reborn-pixels" component={RebornPixelsPage} />
              <Route path="/projects/loophire" component={LoopHirePage} />
              <Route path="/projects/instagram-non-followers-checker" component={InstagramPage} />
              <Route path="/projects/tmdownloader" component={TelegramPage} />
              <Route path="/projects/maketi" component={MaketiPage} />
              <Route path="/projects/ftbuddy" component={FitBuddyPage} />
              <Route path="/projects/kibembe" component={KibembePage} />
              <Route path="/projects/swahili-number-converter" component={SwahiliPage} />
              <Route path="/projects/moodshare" component={MoodSharePage} />
              <Route path="/projects/reborn-netflix" component={RebornNetflixPage} />
              <Route path="/projects/dopevest" component={DoPeVestPage} />
              <Route path="/projects/lunaxdecor" component={LunaxDecorPage} />
              <Route path="/projects/photography" component={PhotographyPage} />
              <Route path="/projects/the-100-dope-project" component={The100DopePage} />

              {/* Dynamic catch-all for Firestore-created projects */}
              <Route path="/projects/:id" component={ProjectDetailPage} />

              <Route component={NotFoundPage} />
            </Switch>
          </main>
        </Route>
      </Switch>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
