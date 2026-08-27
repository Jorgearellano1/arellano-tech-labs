import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AnimatePresence, motion as Motion } from 'framer-motion';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ScrollProgress from './components/common/ScrollProgress';
import FloatingChatButton from './components/common/FloatingChatButton';
import useSyncedTheme from './hooks/useSyncedTheme';
import usePrefersReducedMotion from './hooks/usePrefersReducedMotion';
import { useLanguage } from './hooks/useLanguage';
import Home from './pages/Home';
import './i18n/config';
import './index.css';
import './styles/animations.css';

const Projects = lazy(() => import('./pages/Projects'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));

const pageTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.3 },
};

const Page = ({ children }) => (
  <Motion.div {...pageTransition}>
    <Suspense fallback={<div className="route-fallback" aria-busy="true" />}>
      {children}
    </Suspense>
  </Motion.div>
);

function AppContent() {
  useLanguage();
  const location = useLocation();
  const theme = useSyncedTheme();
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (location.hash) return;
    window.scrollTo(0, 0);
  }, [location.pathname, location.hash]);

  return (
    <div className="app">
      <div
        className={`app-background${reducedMotion ? ' app-background--reduced' : ''}`}
        data-theme-mode={theme}
        aria-hidden="true"
      />
      <ScrollProgress />
      <Header />

      <main className="main-content">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Page><Home /></Page>} />
            <Route path="/proyectos" element={<Page><Projects /></Page>} />
            <Route path="/proyectos/:slug" element={<Page><ProjectDetail /></Page>} />
            <Route path="/nosotros" element={<Page><About /></Page>} />
            <Route path="/contacto" element={<Page><Contact /></Page>} />
          </Routes>
        </AnimatePresence>
      </main>

      <Footer />
      <FloatingChatButton />
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: 'var(--surface-card)',
            color: 'var(--color-text-primary)',
            borderRadius: '12px',
            boxShadow: 'var(--shadow-lg)',
            border: '1px solid var(--color-border-light)'
          }
        }}
      />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
