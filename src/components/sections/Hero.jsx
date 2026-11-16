import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion as Motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import monitor from '../../assets/animacion/pc/monitor.webp';
import torre from '../../assets/animacion/pc/torre.webp';
import aspas from '../../assets/animacion/pc/aspas.webp';
import teclado from '../../assets/animacion/pc/teclado.webp';
import raton from '../../assets/animacion/pc/raton.webp';
import mesa from '../../assets/animacion/pc/mesa.webp';
import ventana from '../../assets/animacion/pc/ventana.webp';
import costa from '../../assets/animacion/pc/costa.webp';
import costaFrente from '../../assets/animacion/pc/costa-frente.webp';
import planta from '../../assets/animacion/pc/planta.webp';
import apolo from '../../assets/animacion/pc/apolo.webp';
import apoloFijo from '../../assets/animacion/pc/apolo-fijo.webp';
import plantaVap from '../../assets/projects/vap360/planta.webp';
import almacen from '../../assets/projects/vap360/almacen.webp';
import prenda from '../../assets/projects/vap360/prenda.webp';

const ease = [0.16, 1, 0.3, 1];
const spring = { type: 'spring', stiffness: 110, damping: 13 };

/**
 * Portada: el escritorio de AJM en perspectiva. La computadora se arma pieza por pieza, Apolo (el gato agente) atiende,
 * y por la ventana se ve la Costa Verde con el mar moviéndose. La escena gira un poco con el cursor.
 */
const Hero = () => {
    const { t } = useTranslation();
    const reduce = useReducedMotion();
    const mx = useMotionValue(0);
    const my = useMotionValue(0);
    const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-6, 6]), { stiffness: 60, damping: 16 });
    const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [4, -2]), { stiffness: 60, damping: 16 });

    useEffect(() => {
        if (reduce || !window.matchMedia('(pointer: fine)').matches) return undefined;
        const on = (e) => { mx.set(e.clientX / window.innerWidth - 0.5); my.set(e.clientY / window.innerHeight - 0.5); };
        window.addEventListener('pointermove', on, { passive: true });
        return () => window.removeEventListener('pointermove', on);
    }, [reduce, mx, my]);

    const part = (from, delay) => (reduce ? {} : { initial: { opacity: 0, ...from }, animate: { opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 }, transition: { ...spring, delay } });

    return (
        <section className="hm-hero">
            <div className="hm-hero-copy">
                <Motion.h1 {...(reduce ? {} : { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.9, ease } })}>{t('rd.home.h1')}</Motion.h1>
                <Motion.div {...(reduce ? {} : { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.9, ease, delay: 0.15 } })}>
                    <Link className="rd-btn rd-btn--y" to="/contacto">{t('hero.cta')}</Link>
                </Motion.div>
            </div>

            <div className="hm-room" aria-hidden="true">
                <Motion.div className="hm-scene" style={reduce ? undefined : { rotateX, rotateY }}>
                    <div className="hm-s hm-s-win">
                        <Motion.div {...part({ y: -80 }, 0.1)}>
                            <div className="hm-view">
                                <img src={costa} alt="" decoding="async" />
                                <span className="hm-wave hm-wave--a" /><span className="hm-wave hm-wave--b" /><span className="hm-wave hm-wave--c" />
                                <img src={costaFrente} alt="" decoding="async" />
                            </div>
                            <img className="hm-win-frame" src={ventana} alt="" />
                        </Motion.div>
                    </div>
                    <div className="hm-s hm-s-mesa"><Motion.img src={mesa} alt="" {...part({ y: 120 }, 0)} /></div>
                    <div className="hm-s hm-s-planta"><Motion.img src={planta} alt="" {...part({ y: -200, rotate: -12 }, 1.05)} /></div>
                    <div className="hm-s hm-s-torre">
                        <Motion.div {...part({ y: -260, rotate: 8 }, 0.3)}>
                            <img src={torre} alt="" />
                            <img className="hm-fan" src={aspas} alt="" />
                        </Motion.div>
                    </div>
                    <div className="hm-s hm-s-monitor">
                        <Motion.div {...part({ y: 140, scale: 0.8 }, 0.5)}>
                            <div className="hm-pc-screen">
                                <img src={plantaVap} alt="" decoding="async" fetchPriority="high" />
                                <img className="dv-cycle" src={almacen} alt="" decoding="async" />
                                <img className="dv-cycle" src={prenda} alt="" decoding="async" />
                                <span className="hm-pc-boot" />
                            </div>
                            <img className="hm-pc-frame" src={monitor} alt="" />
                        </Motion.div>
                    </div>
                    <div className="hm-s hm-s-apolo"><Motion.img src={reduce ? apoloFijo : apolo} alt="" {...part({ y: -220 }, 0.85)} /></div>
                    <div className="hm-s hm-s-teclado"><Motion.img src={teclado} alt="" {...part({ y: 160 }, 0.7)} /></div>
                    <div className="hm-s hm-s-raton"><Motion.img src={raton} alt="" {...part({ x: 160, rotate: 40 }, 0.95)} /></div>
                </Motion.div>
            </div>
        </section>
    );
};

export default Hero;
