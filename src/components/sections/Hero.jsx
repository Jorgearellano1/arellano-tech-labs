import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion as Motion, useReducedMotion } from 'framer-motion';
import Button from '../common/Button';
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
  const heroRef = useRef(null);
  const { t } = useTranslation();
  const reduce = useReducedMotion();

  return (
    <section ref={heroRef} className="hero">
      <div className="hero-content container">
        {reduce ? (
          <div className="hero-text">
            <h1 className="hero-title">
              {t('hero.prefix')}
              <br />
              <span className="hero-title-accent">software excepcional.</span>
            </h1>
            <p
              className="hero-description"
              dangerouslySetInnerHTML={{ __html: t('hero.subtitle') }}
            />
            <div className="hero-cta">
              <Button variant="primary" size="lg" to="/contacto">
                {t('hero.cta')}
              </Button>
            </div>
          </div>
        ) : (
          <Motion.div
            className="hero-text"
            variants={heroContainer}
            initial="hidden"
            animate="show"
          >
            <Motion.h1 className="hero-title" variants={heroItem}>
              {t('hero.prefix')}
              <br />
              <span className="hero-title-accent">software excepcional.</span>
            </Motion.h1>
            <Motion.p
              className="hero-description"
              variants={heroItem}
              dangerouslySetInnerHTML={{ __html: t('hero.subtitle') }}
            />
            <Motion.div className="hero-cta" variants={heroItem}>
              <Button variant="primary" size="lg" to="/contacto">
                {t('hero.cta')}
              </Button>
            </Motion.div>
          </Motion.div>
        )}
      </div>
    </section>
  );
};

export default Hero;
