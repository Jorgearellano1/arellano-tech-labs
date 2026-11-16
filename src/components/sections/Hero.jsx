import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion as Motion, useReducedMotion } from 'framer-motion';
import { ParallaxScene, Layer } from '../common/Parallax';
import monitor from '../../assets/animacion/pc/monitor.webp';
import torre from '../../assets/animacion/pc/torre.webp';
import teclado from '../../assets/animacion/pc/teclado.webp';
import raton from '../../assets/animacion/pc/raton.webp';
import planta from '../../assets/projects/vap360/planta.webp';
import almacen from '../../assets/projects/vap360/almacen.webp';
import prenda from '../../assets/projects/vap360/prenda.webp';

const ease = [0.16, 1, 0.3, 1];
const spring = { type: 'spring', stiffness: 110, damping: 13 };

/** Portada: una computadora que se arma pieza por pieza y enciende con los sistemas reales en pantalla. */
const Hero = () => {
    const { t } = useTranslation();
    const reduce = useReducedMotion();
    const part = (from, delay) => (reduce ? {} : { initial: { opacity: 0, ...from }, animate: { opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 }, transition: { ...spring, delay } });

    return (
        <section className="hm-hero">
            <div className="hm-hero-copy">
                <Motion.h1 {...(reduce ? {} : { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.9, ease } })}>{t('rd.home.h1')}</Motion.h1>
                <Motion.div {...(reduce ? {} : { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.9, ease, delay: 0.15 } })}>
                    <Link className="rd-btn rd-btn--y" to="/contacto">{t('hero.cta')}</Link>
                </Motion.div>
            </div>

            <ParallaxScene className="hm-pc" aria-hidden="true">
                <Layer depth={0.2} travel={0} className="hm-pc-torre"><Motion.img src={torre} alt="" {...part({ y: -260, rotate: 8 }, 0.25)} /></Layer>
                <Layer depth={0.35} travel={0} className="hm-pc-monitor">
                    <Motion.div {...part({ y: 140, scale: 0.8 }, 0.45)}>
                        <div className="hm-pc-screen">
                            <img src={planta} alt="" decoding="async" fetchPriority="high" />
                            <img className="dv-cycle" src={almacen} alt="" decoding="async" />
                            <img className="dv-cycle" src={prenda} alt="" decoding="async" />
                            <span className="hm-pc-boot" />
                        </div>
                        <img className="hm-pc-frame" src={monitor} alt="" />
                    </Motion.div>
                </Layer>
                <Layer depth={0.6} travel={0} className="hm-pc-teclado"><Motion.img src={teclado} alt="" {...part({ y: 200 }, 0.7)} /></Layer>
                <Layer depth={0.8} travel={0} className="hm-pc-raton"><Motion.img src={raton} alt="" {...part({ x: 200, rotate: 40 }, 0.9)} /></Layer>
            </ParallaxScene>
        </section>
    );
};

export default Hero;
