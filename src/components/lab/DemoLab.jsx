import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AnimatePresence, motion as Motion, useReducedMotion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import SectionMotion from '../common/SectionMotion';
import { SCENE_IDS } from './openLab';
import './DemoLab.css';

const WebDemo = lazy(() => import('./demos/WebDemo'));
const ArDemo = lazy(() => import('./demos/ArDemo'));
const MobileDemo = lazy(() => import('./demos/MobileDemo'));
const SystemsDemo = lazy(() => import('./demos/SystemsDemo'));
const PerfDemo = lazy(() => import('./demos/PerfDemo'));

const Icon = {
    web: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 9h18M8 13h3M8 16h6" /></svg>,
    ar: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" /><path d="M12 12l8-4.5M12 12v9M12 12L4 7.5" /></svg>,
    mobile: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden><rect x="6" y="2" width="12" height="20" rx="3" /><path d="M10 18h4" /></svg>,
    systems: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden><rect x="2" y="3" width="8" height="6" rx="1.5" /><rect x="14" y="3" width="8" height="6" rx="1.5" /><rect x="8" y="15" width="8" height="6" rx="1.5" /><path d="M6 9v3h12V9M12 12v3" /></svg>,
    perf: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M4 16a8 8 0 1 1 16 0" /><path d="M12 16l4-5" /><circle cx="12" cy="16" r="1.5" fill="currentColor" /></svg>
};

const SCENES = [
    { id: 'web', Comp: WebDemo },
    { id: 'ar', Comp: ArDemo },
    { id: 'mobile', Comp: MobileDemo },
    { id: 'systems', Comp: SystemsDemo },
    { id: 'perf', Comp: PerfDemo }
];

const SceneSkeleton = () => (
    <div className="lab-skeleton" aria-busy="true" aria-live="polite">
        <div className="lab-skeleton-bar" /><div className="lab-skeleton-bar short" />
        <div className="lab-skeleton-block" />
    </div>
);

const DemoLab = () => {
    const { t } = useTranslation();
    const reduce = useReducedMotion();
    const location = useLocation();
    const sectionRef = useRef(null);
    const tabsRef = useRef(null);
    const [active, setActive] = useState(() => {
        if (typeof window === 'undefined' || !window.location) return 'web';
        const q = new URLSearchParams(window.location.search).get('lab');
        return SCENE_IDS.includes(q) ? q : 'web';
    });
    const [inView, setInView] = useState(() => typeof window !== 'undefined' && !('IntersectionObserver' in window));
    const [preset, setPreset] = useState(() => {
        if (typeof window === 'undefined' || !window.location) return {};
        const q = new URLSearchParams(window.location.search);
        return q.get('app') ? { app: q.get('app') } : {};
    });

    // Montaje diferido: la escena solo existe cuando el lab entra al viewport.
    useEffect(() => {
        const el = sectionRef.current;
        if (!el || inView) return undefined;
        const io = new IntersectionObserver((entries) => {
            if (entries.some(e => e.isIntersecting)) { setInView(true); io.disconnect(); }
        }, { rootMargin: '200px 0px' });
        io.observe(el);
        return () => io.disconnect();
    }, [inView]);

    // Apertura por evento (botones "Probar") y por hash (#laboratorio).
    useEffect(() => {
        const onOpen = (e) => {
            const { scene, ...rest } = e.detail || {};
            if (scene && SCENE_IDS.includes(scene)) {
                setPreset(rest);
                setActive(scene);
                setInView(true);
            }
        };
        window.addEventListener('lab:open', onOpen);
        return () => window.removeEventListener('lab:open', onOpen);
    }, []);

    useEffect(() => {
        if (location.hash === '#laboratorio' && sectionRef.current) {
            const id = setTimeout(() => sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 120);
            return () => clearTimeout(id);
        }
        return undefined;
    }, [location.hash]);

    const onKey = useCallback((e) => {
        const idx = SCENES.findIndex(s => s.id === active);
        let next = idx;
        if (e.key === 'ArrowRight') next = (idx + 1) % SCENES.length;
        else if (e.key === 'ArrowLeft') next = (idx - 1 + SCENES.length) % SCENES.length;
        else if (e.key === 'Home') next = 0;
        else if (e.key === 'End') next = SCENES.length - 1;
        else return;
        e.preventDefault();
        setActive(SCENES[next].id);
        tabsRef.current?.querySelectorAll('[role="tab"]')[next]?.focus();
    }, [active]);

    const scene = SCENES.find(s => s.id === active);
    const Comp = scene.Comp;

    return (
        <section ref={sectionRef} className="section lab" id="laboratorio" aria-labelledby="lab-title">
            <SectionMotion className="section-motion-inner">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title" id="lab-title">
                            {t('lab.title')} <span className="gradient-text">{t('lab.titleAccent')}</span>
                        </h2>
                        <p className="section-subtitle">{t('lab.subtitle')}</p>
                    </div>

                    <div className="lab-shell">
                        <div className="lab-tabs" role="tablist" aria-label={t('lab.title')} ref={tabsRef} onKeyDown={onKey}>
                            {SCENES.map((s, i) => (
                                <Motion.button
                                    key={s.id}
                                    role="tab"
                                    id={`lab-tab-${s.id}`}
                                    aria-selected={active === s.id}
                                    aria-controls={`lab-panel-${s.id}`}
                                    tabIndex={active === s.id ? 0 : -1}
                                    className={`lab-tab ${active === s.id ? 'active' : ''}`}
                                    onClick={() => { setPreset({}); setActive(s.id); }}
                                    initial={reduce ? false : { opacity: 0, y: 12 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.06, duration: 0.4 }}
                                >
                                    <span className="lab-tab-icon">{Icon[s.id]}</span>
                                    <span className="lab-tab-text">
                                        <span className="lab-tab-label">{t(`lab.tabs.${s.id}.label`)}</span>
                                        <span className="lab-tab-caption">{t(`lab.tabs.${s.id}.caption`)}</span>
                                    </span>
                                    {active === s.id && <Motion.span layoutId="lab-tab-underline" className="lab-tab-underline" transition={{ duration: reduce ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }} />}
                                </Motion.button>
                            ))}
                        </div>

                        <div className="lab-stage" role="tabpanel" id={`lab-panel-${active}`} aria-labelledby={`lab-tab-${active}`}>
                            {inView ? (
                                <AnimatePresence mode="wait" initial={false}>
                                    <Motion.div
                                        key={active}
                                        className="lab-scene"
                                        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
                                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                                    >
                                        <Suspense fallback={<SceneSkeleton />}>
                                            <Comp preset={preset} openScene={(id, extra) => { setPreset(extra || {}); setActive(id); }} />
                                        </Suspense>
                                    </Motion.div>
                                </AnimatePresence>
                            ) : <SceneSkeleton />}
                        </div>
                    </div>
                </div>
            </SectionMotion>
        </section>
    );
};

export default DemoLab;
