import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AnimatePresence, motion as Motion } from 'framer-motion';
import { useEffect } from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ScrollProgress from './components/common/ScrollProgress';
import FloatingChatButton from './components/common/FloatingChatButton';
import useSyncedTheme from './hooks/useSyncedTheme';
import usePrefersReducedMotion from './hooks/usePrefersReducedMotion';
import Home from './pages/Home';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import useSmoothScroll from './hooks/useSmoothScroll';
import { useLanguage } from './hooks/useLanguage';
import './i18n/config';
import './index.css';
import './styles/animations.css';

function AppContent() {
  useSmoothScroll();
  useLanguage();
  const location = useLocation();
  const theme = useSyncedTheme();
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

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
            <Route path="/" element={
              <Motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Home />
              </Motion.div>
            } />
            <Route path="/proyectos" element={
              <Motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Projects />
              </Motion.div>
            } />
            <Route path="/proyectos/:slug" element={
              <Motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ProjectDetail />
              </Motion.div>
            } />
            <Route path="/nosotros" element={
              <Motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <About />
              </Motion.div>
            } />
            <Route path="/contacto" element={
              <Motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Contact />
              </Motion.div>
            } />
          </Routes>
        </AnimatePresence>
      </main>

      <Footer />
      <FloatingChatButton />
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#fff',
            color: '#000',
            borderRadius: '12px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.1)'
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
