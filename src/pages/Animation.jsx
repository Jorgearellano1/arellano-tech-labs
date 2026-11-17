import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useReducedMotion } from 'framer-motion';
import { ParallaxScene, Layer } from '../components/common/Parallax';
import Char from '../components/common/Char';
import { CAST } from '../data/cast';
import rokkoA from '../assets/animacion/clips/rokko-a.mp4';
import rokkoB from '../assets/animacion/clips/rokko-b.mp4';
import rokkoC from '../assets/animacion/clips/rokko-c.mp4';
import rokkoD from '../assets/animacion/clips/rokko-d.mp4';
import rokkoE from '../assets/animacion/clips/rokko-e.mp4';
import rokkoF from '../assets/animacion/clips/rokko-f.mp4';
import legadoA from '../assets/animacion/clips/legado-a.mp4';
import legadoB from '../assets/animacion/clips/legado-b.mp4';
import legadoC from '../assets/animacion/clips/legado-c.mp4';
import legadoD from '../assets/animacion/clips/legado-d.mp4';
import legadoE from '../assets/animacion/clips/legado-e.mp4';
import luna from '../assets/animacion/mundo/luna.webp';
import rocaA from '../assets/animacion/mundo/asteroide-a.webp';
import rocaB from '../assets/animacion/mundo/asteroide-b.webp';
import cohete from '../assets/animacion/mundo/cohete.webp';
import llama from '../assets/animacion/mundo/llama.webp';
import nubeA from '../assets/animacion/mundo/nube-a.webp';
import nubeB from '../assets/animacion/mundo/nube-b.webp';
import paracaidas from '../assets/animacion/mundo/paracaidas.webp';
import selva from '../assets/animacion/mundo/selva.webp';
import rio from '../assets/animacion/mundo/rio.webp';

const ROKKO_CHANNEL = 'https://www.youtube.com/@RokoExplainsIt';

// Cada cosa que se abre (asteroide, nube, selva) es una línea de trabajo con sus pruebas en video.
const WORK = {
    s1: { clips: [rokkoA, rokkoC, rokkoD], link: ROKKO_CHANNEL },
    s2: { clips: [rokkoB, rokkoE, rokkoF], link: ROKKO_CHANNEL },
    s3: { clips: [legadoA, legadoB, legadoE] },
    s4: { clips: [legadoC, legadoD, rokkoD] },
    s5: { cast: true }
};

/** Objeto del escenario que se abre al tocarlo. */
const Opener = ({ id, onOpen, children, className = '' }) => {
    const { t } = useTranslation();
    return (
        <button type="button" className={`jr-open ${className}`} onClick={() => onOpen(id)} aria-haspopup="dialog">
            {children}
            <span className="jr-pill"><i aria-hidden="true">▶</i>{t(`rd.anim2.${id}.t`)}</span>
        </button>
    );
};

/**
 * Animación: página de venta en forma de descenso. Luna → asteroides y cohete → paracaídas y nubes → selva → río.
 * Al tocar un asteroide, una nube o un personaje de la selva se abre esa línea de trabajo con sus videos.
 */
const Animation = () => {
    const { t } = useTranslation();
    const reduce = useReducedMotion();
    const [open, setOpen] = useState(null);
    const dialog = useRef(null);

    useEffect(() => {
        const d = dialog.current;
        if (!d) return;
        if (open && !d.open) d.showModal();
        if (!open && d.open) d.close();
    }, [open]);

    const work = open ? WORK[open] : null;

    return (
        <div className="jr">
            <div className="jr-stars" aria-hidden="true" />

            {/* 1 · La luna: qué ofrecemos */}
            <ParallaxScene className="jr-sec jr-moon">
                <header className="jr-head">
                    <h1>{t('rd.anim2.h1a')} <span>{t('rd.anim2.h1b')}</span></h1>
                    <p>{t('rd.anim2.sub')}</p>
                    <div className="jr-cta">
                        <Link className="rd-btn rd-btn--y" to="/contacto">{t('rd.anim2.cta')}</Link>
                        <a className="rd-btn rd-btn--ghost" href="#ejemplos">{t('rd.anim2.examples')}</a>
                    </div>
                </header>
                <Layer depth={0.12} travel={70} className="jr-moon-wrap">
                    <Char id="roko" className="jr-on jr-on--a" />
                    <Char id="ushico" className="jr-on jr-on--b" />
                    <img className="jr-moon-img" src={luna} alt="" decoding="async" />
                </Layer>
                <Layer depth={0.9} travel={180} className="jr-abs jr-moon-pip"><Char id="pip" className="jr-fly" /></Layer>
            </ParallaxScene>

            {/* 2 · Asteroides (se abren) y el cohete */}
            <ParallaxScene className="jr-sec jr-space" id="ejemplos">
                <Layer depth={0.35} travel={120} className="jr-abs jr-rock jr-rock--a">
                    <Char id="mina" />
                    <Opener id="s1" onOpen={setOpen}><img src={rocaA} alt="" loading="lazy" decoding="async" /></Opener>
                </Layer>
                <Layer depth={0.6} travel={170} className="jr-abs jr-rock jr-rock--b">
                    <Char id="markup" />
                    <Opener id="s2" onOpen={setOpen}><img src={rocaB} alt="" loading="lazy" decoding="async" /></Opener>
                </Layer>
                <Layer depth={0.2} travel={80} className="jr-abs jr-rock jr-rock--c" aria-hidden="true"><img className="jr-bob" src={rocaB} alt="" loading="lazy" decoding="async" /></Layer>
                <Layer depth={0.85} travel={220} className="jr-abs jr-rock jr-rock--d" aria-hidden="true"><img className="jr-bob" src={rocaA} alt="" loading="lazy" decoding="async" /></Layer>
                <Layer depth={1.1} travel={300} className="jr-abs jr-rocket-wrap" aria-hidden="true">
                    <div className="jr-rocket"><img className="jr-flame" src={llama} alt="" loading="lazy" decoding="async" /><img className="jr-rocket-img" src={cohete} alt="" loading="lazy" decoding="async" /></div>
                </Layer>
            </ParallaxScene>

            {/* 3 · Legado baja en paracaídas entre nubes que se abren */}
            <ParallaxScene className="jr-sec jr-fall">
                <Layer depth={0.2} travel={140} className="jr-abs jr-cloud jr-cloud--bg1" aria-hidden="true"><img src={nubeB} alt="" loading="lazy" decoding="async" /></Layer>
                <Layer depth={0.3} travel={160} className="jr-abs jr-cloud jr-cloud--bg2" aria-hidden="true"><img src={nubeA} alt="" loading="lazy" decoding="async" /></Layer>
                <Layer depth={0.45} travel={200} className="jr-abs jr-drop jr-drop--a"><img className="jr-chute" src={paracaidas} alt="" loading="lazy" decoding="async" /><Char id="ushico" /></Layer>
                <Layer depth={0.7} travel={260} className="jr-abs jr-drop jr-drop--b"><img className="jr-chute" src={paracaidas} alt="" loading="lazy" decoding="async" /><Char id="tari" /></Layer>
                <Layer depth={0.95} travel={240} className="jr-abs jr-drop--c"><Char id="mayo" className="jr-fly" /></Layer>
                <Layer depth={0.8} travel={220} className="jr-abs jr-cloud jr-cloud--s3"><Opener id="s3" onOpen={setOpen}><img src={nubeA} alt="" loading="lazy" decoding="async" /></Opener></Layer>
                <Layer depth={1} travel={260} className="jr-abs jr-cloud jr-cloud--s4"><Opener id="s4" onOpen={setOpen}><img src={nubeB} alt="" loading="lazy" decoding="async" /></Opener></Layer>
            </ParallaxScene>

            {/* 4 · La selva: los personajes */}
            {/* Banco de nubes que tapa la unión entre el cielo y la selva */}
            <div className="jr-seam" aria-hidden="true">
                {[nubeA, nubeB, nubeA, nubeB, nubeA].map((n, i) => (
                    <img key={i} src={n} alt="" className={`jr-seam-c jr-seam-c--${i}`} loading="lazy" decoding="async" />
                ))}
            </div>
            <ParallaxScene className="jr-sec jr-jungle" style={{ backgroundImage: `url(${selva})` }}>
                <Layer depth={0.3} className="jr-abs jr-j jr-j--lupuna"><Char id="lupuna" /></Layer>
                <Layer depth={0.5} className="jr-abs jr-j jr-j--mayo"><Char id="mayo" /></Layer>
                <Layer depth={0.55} className="jr-abs jr-j jr-j--ushico"><Char id="ushico" /></Layer>
                <Layer depth={0.6} className="jr-abs jr-j jr-j--tari"><Char id="tari" /></Layer>
                <Opener id="s5" onOpen={setOpen} className="jr-open--sign"><span /></Opener>
            </ParallaxScene>

            {/* 5 · El río: cierre */}
            <section className="jr-sec jr-sea" style={{ backgroundImage: `url(${rio})` }}>
                <div className="jr-bufi"><Char id="bufi" /></div>
                <div className="jr-sea-front" style={{ backgroundImage: `url(${rio})` }} aria-hidden="true" />
                <div className="jr-end">
                    <h2>{t('rd.anim2.end')}</h2>
                    <Link className="rd-btn rd-btn--y" to="/contacto">{t('rd.anim2.cta')}</Link>
                </div>
            </section>

            <dialog className="jr-dialog" ref={dialog} onClose={() => setOpen(null)} onClick={(e) => { if (e.target === dialog.current) setOpen(null); }}>
                {work && (
                    <div className="jr-dialog-in">
                        <button type="button" className="jr-x" onClick={() => setOpen(null)} aria-label={t('rd.anim2.close')}>×</button>
                        <h2>{t(`rd.anim2.${open}.t`)}</h2>
                        <p>{t(`rd.anim2.${open}.d`)}</p>
                        {work.clips && (
                            <div className="jr-clips">
                                {work.clips.map((src) => <video key={src} src={src} autoPlay={!reduce} muted loop playsInline controls={reduce} preload="metadata" disablePictureInPicture />)}
                            </div>
                        )}
                        {work.cast && (
                            <ul className="jr-castgrid">
                                {Object.keys(CAST).map((id) => (
                                    <li key={id}><Char id={id} label={false} /><strong>{CAST[id].name}</strong><span>{t(`rd.cast.${id}`)}</span></li>
                                ))}
                            </ul>
                        )}
                        <div className="jr-dialog-cta">
                            <Link className="rd-btn rd-btn--y" to="/contacto">{t('rd.anim2.want')}</Link>
                            {work.link && <a className="jr-out" href={work.link} target="_blank" rel="noopener noreferrer">{t('rd.anim.channel')} ↗</a>}
                        </div>
                    </div>
                )}
            </dialog>
        </div>
    );
};

export default Animation;
