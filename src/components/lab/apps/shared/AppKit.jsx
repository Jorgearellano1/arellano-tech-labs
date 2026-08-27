import { useState } from 'react';
import { AnimatePresence, motion as Motion, useReducedMotion } from 'framer-motion';
import './apps.css';


const iosVariants = {
    enter: (d) => ({ x: d > 0 ? '100%' : '-30%', opacity: d > 0 ? 1 : 0.6 }),
    center: { x: 0, opacity: 1 },
    exit: (d) => ({ x: d > 0 ? '-30%' : '100%', opacity: d > 0 ? 0.6 : 1 })
};
const materialVariants = {
    enter: (d) => ({ opacity: 0, scale: d > 0 ? 0.96 : 1.04, y: d > 0 ? 12 : 0 }),
    center: { opacity: 1, scale: 1, y: 0 },
    exit: (d) => ({ opacity: 0, scale: d > 0 ? 1.04 : 0.96 })
};

/** Renderiza la pantalla superior de la pila con transición nativa por plataforma. */
export function ScreenStack({ nav, platform, render }) {
    const reduce = useReducedMotion();
    const variants = reduce ? { enter: { opacity: 0 }, center: { opacity: 1 }, exit: { opacity: 0 } } : (platform === 'android' ? materialVariants : iosVariants);
    const key = `${nav.top.id}-${nav.depth}`;
    return (
        <div className="app-screens">
            <AnimatePresence mode="popLayout" custom={nav.dir} initial={false}>
                <Motion.div
                    key={key}
                    className="app-screen"
                    custom={nav.dir}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: reduce ? 0.12 : 0.32, ease: [0.22, 1, 0.36, 1] }}
                >
                    {render(nav.top)}
                </Motion.div>
            </AnimatePresence>
        </div>
    );
}

/* ---------- cabecera ---------- */
export function AppHeader({ title, subtitle, onBack, right, large = false, backLabel = 'Atrás' }) {
    return (
        <header className={`app-header ${large ? 'app-header--large' : ''}`}>
            <div className="app-header-row">
                {onBack ? (
                    <button type="button" className="app-back" onClick={onBack} aria-label={backLabel}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M15 18l-6-6 6-6" /></svg>
                        <span className="app-back-label">{backLabel}</span>
                    </button>
                ) : <span className="app-header-spacer" />}
                {!large && <h2 className="app-title">{title}</h2>}
                <div className="app-header-right">{right}</div>
            </div>
            {large && (
                <div className="app-header-large">
                    <h2 className="app-title-large">{title}</h2>
                    {subtitle && <p className="app-subtitle">{subtitle}</p>}
                </div>
            )}
        </header>
    );
}

/* ---------- barra de pestañas ---------- */
export function TabBar({ tabs, active, onChange, platform }) {
    return (
        <nav className={`app-tabbar app-tabbar--${platform}`} role="tablist">
            {tabs.map(tab => (
                <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={active === tab.id}
                    className={`app-tab ${active === tab.id ? 'active' : ''}`}
                    onClick={() => onChange(tab.id)}
                >
                    <span className="app-tab-icon">
                        {tab.icon}
                        {tab.badge > 0 && <span className="app-tab-badge">{tab.badge}</span>}
                    </span>
                    <span className="app-tab-label">{tab.label}</span>
                </button>
            ))}
        </nav>
    );
}

/* ---------- fila deslizable (swipe para eliminar) ---------- */
export function SwipeRow({ children, onDelete, deleteLabel = 'Eliminar', className = '' }) {
    const reduce = useReducedMotion();
    const [gone, setGone] = useState(false);
    return (
        <div className={`swipe-row ${className}`.trim()}>
            <div className="swipe-row-bg" aria-hidden><span>{deleteLabel}</span></div>
            <Motion.div
                className="swipe-row-fg"
                drag={reduce ? false : 'x'}
                dragConstraints={{ left: -110, right: 0 }}
                dragElastic={0.08}
                dragSnapToOrigin
                onDragEnd={(_, info) => {
                    if (info.offset.x < -80) { setGone(true); setTimeout(onDelete, 180); }
                }}
                animate={gone ? { x: -400, opacity: 0 } : undefined}
                transition={{ duration: 0.2 }}
            >
                {children}
            </Motion.div>
            <button type="button" className="swipe-row-fallback" onClick={onDelete} aria-label={deleteLabel}>×</button>
        </div>
    );
}

/* ---------- estados: cargando / vacío / error ---------- */
export function StateView({ state, labels, onRetry }) {
    if (state === 'loading') {
        return (
            <div className="app-state app-state--loading" aria-busy="true">
                {[0, 1, 2, 3].map(i => (
                    <div key={i} className="app-skeleton-row"><span /><div><i /><i /></div></div>
                ))}
            </div>
        );
    }
    if (state === 'empty') {
        return (
            <div className="app-state">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M21 8v13H3V8M1 3h22v5H1zM10 12h4" /></svg>
                <strong>{labels.emptyTitle}</strong>
                <span>{labels.emptyBody}</span>
            </div>
        );
    }
    if (state === 'error') {
        return (
            <div className="app-state app-state--error">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden><circle cx="12" cy="12" r="10" /><path d="M12 8v4M12 16h.01" /></svg>
                <strong>{labels.errorTitle}</strong>
                <span>{labels.errorBody}</span>
                {onRetry && <button type="button" className="d-btn d-btn--soft" onClick={onRetry}>{labels.retry}</button>}
            </div>
        );
    }
    return null;
}

/* ---------- teclado simulado ---------- */
const ROWS = ['QWERTYUIOP', 'ASDFGHJKL', 'ZXCVBNM'];
export function KeyboardMock({ visible, platform }) {
    const reduce = useReducedMotion();
    return (
        <AnimatePresence>
            {visible && (
                <Motion.div
                    className={`app-keyboard app-keyboard--${platform}`}
                    initial={reduce ? { opacity: 0 } : { y: '100%' }}
                    animate={reduce ? { opacity: 1 } : { y: 0 }}
                    exit={reduce ? { opacity: 0 } : { y: '100%' }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    aria-hidden
                >
                    {ROWS.map(r => (
                        <div key={r} className="app-keyboard-row">
                            {r.split('').map(k => <span key={k}>{k}</span>)}
                        </div>
                    ))}
                    <div className="app-keyboard-row"><span className="wide">123</span><span className="space" /><span className="wide">⏎</span></div>
                </Motion.div>
            )}
        </AnimatePresence>
    );
}

/* ---------- brindis / toast dentro de la app ---------- */

export function AppToast({ message }) {
    return (
        <AnimatePresence>
            {message && (
                <Motion.div className="app-toast" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} role="status">
                    {message}
                </Motion.div>
            )}
        </AnimatePresence>
    );
}

/* ---------- pull to refresh ---------- */
export function PullToRefresh({ onRefresh, children, label = 'Actualizando…' }) {
    const reduce = useReducedMotion();
    const [refreshing, setRefreshing] = useState(false);
    const trigger = () => {
        if (refreshing) return;
        setRefreshing(true);
        setTimeout(() => { setRefreshing(false); onRefresh?.(); }, 900);
    };
    return (
        <Motion.div
            className="app-pull"
            drag={reduce ? false : 'y'}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.25 }}
            onDragEnd={(_, info) => { if (info.offset.y > 70) trigger(); }}
        >
            <div className={`app-pull-indicator ${refreshing ? 'active' : ''}`} aria-live="polite">
                <span className="app-pull-spinner" />{refreshing ? label : ''}
            </div>
            {children}
        </Motion.div>
    );
}

