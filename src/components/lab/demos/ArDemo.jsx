import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import PhoneShell from '../PhoneShell';
import useMediaQuery from '../useMediaQuery';
import { buildVars } from '../useDemoTheme';
import { getProjectBySlug } from '../../../data/projects';
import qrTotemiq from '../../../assets/lab/qr-totemiq.svg';
import './ArDemo.css';

const AR_URL = 'https://ar.totemiq.art';
const LOAD_TIMEOUT = 12000;

const ArDemo = ({ openScene }) => {
    const { t } = useTranslation();
    const isNarrow = useMediaQuery('(max-width: 760px)');
    const [wantEmbed, setWantEmbed] = useState(false);
    const [status, setStatus] = useState(() => (isNarrow ? 'idle' : 'loading')); // idle | loading | ready | error
    const [attempt, setAttempt] = useState(0);
    const timer = useRef(null);
    const totemiq = getProjectBySlug('totemiq');
    const totems = getProjectBySlug('totems-del-inca');
    const vars = buildVars({ palette: 'ambar', mode: 'dark', platform: 'ios', fontScale: 'md', density: 'comfortable' });

    const embed = !isNarrow || wantEmbed;

    useEffect(() => {
        if (!embed) return undefined;
        timer.current = setTimeout(() => setStatus(s => (s === 'loading' ? 'error' : s)), LOAD_TIMEOUT);
        return () => clearTimeout(timer.current);
    }, [embed, attempt]);

    const onLoad = () => { clearTimeout(timer.current); setStatus('ready'); };
    const retry = () => { setStatus('loading'); setAttempt(a => a + 1); };
    const embedNow = () => { setStatus('loading'); setWantEmbed(true); };

    const steps = ['scan', 'allow', 'point'];

    return (
        <div className="lab-layout ar-demo-layout">
            <aside className="lab-controls">
                <div className="lab-intro">
                    <h3>{t('lab.ar.intro.title')}</h3>
                    <p>{t('lab.ar.intro.body')}</p>
                </div>

                <ol className="ar-steps">
                    {steps.map((s, i) => (
                        <li key={s}><b>{i + 1}</b><span>{t(`lab.ar.steps.${s}`)}</span></li>
                    ))}
                </ol>

                <div className="ar-qr-card">
                    <img src={qrTotemiq} alt={t('lab.ar.qrAlt')} width="160" height="160" />
                    <div>
                        <strong>{t('lab.ar.qrTitle')}</strong>
                        <span className="lab-hint">{AR_URL.replace('https://', '')}</span>
                    </div>
                </div>

                <div className="ar-actions">
                    <a className="lab-btn lab-btn--primary" href={AR_URL} target="_blank" rel="noopener noreferrer">
                        {isNarrow ? t('lab.ar.openPhone') : t('lab.ar.openTab')} ↗
                    </a>
                    <button type="button" className="lab-btn" onClick={() => openScene?.('mobile', { app: 'ar' })}>
                        {t('lab.ar.seeLauncher')}
                    </button>
                </div>

                <p className="lab-hint">{t('lab.ar.cameraNote')}</p>
            </aside>

            <div className="ar-stage">
                <div className="ar-phone-wrap">
                    <PhoneShell platform="ios" vars={vars} label={t('lab.ar.phoneLabel')} className="ar-phone">
                        {embed ? (
                            <div className={`ar-embed is-${status}`}>
                                {status !== 'error' && (
                                    <iframe
                                        key={attempt}
                                        src={AR_URL}
                                        title={t('lab.ar.iframeTitle')}
                                        loading="lazy"
                                        allow="camera; microphone; accelerometer; gyroscope; magnetometer; xr-spatial-tracking; fullscreen"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        onLoad={onLoad}
                                    />
                                )}
                                {status === 'loading' && (
                                    <div className="ar-loading" aria-live="polite">
                                        <span className="ar-spinner" />
                                        <span>{t('lab.ar.loading')}</span>
                                    </div>
                                )}
                                {status === 'error' && (
                                    <div className="ar-fallback">
                                        <img src={totemiq.images[1]} alt="" />
                                        <p>{t('lab.ar.unavailable')}</p>
                                        <div>
                                            <button type="button" className="d-btn d-btn--ghost" onClick={retry}>{t('lab.ar.retry')}</button>
                                            <a className="d-btn" href={AR_URL} target="_blank" rel="noopener noreferrer">{t('lab.ar.openTab')}</a>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="ar-mobile-cta">
                                <img src={totemiq.images[1]} alt="" />
                                <p>{t('lab.ar.mobileHint')}</p>
                                <a className="d-btn" href={AR_URL} target="_blank" rel="noopener noreferrer">{t('lab.ar.openPhone')} ↗</a>
                                <button type="button" className="d-btn d-btn--ghost" onClick={embedNow}>{t('lab.ar.embedAnyway')}</button>
                            </div>
                        )}
                    </PhoneShell>
                    <p className="ar-caption">
                        <span className={`ar-status-dot is-${status}`} aria-hidden />
                        {status === 'ready' ? t('lab.ar.live') : status === 'error' ? t('lab.ar.offline') : t('lab.ar.connecting')}
                    </p>
                </div>

                <div className="ar-gallery">
                    <h4>{t('lab.ar.galleryTitle')}</h4>
                    <div className="ar-gallery-strip">
                        {[...totemiq.images, ...totems.images.slice(1, 3)].map((src, i) => (
                            <img key={i} src={src} alt={`${t(totemiq.name)} ${i + 1}`} loading="lazy" decoding="async" />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArDemo;
