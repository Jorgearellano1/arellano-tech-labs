import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SectionMotion from '../common/SectionMotion';
import StaggerItem from '../common/StaggerItem';
import './WhyUs.css';

const iconProps = { width: 34, height: 34, viewBox: '0 0 24 24', fill: 'none', 'aria-hidden': true };
const ICONS = {
  results: <svg {...iconProps}><path d="M3 3v18h18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /><path d="M7 16l4-4 3 3 5-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  speed: <svg {...iconProps}><path d="M13 2L3 14h8l-1 8 10-12h-8l1-8z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  stack: <svg {...iconProps}><path d="M12 2L2 7l10 5 10-5-10-5z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /><path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  support: <svg {...iconProps}><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" /><path d="M8 12l2.5 2.5L16 9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
};

const REASONS = [
  { id: 'results', stat: '+40%', statKey: 'whyUs.stats.results' },
  { id: 'speed', stat: '4–6', statKey: 'whyUs.stats.speed' },
  { id: 'stack', stat: '100%', statKey: 'whyUs.stats.stack' },
  { id: 'support', stat: '24/7', statKey: 'whyUs.stats.support' }
];

/** Tarjeta que gira (rotateY) para mostrar el detalle en el reverso. */
const FlipCard = ({ reason, index, t }) => {
  const [flipped, setFlipped] = useState(false);
  const toggle = () => setFlipped(f => !f);

  return (
    <StaggerItem className="flip-card" index={index}>
      <button
        type="button"
        className={`flip-inner ${flipped ? 'is-flipped' : ''}`}
        onClick={toggle}
        aria-pressed={flipped}
        aria-label={`${t(`whyUs.reasons.${reason.id}.title`)}. ${t('whyUs.flipHint')}`}
      >
        <span className="flip-face flip-front">
          <span className="flip-icon">{ICONS[reason.id]}</span>
          <span className="flip-stat">{reason.stat}</span>
          <span className="flip-stat-label">{t(reason.statKey)}</span>
          <span className="flip-title">{t(`whyUs.reasons.${reason.id}.title`)}</span>
          <span className="flip-cue" aria-hidden>↻</span>
        </span>
        <span className="flip-face flip-back">
          <span className="flip-back-kicker">{t(`whyUs.reasons.${reason.id}.title`)}</span>
          <span className="flip-back-text">{t(`whyUs.reasons.${reason.id}.description`)}</span>
          <span className="flip-cue" aria-hidden>↺</span>
        </span>
      </button>
    </StaggerItem>
  );
};

const WhyUs = () => {
  const { t } = useTranslation();
  return (
    <section className="section section-surface why-us" id="por-que-nosotros">
      <SectionMotion className="section-motion-inner">
        <div className="container container--wide">
          <div className="section-header">
            <h2 className="section-title">
              {t('whyUs.title')} <span className="gradient-text">{t('whyUs.titleAccent')}</span>
            </h2>
            <p className="section-subtitle">{t('whyUs.subtitle')}</p>
          </div>
          <div className="flip-grid">
            {REASONS.map((r, i) => <FlipCard key={r.id} reason={r} index={i} t={t} />)}
          </div>
          <p className="flip-hint">{t('whyUs.flipHint')}</p>
        </div>
      </SectionMotion>
    </section>
  );
};

export default WhyUs;
