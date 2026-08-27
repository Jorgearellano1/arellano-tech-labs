import { useTranslation } from 'react-i18next';
import { motion as Motion, useReducedMotion } from 'framer-motion';
import Button from '../common/Button';
import HeroVideo from './HeroVideo';
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

const Hero = () => {
  const { t } = useTranslation();
  const reduce = useReducedMotion();

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
    <section className="hero">
      <HeroVideo />
      <div className="hero-veil" aria-hidden />
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
