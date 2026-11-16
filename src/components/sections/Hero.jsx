import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion as Motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ParallaxScene, Layer } from '../common/Parallax';
import { Browser, Phone } from '../common/Devices';
import { clients } from '../../data/clients';
import planta from '../../assets/projects/vap360/planta.webp';
import almacen from '../../assets/projects/vap360/almacen.webp';
import prenda from '../../assets/projects/vap360/prenda.webp';
import movil from '../../assets/projects/vap360/movil.webp';

const ease = [0.16, 1, 0.3, 1];

/** Portada: un panel que ocupa toda la pantalla, con los sistemas reales en pantalla y las empresas principales al pie. */
const Hero = () => {
    const { t } = useTranslation();
    const reduce = useReducedMotion();
    const { scrollY } = useScroll();
    const scale = useTransform(scrollY, [0, 700], [1, 0.95]);
    const opacity = useTransform(scrollY, [0, 700], [1, 0.4]);
    const rise = (delay, y = 26) => (reduce ? {} : {
        initial: { opacity: 0, y }, animate: { opacity: 1, y: 0 }, transition: { duration: 1, ease, delay }
    });

    return (
        <section className="hm-cover">
            <Motion.div className="hm-cover-panel" style={reduce ? undefined : { scale, opacity }}>
                <div className="hm-cover-copy">
                    <Motion.h1 {...rise(0.05)}>
                        {t('rd.hero.line1')} <em>{t('rd.hero.accent')}</em> {t('rd.hero.rest')}
                    </Motion.h1>
                    <Motion.p {...rise(0.18)}>{t('rd.hero.sub')}</Motion.p>
                    <Motion.div className="hm-cover-cta" {...rise(0.28)}>
                        <a className="rd-btn rd-btn--y" href="#trabajo">{t('rd.hero.ctaProjects')}</a>
                        <Link className="rd-btn rd-btn--ghost" to="/animacion">{t('rd.hero.ctaAnim')}</Link>
                    </Motion.div>
                </div>

                <Motion.div className="hm-cover-stage" aria-hidden="true" {...rise(0.3, 60)}>
                    <ParallaxScene className="hm-devices">
                        <Layer depth={0.25} travel={0} className="hm-dev-laptop">
                            <Browser url="vap360">
                                <img src={planta} alt="" decoding="async" fetchPriority="high" />
                                <img className="dv-cycle" src={almacen} alt="" decoding="async" />
                                <img className="dv-cycle" src={prenda} alt="" decoding="async" />
                            </Browser>
                        </Layer>
                        <Layer depth={0.7} travel={0} className="hm-dev-phone">
                            <Phone><img src={movil} alt="" decoding="async" /></Phone>
                        </Layer>
                    </ParallaxScene>
                </Motion.div>

                <Motion.ul className="hm-cover-logos" {...rise(0.45, 14)}>
                    {clients.filter((c) => c.big).map((c) => (
                        <li key={c.id}>{c.logo ? <img src={c.logo} alt={c.name} decoding="async" /> : <b>{c.name}</b>}</li>
                    ))}
                </Motion.ul>
            </Motion.div>
        </section>
    );
};

export default Hero;
