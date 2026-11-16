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

const ROKKO_CHANNEL = 'https://www.youtube.com/@RokoExplainsIt';
const CLIPS = [[legadoA, legadoAPoster], [rokkoA, rokkoAPoster], [legadoB, legadoBPoster], [rokkoB, rokkoBPoster]];

/** Personaje con su nombre debajo. */
const Char = ({ src, name, anim = '' }) => (
    <figure className="jr-char">
        <img className={anim} src={src} alt={name} loading="lazy" decoding="async" />
        <figcaption>{name}</figcaption>
    </figure>
);

const Cloud = ({ depth, style, tone }) => (
    <Layer depth={depth} travel={220} className={`jr-cloud jr-cloud--${tone}`} style={style} />
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
                    <div className="jr-moon-disc" aria-hidden="true"><i /><i /><i /><i /><i /></div>
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
                <Layer depth={0.35} travel={140} className="jr-abs jr-rock jr-rock--a"><Char src={mina} name="Mina" anim="rd-float rd-float--b" /><div className="jr-rock-body" aria-hidden="true" /></Layer>
                <Layer depth={0.6} travel={190} className="jr-abs jr-rock jr-rock--b"><Char src={markup} name="Mr. Markup" anim="rd-float" /><div className="jr-rock-body" aria-hidden="true" /></Layer>
                <Layer depth={0.2} travel={90} className="jr-abs jr-rock jr-rock--c" aria-hidden="true"><div className="jr-rock-body" /></Layer>
                <Layer depth={0.85} travel={240} className="jr-abs jr-rock jr-rock--d" aria-hidden="true"><div className="jr-rock-body" /></Layer>
                <Layer depth={1.1} travel={320} className="jr-abs jr-rocket-wrap" aria-hidden="true">
                    <div className="jr-rocket"><span className="jr-rocket-fin" /><span className="jr-rocket-body"><i /></span><span className="jr-rocket-flame" /></div>
                </Layer>
            </ParallaxScene>

            {/* 3 · Legado baja en paracaídas */}
            <ParallaxScene className="jr-sec jr-fall">
                <div className="jr-panel jr-panel--r">
                    <img className="jr-mark" src={gla} alt="Grupo Legado Amazónico" loading="lazy" decoding="async" />
                    <h2>{t('rd.anim.legadoTitle')}</h2>
                    <p>{t('rd.anim.legadoText')}</p>
                </div>
                <Layer depth={0.45} travel={220} className="jr-abs jr-drop jr-drop--a"><div className="jr-chute" aria-hidden="true" /><Char src={ushico} name="Ushico" /></Layer>
                <Layer depth={0.7} travel={300} className="jr-abs jr-drop jr-drop--b"><div className="jr-chute" aria-hidden="true" /><Char src={tari} name="Tari" /></Layer>
                <Layer depth={0.95} travel={260} className="jr-abs jr-drop jr-drop--c"><Char src={mayo} name="Mayo" anim="rd-float rd-float--c" /></Layer>
            </ParallaxScene>

            {/* 4 · Las nubes */}
            <ParallaxScene className="jr-sec jr-clouds" aria-hidden="true">
                <Cloud depth={0.15} tone="far" style={{ left: '6%', top: '12%', '--h': '70px' }} />
                <Cloud depth={0.25} tone="far" style={{ right: '10%', top: '4%', '--h': '90px' }} />
                <Cloud depth={0.5} tone="mid" style={{ left: '28%', top: '34%', '--h': '120px' }} />
                <Cloud depth={0.6} tone="mid" style={{ right: '-4%', top: '44%', '--h': '140px' }} />
                <Cloud depth={0.9} tone="near" style={{ left: '-5%', top: '58%', '--h': '170px' }} />
                <Cloud depth={1} tone="near" style={{ right: '18%', top: '70%', '--h': '150px' }} />
            </ParallaxScene>

            {/* 5 · La selva */}
            <ParallaxScene className="jr-sec jr-jungle">
                <Layer depth={0.1} travel={60} className="jr-abs jr-hills" aria-hidden="true" />
                <Layer depth={0.25} travel={90} className="jr-abs jr-trees jr-trees--back" aria-hidden="true">
                    {[4, 17, 31, 52, 66, 81, 93].map((x, i) => <span key={x} className="jr-tree" style={{ left: `${x}%`, '--w': `${9 + (i % 3) * 3}%` }} />)}
                </Layer>
                <Layer depth={0.3} className="jr-abs jr-j jr-j--lupuna"><Char src={lupuna} name="Abuela Lupuna" /></Layer>
                <Layer depth={0.5} className="jr-abs jr-j jr-j--mayo"><Char src={mayo} name="Mayo" anim="rd-float rd-float--c" /></Layer>
                <Layer depth={0.55} className="jr-abs jr-j jr-j--ushico"><Char src={ushico} name="Ushico" anim="rd-float" /></Layer>
                <Layer depth={0.6} className="jr-abs jr-j jr-j--tari"><Char src={tari} name="Tari" /></Layer>
                <Layer depth={0.9} travel={150} className="jr-abs jr-trees jr-trees--front" aria-hidden="true">
                    {[-3, 22, 46, 71, 90].map((x, i) => <span key={x} className="jr-bush" style={{ left: `${x}%`, '--w': `${16 + (i % 2) * 6}%` }} />)}
                </Layer>
            </ParallaxScene>

            {/* 6 · El mar */}
            <section className="jr-sec jr-sea">
                <div className="jr-glint" aria-hidden="true" />
                <div className="jr-wave jr-wave--a" aria-hidden="true" />
                <div className="jr-bufi"><Char src={bufi} name="Bufi" /></div>
                <div className="jr-wave jr-wave--b" aria-hidden="true" />
                <div className="jr-wave jr-wave--c" aria-hidden="true" />
            </section>

            {/* 7 · La casa de los episodios */}
            <section className="jr-sec jr-home">
                <h2>{t('rd.anim.house')}</h2>
                <div className="jr-house">
                    <div className="jr-chimney" aria-hidden="true"><i /><i /><i /></div>
                    <div className="jr-roof" aria-hidden="true" />
                    <div className="jr-walls">
                        <ul className="jr-windows">
                            {CLIPS.map(([src, poster]) => (
                                <li key={src}>
                                    {reduce
                                        ? <img src={poster} alt="" loading="lazy" decoding="async" />
                                        : <video src={src} poster={poster} autoPlay muted loop playsInline preload="metadata" disablePictureInPicture />}
                                </li>
                            ))}
                        </ul>
                        <a className="jr-door" href={ROKKO_CHANNEL} target="_blank" rel="noopener noreferrer">
                            <span>YouTube ↗</span>
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Animation;
