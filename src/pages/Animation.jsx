import { useTranslation } from 'react-i18next';
import { motion as Motion, useReducedMotion } from 'framer-motion';
import Crew from '../components/sections/Crew';
import AnimationStage from '../components/sections/AnimationStage';
import RokkoStage from '../components/sections/RokkoStage';
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

const LEGADO = [['ushico', 'Ushico', ushico], ['mayo', 'Mayo', mayo], ['tari', 'Tari', tari], ['bufi', 'Bufi', bufi], ['lupuna', 'Abuela Lupuna', lupuna]];
const ROKKO = [['roko', 'Roko', roko], ['pip', 'Pip', pip], ['mina', 'Mina', mina], ['markup', 'Mr. Markup', markup]];

const Clip = ({ src, poster, reduce }) => (reduce
    ? <img className="rd-clip" src={poster} alt="" loading="lazy" decoding="async" />
    : <video className="rd-clip" src={src} poster={poster} autoPlay muted loop playsInline preload="metadata" disablePictureInPicture />);

const Cast = ({ list, tone }) => {
    const { t } = useTranslation();
    const reduce = useReducedMotion();
    return (
        <ul className={`rd-cards rd-cards--${tone}`}>
            {list.map(([id, name, src], i) => (
                <Motion.li
                    key={id}
                    initial={reduce ? false : { opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ type: 'spring', stiffness: 110, damping: 15, delay: i * 0.06 }}
                >
                    <div className="rd-card-fig"><img src={src} alt={name} loading="lazy" decoding="async" /></div>
                    <strong>{name}</strong>
                    <span>{t(`rd.cast.${id}`)}</span>
                </Motion.li>
            ))}
        </ul>
    );
};

const Animation = () => {
    const { t } = useTranslation();
    const reduce = useReducedMotion();
    return (
        <div className="rd-show rd-sky">
            <div className="rd-sky-stars rd-sky-stars--page" aria-hidden="true" />
            <header className="rd-show-top">
                <div className="rd-wrap">
                    <h1>{t('rd.anim.title')} <span>{t('rd.anim.titleAccent')}</span></h1>
                    <p className="rd-lead">{t('rd.anim.sub')}</p>
                </div>
                <Crew />
            </header>

            <ul className="rd-names" aria-hidden="true">
                {[...LEGADO, ...ROKKO, ...LEGADO, ...ROKKO].map(([id, name], i) => <li key={`${id}-${i}`}>{name}<i /></li>)}
            </ul>

            <section className="rd-wrap rd-serie">
                <img className="rd-serie-peek rd-float" src={ushico} alt="" aria-hidden="true" loading="lazy" decoding="async" />
                <div className="rd-serie-head">
                    <img className="rd-serie-mark" src={gla} alt="Grupo Legado Amazónico" loading="lazy" decoding="async" />
                    <div>
                        <h2>{t('rd.anim.legadoTitle')}</h2>
                        <p>{t('rd.anim.legadoText')}</p>
                    </div>
                </div>
                <div className="rd-serie-media">
                    <AnimationStage />
                    <Clip src={legadoA} poster={legadoAPoster} reduce={reduce} />
                    <Clip src={legadoB} poster={legadoBPoster} reduce={reduce} />
                </div>
                <Cast list={LEGADO} tone="legado" />
            </section>

            <section className="rd-wrap rd-serie">
                <img className="rd-serie-peek rd-serie-peek--l rd-float rd-float--c" src={pip} alt="" aria-hidden="true" loading="lazy" decoding="async" />
                <div className="rd-serie-head">
                    <div>
                        <h2>Rokko</h2>
                        <p>{t('rd.anim.rokkoText')}</p>
                    </div>
                    <a className="rd-btn rd-btn--y" href={ROKKO_CHANNEL} target="_blank" rel="noopener noreferrer">{t('rd.anim.channel')} ↗</a>
                </div>
                <div className="rd-serie-media">
                    <RokkoStage />
                    <Clip src={rokkoA} poster={rokkoAPoster} reduce={reduce} />
                    <Clip src={rokkoB} poster={rokkoBPoster} reduce={reduce} />
                </div>
                <Cast list={ROKKO} tone="rokko" />
            </section>
        </div>
    );
};

export default Animation;
