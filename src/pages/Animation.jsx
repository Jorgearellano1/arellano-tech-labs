import { useTranslation } from 'react-i18next';
import { useReducedMotion } from 'framer-motion';
import { ParallaxScene, Layer } from '../components/common/Parallax';
import gla from '../assets/animacion/gla.webp';
import ushico from '../assets/animacion/ushico.webp';
import mayo from '../assets/animacion/mayo.webp';
import tari from '../assets/animacion/tari.webp';
import bufi from '../assets/animacion/bufi.webp';
import lupuna from '../assets/animacion/abuela-lupuna.webp';
import roko from '../assets/animacion/roko.webp';
import mina from '../assets/animacion/mina.webp';
import pip from '../assets/animacion/pip.webp';
import markup from '../assets/animacion/markup.webp';
import rokkoA from '../assets/animacion/clips/rokko-a.mp4';
import rokkoAPoster from '../assets/animacion/clips/rokko-a.webp';
import rokkoB from '../assets/animacion/clips/rokko-b.mp4';
import rokkoBPoster from '../assets/animacion/clips/rokko-b.webp';
import legadoA from '../assets/animacion/clips/legado-a.mp4';
import legadoAPoster from '../assets/animacion/clips/legado-a.webp';
import legadoB from '../assets/animacion/clips/legado-b.mp4';
import legadoBPoster from '../assets/animacion/clips/legado-b.webp';
import luna from '../assets/animacion/mundo/luna.webp';
import rocaA from '../assets/animacion/mundo/asteroide-a.webp';
import rocaB from '../assets/animacion/mundo/asteroide-b.webp';
import cohete from '../assets/animacion/mundo/cohete.webp';
import llama from '../assets/animacion/mundo/llama.webp';
import nubeA from '../assets/animacion/mundo/nube-a.webp';
import nubeB from '../assets/animacion/mundo/nube-b.webp';
import paracaidas from '../assets/animacion/mundo/paracaidas.webp';
import casa from '../assets/animacion/mundo/casa.webp';
import selva from '../assets/animacion/mundo/selva.webp';
import rio from '../assets/animacion/mundo/rio.webp';

const ROKKO_CHANNEL = 'https://www.youtube.com/@RokoExplainsIt';
const CLIPS = [[legadoA, legadoAPoster], [rokkoA, rokkoAPoster], [legadoB, legadoBPoster], [rokkoB, rokkoBPoster]];

/** Personaje con su nombre debajo. */
const Char = ({ src, name, anim = '' }) => (
    <figure className="jr-char">
        <img className={anim} src={src} alt={name} loading="lazy" decoding="async" />
        <figcaption>{name}</figcaption>
    </figure>
);

const Cloud = ({ depth, src, style }) => (
    <Layer depth={depth} travel={220} className="jr-abs jr-cloud" style={style}><img src={src} alt="" loading="lazy" decoding="async" /></Layer>
);

/**
 * Animación: un descenso de noche. Arriba la luna, luego los asteroides de Rokko y un cohete,
 * los personajes de Legado bajando en paracaídas, las nubes, la selva, el mar y, al fondo, la casa donde se ven los episodios.
 */
const Animation = () => {
    const { t } = useTranslation();
    const reduce = useReducedMotion();

    return (
        <div className="jr">
            <div className="rd-sky-stars jr-stars" aria-hidden="true" />

            {/* 1 · La luna */}
            <ParallaxScene className="jr-sec jr-moon">
                <header className="jr-head">
                    <h1>{t('rd.anim.title')} <span>{t('rd.anim.titleAccent')}</span></h1>
                    <p>{t('rd.anim.sub')}</p>
                </header>
                <Layer depth={0.12} travel={80} className="jr-moon-wrap">
                    <div className="jr-on jr-on--a"><Char src={roko} name="Roko" anim="rd-float" /></div>
                    <div className="jr-on jr-on--b"><Char src={ushico} name="Ushico" anim="rd-float rd-float--b" /></div>
                    <img className="jr-moon-img" src={luna} alt="" decoding="async" />
                </Layer>
                <Layer depth={0.9} travel={200} className="jr-abs jr-moon-pip"><Char src={pip} name="Pip" anim="rd-float rd-float--c" /></Layer>
            </ParallaxScene>

            {/* 2 · Asteroides de Rokko y el cohete */}
            <ParallaxScene className="jr-sec jr-space">
                <div className="jr-panel jr-panel--l">
                    <h2>Rokko</h2>
                    <p>{t('rd.anim.rokkoText')}</p>
                    <a className="rd-btn rd-btn--y" href={ROKKO_CHANNEL} target="_blank" rel="noopener noreferrer">{t('rd.anim.channel')} ↗</a>
                </div>
                <Layer depth={0.35} travel={140} className="jr-abs jr-rock jr-rock--a"><Char src={mina} name="Mina" anim="rd-float rd-float--b" /><img className="jr-rock-img" src={rocaA} alt="" loading="lazy" decoding="async" /></Layer>
                <Layer depth={0.6} travel={190} className="jr-abs jr-rock jr-rock--b"><Char src={markup} name="Mr. Markup" anim="rd-float" /><img className="jr-rock-img" src={rocaB} alt="" loading="lazy" decoding="async" /></Layer>
                <Layer depth={0.2} travel={90} className="jr-abs jr-rock jr-rock--c" aria-hidden="true"><img className="jr-rock-img" src={rocaB} alt="" loading="lazy" decoding="async" /></Layer>
                <Layer depth={0.85} travel={240} className="jr-abs jr-rock jr-rock--d" aria-hidden="true"><img className="jr-rock-img" src={rocaA} alt="" loading="lazy" decoding="async" /></Layer>
                <Layer depth={1.1} travel={320} className="jr-abs jr-rocket-wrap" aria-hidden="true">
                    <div className="jr-rocket"><img className="jr-flame" src={llama} alt="" loading="lazy" decoding="async" /><img className="jr-rocket-img" src={cohete} alt="" loading="lazy" decoding="async" /></div>
                </Layer>
            </ParallaxScene>

            {/* 3 · Legado baja en paracaídas */}
            <ParallaxScene className="jr-sec jr-fall">
                <div className="jr-panel jr-panel--r">
                    <img className="jr-mark" src={gla} alt="Grupo Legado Amazónico" loading="lazy" decoding="async" />
                    <h2>{t('rd.anim.legadoTitle')}</h2>
                    <p>{t('rd.anim.legadoText')}</p>
                </div>
                <Layer depth={0.45} travel={220} className="jr-abs jr-drop jr-drop--a"><img className="jr-chute" src={paracaidas} alt="" loading="lazy" decoding="async" /><Char src={ushico} name="Ushico" /></Layer>
                <Layer depth={0.7} travel={300} className="jr-abs jr-drop jr-drop--b"><img className="jr-chute" src={paracaidas} alt="" loading="lazy" decoding="async" /><Char src={tari} name="Tari" /></Layer>
                <Layer depth={0.95} travel={260} className="jr-abs jr-drop jr-drop--c"><Char src={mayo} name="Mayo" anim="rd-float rd-float--c" /></Layer>
            </ParallaxScene>

            {/* 4 · Las nubes */}
            <ParallaxScene className="jr-sec jr-clouds" aria-hidden="true">
                <Cloud depth={0.2} src={nubeB} style={{ left: '4%', top: '6%', width: '20%', opacity: 0.35 }} />
                <Cloud depth={0.3} src={nubeA} style={{ right: '8%', top: '0%', width: '24%', opacity: 0.45 }} />
                <Cloud depth={0.55} src={nubeA} style={{ left: '24%', top: '30%', width: '32%', opacity: 0.8 }} />
                <Cloud depth={0.7} src={nubeB} style={{ right: '-4%', top: '40%', width: '34%', opacity: 0.9 }} />
                <Cloud depth={1} src={nubeB} style={{ left: '-6%', top: '56%', width: '42%' }} />
                <Cloud depth={1.1} src={nubeA} style={{ right: '14%', top: '66%', width: '40%' }} />
            </ParallaxScene>

            {/* 5 · La selva (fondo real de la serie) */}
            <ParallaxScene className="jr-sec jr-jungle" style={{ backgroundImage: `url(${selva})` }}>
                <Layer depth={0.3} className="jr-abs jr-j jr-j--lupuna"><Char src={lupuna} name="Abuela Lupuna" /></Layer>
                <Layer depth={0.5} className="jr-abs jr-j jr-j--mayo"><Char src={mayo} name="Mayo" anim="rd-float rd-float--c" /></Layer>
                <Layer depth={0.55} className="jr-abs jr-j jr-j--ushico"><Char src={ushico} name="Ushico" anim="rd-float" /></Layer>
                <Layer depth={0.6} className="jr-abs jr-j jr-j--tari"><Char src={tari} name="Tari" /></Layer>
            </ParallaxScene>

            {/* 6 · El río */}
            <section className="jr-sec jr-sea" style={{ backgroundImage: `url(${rio})` }}>
                <div className="jr-bufi"><Char src={bufi} name="Bufi" /></div>
                <div className="jr-sea-front" style={{ backgroundImage: `url(${rio})` }} aria-hidden="true" />
            </section>

            {/* 7 · La casa de los episodios */}
            <section className="jr-sec jr-home">
                <h2>{t('rd.anim.house')}</h2>
                <div className="jr-house">
                    {CLIPS.map(([src, poster], i) => (
                        <div className={`jr-win jr-win--${i + 1}`} key={src}>
                            {reduce
                                ? <img src={poster} alt="" loading="lazy" decoding="async" />
                                : <video src={src} poster={poster} autoPlay muted loop playsInline preload="metadata" disablePictureInPicture />}
                        </div>
                    ))}
                    <img className="jr-house-img" src={casa} alt="" loading="lazy" decoding="async" />
                    <a className="jr-door" href={ROKKO_CHANNEL} target="_blank" rel="noopener noreferrer" aria-label={t('rd.anim.channel')}><span>YouTube ↗</span></a>
                </div>
            </section>
        </div>
    );
};

export default Animation;
