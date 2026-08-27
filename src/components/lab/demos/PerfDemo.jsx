import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion as Motion, useReducedMotion } from 'framer-motion';
import { perfBefore, perfAfter } from '../data/sampleData';
import './PerfDemo.css';

const PNG_URL = '/demo/ar-figure1-original.png';
const WEBP_URL = '/demo/ar-figure1.webp';

/** Cuenta hasta `end` con requestAnimationFrame; respeta reduced motion. */
function useCountUp(end, { duration = 900, decimals = 0, enabled = true } = {}) {
    const [value, setValue] = useState(end);
    const fromRef = useRef(end);
    useEffect(() => {
        if (!enabled) { fromRef.current = end; return undefined; }
        const from = fromRef.current;
        const t0 = performance.now();
        let raf;
        const tick = (now) => {
            const p = Math.min(1, (now - t0) / duration);
            const eased = 1 - Math.pow(1 - p, 3);
            setValue(from + (end - from) * eased);
            if (p < 1) raf = requestAnimationFrame(tick);
            else fromRef.current = end;
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [end, duration, enabled]);
    return Number((enabled ? value : end).toFixed(decimals));
}

const Count = ({ end, decimals = 0, locale, reduce }) => {
    const v = useCountUp(end, { decimals, enabled: !reduce });
    return <>{v.toLocaleString(locale, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}</>;
};

function fmtKB(kb, locale) {
    return kb >= 1000 ? `${(kb / 1000).toLocaleString(locale, { maximumFractionDigits: 1 })} MB` : `${Math.round(kb).toLocaleString(locale)} KB`;
}

function readNavigation() {
    if (typeof performance === 'undefined') return null;
    const nav = performance.getEntriesByType('navigation')[0];
    const res = performance.getEntriesByType('resource');
    const transfer = res.reduce((a, r) => a + (r.transferSize || 0), 0) + (nav?.transferSize || 0);
    return {
        dcl: nav ? Math.round(nav.domContentLoadedEventEnd - nav.startTime) : null,
        load: nav ? Math.round(nav.loadEventEnd - nav.startTime) : null,
        ttfb: nav ? Math.round(nav.responseStart - nav.startTime) : null,
        requests: res.length + 1,
        transferKB: Math.round(transfer / 1024),
        conn: navigator.connection?.effectiveType || null,
        saveData: navigator.connection?.saveData || false
    };
}

const PerfDemo = () => {
    const { t, i18n } = useTranslation();
    const locale = i18n.language?.startsWith('en') ? 'en-US' : 'es-PE';
    const reduce = useReducedMotion();
    const [view, setView] = useState('after');
    const [split, setSplit] = useState(50);
    const [nav, setNav] = useState(null);
    const [race, setRace] = useState({ status: 'idle', png: null, webp: null });
    const [pngLoaded, setPngLoaded] = useState(false);
    const imgRef = useRef(null);

    useEffect(() => {
        const read = () => setNav(readNavigation());
        if (document.readyState === 'complete') read();
        else window.addEventListener('load', read, { once: true });
        const id = setTimeout(read, 1500);
        return () => { clearTimeout(id); window.removeEventListener('load', read); };
    }, []);

    const data = view === 'before' ? perfBefore : perfAfter;
    const rows = useMemo(() => [
        { key: 'images', label: t('lab.perf.rows.images'), before: perfBefore.images, after: perfAfter.images, unit: 'kb' },
        { key: 'js', label: t('lab.perf.rows.js'), before: perfBefore.js, after: perfAfter.js, unit: 'kb' },
        { key: 'deps', label: t('lab.perf.rows.deps'), before: perfBefore.deps, after: perfAfter.deps, unit: 'n' },
        { key: 'chunks', label: t('lab.perf.rows.chunks'), before: perfBefore.requestsJs, after: perfAfter.requestsJs, unit: 'n', invert: true }
    ], [t]);

    const runRace = async () => {
        setRace({ status: 'running', png: null, webp: null });
        const time = async (url) => {
            const t0 = performance.now();
            const res = await fetch(`${url}?r=${Date.now()}`, { cache: 'no-store' });
            const blob = await res.blob();
            return { ms: Math.round(performance.now() - t0), kb: Math.round(blob.size / 1024) };
        };
        try {
            const webp = await time(WEBP_URL);
            setRace(r => ({ ...r, webp }));
            const png = await time(PNG_URL);
            setRace({ status: 'done', png, webp });
            setPngLoaded(true);
        } catch {
            setRace({ status: 'error', png: null, webp: null });
        }
    };

    const maxMs = Math.max(race.png?.ms || 0, race.webp?.ms || 0, 1);

    return (
        <div className="perf-demo">
            <div className="perf-head">
                <div className="lab-intro">
                    <h3>{t('lab.perf.intro.title')}</h3>
                    <p>{t('lab.perf.intro.body')}</p>
                </div>
                <div className="lab-seg perf-toggle" role="group" aria-label={t('lab.perf.toggle')}>
                    <button type="button" aria-pressed={view === 'before'} onClick={() => setView('before')}>{t('lab.perf.before')}</button>
                    <button type="button" aria-pressed={view === 'after'} onClick={() => setView('after')}>{t('lab.perf.after')}</button>
                </div>
            </div>

            <div className={`perf-big is-${view}`}>
                <div className="perf-big-item">
                    <span>{t('lab.perf.rows.images')}</span>
                    <strong><Count end={data.images >= 1000 ? data.images / 1000 : data.images} decimals={data.images >= 1000 ? 1 : 0} locale={locale} reduce={reduce} /> {data.images >= 1000 ? 'MB' : 'KB'}</strong>
                </div>
                <div className="perf-big-item">
                    <span>{t('lab.perf.rows.jsInitial')}</span>
                    <strong><Count end={data.js} locale={locale} reduce={reduce} /> KB</strong>
                </div>
                <div className="perf-big-item">
                    <span>{t('lab.perf.rows.deps')}</span>
                    <strong><Count end={data.deps} locale={locale} reduce={reduce} /></strong>
                </div>
                <div className="perf-big-item perf-big-item--verdict">
                    <span>{t('lab.perf.hero')}</span>
                    <strong>{data.lcpHint}</strong>
                </div>
            </div>

            <div className="perf-grid">
                <div className="perf-card">
                    <div className="perf-card-title">{t('lab.perf.tableTitle')}</div>
                    <ul className="perf-rows">
                        {rows.map(r => {
                            const max = Math.max(r.before, r.after);
                            const delta = r.invert ? null : Math.round((1 - r.after / r.before) * 100);
                            return (
                                <li key={r.key}>
                                    <div className="perf-row-label">{r.label}{delta !== null && <em>−{delta}%</em>}</div>
                                    <div className="perf-bars">
                                        <div className="perf-bar perf-bar--before"><Motion.i initial={false} animate={{ width: `${(r.before / max) * 100}%` }} transition={{ duration: reduce ? 0 : 0.6 }} /><span>{r.unit === 'kb' ? fmtKB(r.before, locale) : r.before}</span></div>
                                        <div className="perf-bar perf-bar--after"><Motion.i initial={false} animate={{ width: `${(r.after / max) * 100}%` }} transition={{ duration: reduce ? 0 : 0.6, delay: 0.1 }} /><span>{r.unit === 'kb' ? fmtKB(r.after, locale) : r.after}</span></div>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                    <p className="lab-hint">{t('lab.perf.measuredNote')}</p>
                </div>

                <div className="perf-card perf-compare-card">
                    <div className="perf-card-title">{t('lab.perf.compareTitle')}</div>
                    <div className="perf-compare" ref={imgRef} style={{ '--split': `${split}%` }}>
                        <img src={WEBP_URL} alt="" className="perf-img perf-img--webp" decoding="async" />
                        <img src={pngLoaded ? PNG_URL : WEBP_URL} alt="" className="perf-img perf-img--png" decoding="async" />
                        <span className="perf-label perf-label--left">PNG · 1,0 MB</span>
                        <span className="perf-label perf-label--right">WebP · 24 KB</span>
                        <div className="perf-divider" aria-hidden><i /></div>
                        <input type="range" min="0" max="100" value={split} onChange={(e) => setSplit(Number(e.target.value))} aria-label={t('lab.perf.sliderLabel')} className="perf-range" />
                    </div>
                    <p className="lab-hint">{pngLoaded ? t('lab.perf.compareLoaded') : t('lab.perf.compareHint')}</p>
                </div>

                <div className="perf-card">
                    <div className="perf-card-title">{t('lab.perf.raceTitle')}</div>
                    <p className="perf-text">{t('lab.perf.raceBody')}</p>
                    <div className="perf-race">
                        {[['webp', 'WebP'], ['png', 'PNG']].map(([k, label]) => (
                            <div key={k} className={`perf-race-row is-${k}`}>
                                <span>{label}</span>
                                <div className="perf-race-track">
                                    <Motion.i initial={false} animate={{ width: race[k] ? `${(race[k].ms / maxMs) * 100}%` : race.status === 'running' && !race[k] ? '100%' : '0%' }} transition={{ duration: reduce ? 0 : 0.5 }} className={race.status === 'running' && !race[k] ? 'loading' : ''} />
                                </div>
                                <b>{race[k] ? `${race[k].ms} ms · ${fmtKB(race[k].kb, locale)}` : race.status === 'running' ? '…' : '—'}</b>
                            </div>
                        ))}
                    </div>
                    <button type="button" className="lab-btn lab-btn--primary" onClick={runRace} disabled={race.status === 'running'}>
                        {race.status === 'running' ? t('lab.perf.racing') : race.status === 'done' ? t('lab.perf.raceAgain') : t('lab.perf.raceCta')}
                    </button>
                    {race.status === 'done' && race.png && race.webp && (
                        <p className="perf-verdict">{t('lab.perf.raceVerdict', { x: Math.max(1, Math.round(race.png.ms / Math.max(1, race.webp.ms))) })}</p>
                    )}
                    {race.status === 'error' && <p className="perf-verdict">{t('lab.perf.raceError')}</p>}
                </div>

                <div className="perf-card">
                    <div className="perf-card-title">{t('lab.perf.liveTitle')}</div>
                    <p className="perf-text">{t('lab.perf.liveBody')}</p>
                    {nav ? (
                        <dl className="perf-live">
                            <div><dt>{t('lab.perf.live.ttfb')}</dt><dd>{nav.ttfb ?? '—'} ms</dd></div>
                            <div><dt>{t('lab.perf.live.dcl')}</dt><dd>{nav.dcl ?? '—'} ms</dd></div>
                            <div><dt>{t('lab.perf.live.load')}</dt><dd>{nav.load || '—'} ms</dd></div>
                            <div><dt>{t('lab.perf.live.requests')}</dt><dd>{nav.requests}</dd></div>
                            <div><dt>{t('lab.perf.live.transfer')}</dt><dd>{fmtKB(nav.transferKB, locale)}</dd></div>
                            <div><dt>{t('lab.perf.live.conn')}</dt><dd>{nav.conn ? nav.conn.toUpperCase() : t('lab.perf.live.unknown')}{nav.saveData ? ' · save-data' : ''}</dd></div>
                        </dl>
                    ) : <p className="lab-hint">{t('lab.perf.liveWaiting')}</p>}
                </div>
            </div>
        </div>
    );
};

export default PerfDemo;
