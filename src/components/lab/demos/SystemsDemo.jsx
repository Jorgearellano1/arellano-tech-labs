import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AnimatePresence, motion as Motion, useReducedMotion } from 'framer-motion';
import { systemNodes, systemEdges, hopLatency, endpoints } from '../data/sampleData';
import { localeFor } from '../../../i18n/languages';
import './SystemsDemo.css';

const NODE_W = 96, NODE_H = 44;

/** Punto donde el segmento centro→centro cruza el borde del rectángulo del nodo. */
function edgePoint(from, to) {
    const cx = from.x + NODE_W / 2, cy = from.y + NODE_H / 2;
    const dx = (to.x + NODE_W / 2) - cx, dy = (to.y + NODE_H / 2) - cy;
    const t = 1 / Math.max(Math.abs(dx) / (NODE_W / 2 + 4), Math.abs(dy) / (NODE_H / 2 + 4), 1e-6);
    return [cx + dx * t, cy + dy * t];
}
const LOADS = [1, 10, 100];

/** Escritura progresiva: reinicia cuando cambia el texto (estado derivado en render). */
function useTypewriter(text, enabled) {
    const [state, setState] = useState({ text, shown: enabled ? 0 : text.length });
    if (state.text !== text) {
        setState({ text, shown: enabled ? 0 : text.length });
    }
    useEffect(() => {
        if (!enabled) return undefined;
        const id = setInterval(() => {
            setState(s => {
                if (s.text !== text) return s;
                const next = Math.min(s.text.length, s.shown + 6);
                if (next >= s.text.length) clearInterval(id);
                return next === s.shown ? s : { ...s, shown: next };
            });
        }, 12);
        return () => clearInterval(id);
    }, [text, enabled]);
    return state.text === text ? text.slice(0, state.shown) : '';
}

const NodeIcon = ({ id }) => ({
    client: <path d="M4 5h16v11H4zM8 20h8" />,
    cdn: <path d="M4 12a8 8 0 0 1 16 0M12 4v16M4 12h16" />,
    api: <path d="M4 6h16v4H4zM4 14h16v4H4zM8 8h.01M8 16h.01" />,
    auth: <path d="M6 11V8a6 6 0 0 1 12 0v3M5 11h14v10H5z" />,
    cache: <path d="M13 2L4 14h7l-1 8 9-12h-7z" />,
    db: <path d="M4 6c0-1.7 3.6-3 8-3s8 1.3 8 3v12c0 1.7-3.6 3-8 3s-8-1.3-8-3zM4 6c0 1.7 3.6 3 8 3s8-1.3 8-3M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" />,
    queue: <path d="M3 7h18M3 12h12M3 17h6" />,
    worker: <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" />
}[id]);

function buildPath(region, cacheOn, load) {
    const L = hopLatency[region];
    const loadF = load === 1 ? 1 : load === 10 ? 1.6 : 3.4;
    const dbF = load === 1 ? 1 : load === 10 ? 2.2 : 6.5;
    const hops = [
        { from: 'client', to: 'cdn', ms: L.cdn, note: 'edge' },
        { from: 'cdn', to: 'api', ms: Math.round(L.api * loadF), note: load > 1 ? 'load' : null },
        { from: 'api', to: 'auth', ms: L.auth, note: 'jwt' },
        { from: 'api', to: 'cache', ms: L.cache, note: cacheOn ? 'hit' : 'miss' }
    ];
    if (!cacheOn) hops.push({ from: 'api', to: 'db', ms: Math.round(L.db * dbF), note: load > 1 ? 'load' : 'query' });
    if (load >= 100) hops.push({ from: 'api', to: 'queue', ms: L.queue, note: 'async' });
    hops.push({ from: 'api', to: 'client', ms: Math.round(L.api * 0.6 + L.cdn * 0.5), note: 'response' });
    return hops;
}

const SystemsDemo = ({ openScene }) => {
    const { t, i18n } = useTranslation();
    const reduce = useReducedMotion();
    const [region, setRegion] = useState('lima');
    const [cacheOn, setCacheOn] = useState(true);
    const [load, setLoad] = useState(1);
    const [selected, setSelected] = useState('api');
    const [running, setRunning] = useState(false);
    const [step, setStep] = useState(-1);
    const [done, setDone] = useState([]);
    const [endpoint, setEndpoint] = useState(endpoints[0].id);
    const timers = useRef([]);

    const hops = useMemo(() => buildPath(region, cacheOn, load), [region, cacheOn, load]);
    const total = done.reduce((a, h) => a + h.ms, 0);
    const nodeMap = useMemo(() => Object.fromEntries(systemNodes.map(n => [n.id, n])), []);

    const clearTimers = () => { timers.current.forEach(clearTimeout); timers.current = []; };
    useEffect(() => clearTimers, []);

    const simulate = () => {
        clearTimers();
        setDone([]); setStep(0); setRunning(true);
        let acc = 0;
        hops.forEach((h, i) => {
            const dur = reduce ? 120 : Math.max(380, Math.min(1100, h.ms * 8));
            timers.current.push(setTimeout(() => { setStep(i); }, acc));
            acc += dur;
            timers.current.push(setTimeout(() => { setDone(d => [...d, h]); }, acc));
        });
        timers.current.push(setTimeout(() => { setRunning(false); setStep(-1); }, acc + 100));
    };

    // consola: escritura progresiva del JSON
    const ep = endpoints.find(e => e.id === endpoint);
    const json = useMemo(() => JSON.stringify(ep.response, null, 2), [ep]);
    const typed = useTypewriter(json, !reduce);

    const activeHop = step >= 0 ? hops[step] : null;
    const sel = nodeMap[selected];
    const locale = localeFor(i18n.language);

    return (
        <div className="lab-layout sys-layout">
            <aside className="lab-controls">
                <div className="lab-intro">
                    <h3>{t('lab.systems.intro.title')}</h3>
                    <p>{t('lab.systems.intro.body')}</p>
                </div>

                <div className="lab-control">
                    <span className="lab-control-label">{t('lab.systems.region')}</span>
                    <div className="lab-seg" role="group">
                        <button type="button" aria-pressed={region === 'lima'} onClick={() => setRegion('lima')}>Lima</button>
                        <button type="button" aria-pressed={region === 'virginia'} onClick={() => setRegion('virginia')}>Virginia</button>
                    </div>
                </div>

                <div className="lab-control">
                    <span className="lab-control-label">{t('lab.systems.load')}</span>
                    <div className="lab-seg" role="group">
                        {LOADS.map(l => <button key={l} type="button" aria-pressed={load === l} onClick={() => setLoad(l)}>{l}×</button>)}
                    </div>
                </div>

                <label className="lab-switch">
                    <span>{t('lab.systems.cache')}<small>{t('lab.systems.cacheHint')}</small></span>
                    <input type="checkbox" checked={cacheOn} onChange={(e) => setCacheOn(e.target.checked)} />
                    <span className="lab-switch-track" aria-hidden />
                </label>

                <button type="button" className="lab-btn lab-btn--primary" onClick={simulate} disabled={running}>
                    {running ? t('lab.systems.running') : t('lab.systems.simulate')}
                </button>

                <div className="sys-result" aria-live="polite">
                    <div className="sys-result-head">
                        <span>{t('lab.systems.totalLatency')}</span>
                        <strong>{done.length ? `${total} ms` : '—'}</strong>
                    </div>
                    <ol className="sys-hops">
                        {hops.map((h, i) => {
                            const d = done[i];
                            const active = step === i;
                            return (
                                <li key={i} className={`${d ? 'done' : ''} ${active ? 'active' : ''}`}>
                                    <span>{t(`lab.systems.nodes.${h.to}.name`)}</span>
                                    <em>{h.note && t(`lab.systems.notes.${h.note}`)}</em>
                                    <b>{d ? `${d.ms} ms` : active ? '…' : ''}</b>
                                </li>
                            );
                        })}
                    </ol>
                    {done.length === hops.length && (
                        <p className="lab-hint">{total < 120 ? t('lab.systems.verdict.fast') : total < 400 ? t('lab.systems.verdict.ok') : t('lab.systems.verdict.slow')}</p>
                    )}
                </div>

                <button type="button" className="lab-btn" onClick={() => openScene?.('mobile', { app: 'admin' })}>{t('lab.systems.seeAsApp')} →</button>
            </aside>

            <div className="sys-stage">
                <div className="sys-diagram-card">
                    <svg className="sys-diagram" viewBox="0 0 780 290" role="img" aria-label={t('lab.systems.diagramLabel')}>
                        <defs>
                            <marker id="sys-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                                <path d="M0,0 L10,5 L0,10 z" fill="currentColor" />
                            </marker>
                        </defs>
                        <g className="sys-edges">
                            {systemEdges.map(([a, b]) => {
                                const A = nodeMap[a], B = nodeMap[b];
                                const isActive = activeHop && ((activeHop.from === a && activeHop.to === b) || (activeHop.from === b && activeHop.to === a));
                                const [x1, y1] = edgePoint(A, B);
                                const [x2, y2] = edgePoint(B, A);
                                return <line key={`${a}-${b}`} x1={x1} y1={y1} x2={x2} y2={y2} className={isActive ? 'active' : ''} markerEnd="url(#sys-arrow)" />;
                            })}
                        </g>
                        {systemNodes.map(n => {
                            const isSel = selected === n.id;
                            const isHot = activeHop && (activeHop.to === n.id || activeHop.from === n.id);
                            const disabled = (n.id === 'cache' && !cacheOn) || (n.id === 'queue' && load < 100) || (n.id === 'worker' && load < 100);
                            return (
                                <g key={n.id} className={`sys-node ${isSel ? 'selected' : ''} ${isHot ? 'hot' : ''} ${disabled ? 'off' : ''}`} transform={`translate(${n.x},${n.y})`} onClick={() => setSelected(n.id)} tabIndex={0} role="button" aria-pressed={isSel} aria-label={t(`lab.systems.nodes.${n.id}.name`)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelected(n.id); } }}>
                                    <rect width={NODE_W} height={NODE_H} rx="10" />
                                    <svg x="8" y="10" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><NodeIcon id={n.id} /></svg>
                                    <text x="38" y="27">{t(`lab.systems.nodes.${n.id}.name`)}</text>
                                </g>
                            );
                        })}
                        <AnimatePresence>
                            {activeHop && (
                                <Motion.circle
                                    key={step}
                                    r="7"
                                    className="sys-pulse"
                                    initial={{ cx: nodeMap[activeHop.from].x + NODE_W / 2, cy: nodeMap[activeHop.from].y + NODE_H / 2, opacity: 0 }}
                                    animate={{ cx: nodeMap[activeHop.to].x + NODE_W / 2, cy: nodeMap[activeHop.to].y + NODE_H / 2, opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: reduce ? 0.1 : Math.max(0.35, Math.min(1.05, activeHop.ms * 0.008)), ease: 'easeInOut' }}
                                />
                            )}
                        </AnimatePresence>
                    </svg>
                    <p className="sys-diagram-hint">{t('lab.systems.diagramHint')}</p>
                </div>

                <div className="sys-lower">
                    <div className="sys-node-panel">
                        <AnimatePresence mode="wait" initial={false}>
                            <Motion.div key={selected} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
                                <span className="sys-node-kicker">{t('lab.systems.component')}</span>
                                <h4>{t(`lab.systems.nodes.${selected}.name`)}</h4>
                                <p>{t(`lab.systems.nodes.${selected}.desc`)}</p>
                                <div className="sys-node-fail"><strong>{t('lab.systems.ifFails')}</strong> {t(`lab.systems.nodes.${selected}.fail`)}</div>
                                <div className="sys-node-tech">{sel.tech.map(x => <span key={x} className="tech-badge">{x}</span>)}</div>
                            </Motion.div>
                        </AnimatePresence>
                    </div>

                    <div className="sys-console">
                        <div className="sys-console-tabs" role="tablist">
                            {endpoints.map(e => (
                                <button key={e.id} type="button" role="tab" aria-selected={endpoint === e.id} className={endpoint === e.id ? 'active' : ''} onClick={() => setEndpoint(e.id)}>
                                    <b className={`m-${e.method.toLowerCase()}`}>{e.method}</b> {t(`lab.systems.endpoints.${e.id}`)}
                                </button>
                            ))}
                        </div>
                        <div className="sys-console-req">
                            <span className={`m-${ep.method.toLowerCase()}`}>{ep.method}</span>
                            <code>{ep.path}</code>
                            <span className="sys-console-status">{ep.method === 'POST' ? '201 Created' : '200 OK'} · {(hops[1].ms + 12).toLocaleString(locale)} ms</span>
                        </div>
                        {ep.body && <pre className="sys-console-body" aria-label="request body">{JSON.stringify(ep.body, null, 2)}</pre>}
                        <pre className="sys-console-out" aria-live="off">{typed}<span className="sys-caret" aria-hidden /></pre>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SystemsDemo;
