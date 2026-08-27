import { useEffect, useState } from 'react';
import { AnimatePresence, motion as Motion, useReducedMotion } from 'framer-motion';
import { AppHeader } from './shared/AppKit';
import { Icons } from './shared/icons';
import { getProjectBySlug } from '../../../data/projects';
import './ArLauncherApp.css';

const AR_URL = 'https://ar.totemiq.art';

const ArLauncherApp = ({ t }) => {
    const reduce = useReducedMotion();
    const [step, setStep] = useState('splash'); // splash | scanning | found
    const totems = getProjectBySlug('totems-del-inca');
    const totemiq = getProjectBySlug('totemiq');

    useEffect(() => {
        if (step !== 'scanning') return undefined;
        const id = setTimeout(() => setStep('found'), reduce ? 600 : 2400);
        return () => clearTimeout(id);
    }, [step, reduce]);

    return (
        <div className="app arl-app">
            <AnimatePresence mode="wait" initial={false}>
                {step === 'splash' && (
                    <Motion.div key="splash" className="arl-splash" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <img src={totemiq.images[1]} alt="" className="arl-art" />
                        <div className="arl-splash-text">
                            <span className="arl-kicker">{t('lab.apps.ar.kicker')}</span>
                            <h3>{t('lab.apps.ar.title')}</h3>
                            <p>{t('lab.apps.ar.body')}</p>
                        </div>
                        <button type="button" className="d-btn arl-cta" onClick={() => setStep('scanning')}>{Icons.scan} {t('lab.apps.ar.scan')}</button>
                    </Motion.div>
                )}

                {step === 'scanning' && (
                    <Motion.div key="scan" className="arl-scanner" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <img src={totems.images[1]} alt="" className="arl-viewfinder" />
                        <div className="arl-overlay">
                            <div className="arl-reticle" aria-hidden>
                                <span /><span /><span /><span />
                                {!reduce && <i className="arl-scanline" />}
                            </div>
                            <p className="arl-status" aria-live="polite">{t('lab.apps.ar.scanning')}</p>
                        </div>
                        <button type="button" className="arl-close" onClick={() => setStep('splash')} aria-label={t('lab.apps.back')}>×</button>
                    </Motion.div>
                )}

                {step === 'found' && (
                    <Motion.div key="found" className="arl-found" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                        <AppHeader title={t('lab.apps.ar.detected')} onBack={() => setStep('splash')} backLabel={t('lab.apps.back')} />
                        <div className="app-scroll">
                            <div className="arl-card">
                                <img src={totems.images[2]} alt="" />
                                <div>
                                    <span className="d-pill d-pill--good">{t('lab.apps.ar.match')} 98%</span>
                                    <h3>{t('lab.apps.ar.pieceName')}</h3>
                                    <p>{t('lab.apps.ar.pieceBody')}</p>
                                </div>
                            </div>
                            <div className="arl-meta">
                                <div><span className="d-muted">{t('lab.apps.ar.model')}</span><strong>GLTF · 2.1 MB</strong></div>
                                <div><span className="d-muted">{t('lab.apps.ar.tracking')}</span><strong>{t('lab.apps.ar.trackingValue')}</strong></div>
                            </div>
                        </div>
                        <div className="app-footer arl-footer">
                            <a className="d-btn" href={AR_URL} target="_blank" rel="noopener noreferrer">{t('lab.apps.ar.openReal')} ↗</a>
                        </div>
                    </Motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ArLauncherApp;
