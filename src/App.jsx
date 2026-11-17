import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AnimatePresence, motion as Motion } from 'framer-motion';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ScrollProgress from './components/common/ScrollProgress';
import FloatingChatButton from './components/common/FloatingChatButton';
import Seo from './components/common/Seo';
import useSyncedTheme from './hooks/useSyncedTheme';
import usePrefersReducedMotion from './hooks/usePrefersReducedMotion';
import { useLanguage } from './hooks/useLanguage';
import Home from './pages/Home';
import './i18n/config';
import './index.css';
import './styles/animations.css';
import '@fontsource-variable/schibsted-grotesk';
import './styles/redesign.css';
import './styles/home-anim.css';

// Las páginas /proyectos y /proyectos/:slug están ocultas: todo el trabajo se muestra en la home (#trabajo). Projects.jsx y ProjectDetail.jsx se conservan para reactivarlas.
// /nosotros también está oculta (redirige a la home); About.jsx se conserva.
const Contact = lazy(() => import('./pages/Contact'));
const Animation = lazy(() => import('./pages/Animation'));

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
    if (location.hash) {
      const id = location.hash.slice(1);
      const timer = setTimeout(() => document.getElementById(id)?.scrollIntoView(), 400);
      return () => clearTimeout(timer);
    }
    window.scrollTo(0, 0);
    return undefined;
  }, [location.pathname, location.hash]);

  return (
    <div className="app">
      <div
        className={`app-background${reducedMotion ? ' app-background--reduced' : ''}`}
        data-theme-mode={theme}
        aria-hidden="true"
      />
      <Seo />
      <ScrollProgress />
      <Header />

      <main className="main-content">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Page><Home /></Page>} />
            <Route path="/proyectos" element={<Navigate to="/#trabajo" replace />} />
            <Route path="/proyectos/:slug" element={<Navigate to="/#trabajo" replace />} />
            <Route path="/animacion" element={<Page><Animation /></Page>} />
            <Route path="/nosotros" element={<Navigate to="/" replace />} />
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
