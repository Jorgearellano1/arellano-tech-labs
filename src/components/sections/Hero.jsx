import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion as Motion, useReducedMotion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import Button from '../common/Button';
import { openLab } from '../lab/openLab';
import './Hero.css';

const heroContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.14, delayChildren: 0.06 },
  },
};

const heroItem = {
  hidden: { opacity: 0, y: 36 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

/** Capas decorativas con profundidad: scroll + puntero. */
const ParallaxLayers = ({ scrollY, mx, my }) => {
  const y1 = useTransform(scrollY, [0, 600], [0, 140]);
  const y2 = useTransform(scrollY, [0, 600], [0, 90]);
  const y3 = useTransform(scrollY, [0, 600], [0, 220]);
  const x1 = useTransform(mx, [-1, 1], [-28, 28]);
  const x2 = useTransform(mx, [-1, 1], [18, -18]);
  const x3 = useTransform(mx, [-1, 1], [-12, 12]);
  const py1 = useTransform(my, [-1, 1], [-18, 18]);
  const py2 = useTransform(my, [-1, 1], [12, -12]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <div className="hero-layers" aria-hidden>
      <Motion.span className="hero-layer hero-layer--ring" style={{ y: y1, x: x1, translateY: py1, opacity }} />
      <Motion.span className="hero-layer hero-layer--blob" style={{ y: y2, x: x2, translateY: py2, opacity }} />
      <Motion.span className="hero-layer hero-layer--grid" style={{ y: y3, x: x3, opacity }} />
      <Motion.span className="hero-layer hero-layer--dot hero-layer--dot-a" style={{ y: y2, x: x3, opacity }} />
      <Motion.span className="hero-layer hero-layer--dot hero-layer--dot-b" style={{ y: y1, x: x2, opacity }} />
    </div>
  );
};

const Hero = () => {
  const heroRef = useRef(null);
  const { t } = useTranslation();
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const mx = useSpring(rawX, { stiffness: 60, damping: 18 });
  const my = useSpring(rawY, { stiffness: 60, damping: 18 });

  const onMove = (e) => {
    if (reduce) return;
    const r = heroRef.current?.getBoundingClientRect();
    if (!r) return;
    rawX.set(((e.clientX - r.left) / r.width) * 2 - 1);
    rawY.set(((e.clientY - r.top) / r.height) * 2 - 1);
  };

  const content = (
    <>
      <h1 className="hero-title">
        {t('hero.prefix')}
        <br />
        <span className="hero-title-accent">{t('hero.accent')}</span>
      </h1>
      <p className="hero-description" dangerouslySetInnerHTML={{ __html: t('hero.subtitle') }} />
      <div className="hero-cta">
        <Button variant="primary" size="lg" to="/contacto">{t('hero.cta')}</Button>
        <button type="button" className="btn btn-outline btn-lg" onClick={() => openLab('web')}>{t('hero.tryLab')}</button>
      </div>
    </>
  );

  return (
    <section ref={heroRef} className="hero" onPointerMove={onMove} onPointerLeave={() => { rawX.set(0); rawY.set(0); }}>
      {!reduce && <ParallaxLayers scrollY={scrollY} mx={mx} my={my} />}
      <div className="hero-content container">
        {reduce ? (
          <div className="hero-text">{content}</div>
        ) : (
          <Motion.div className="hero-text" variants={heroContainer} initial="hidden" animate="show">
            <Motion.div variants={heroItem} className="hero-text-inner">{content}</Motion.div>
          </Motion.div>
        )}
      </div>
    </section>
  );
};

export default Hero;
