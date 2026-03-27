import { useTranslation } from 'react-i18next';
import SectionMotion from '../common/SectionMotion';
import StaggerItem from '../common/StaggerItem';
import './WhyUs.css';

const iconProps = { width: 28, height: 28, viewBox: '0 0 24 24', fill: 'none', 'aria-hidden': true };

const IconChart = () => (
  <svg {...iconProps}>
    <path d="M3 3v18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M7 16l4-4 3 3 5-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconBolt = () => (
  <svg {...iconProps}>
    <path d="M13 2L3 14h8l-1 8 10-12h-8l1-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconStack = () => (
  <svg {...iconProps}>
    <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconSupport = () => (
  <svg {...iconProps}>
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
    <path d="M8 12l2.5 2.5L16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const WhyUs = () => {
  const { t } = useTranslation();

  const reasons = [
    {
      icon: <IconChart />,
      title: t('whyUs.reasons.results.title'),
      description: t('whyUs.reasons.results.description'),
      stat: '+40%',
      statLabel: 'KPIs',
    },
    {
      icon: <IconBolt />,
      title: t('whyUs.reasons.speed.title'),
      description: t('whyUs.reasons.speed.description'),
      stat: '4-6',
      statLabel: t('whyUs.weeks'),
    },
    {
      icon: <IconStack />,
      title: t('whyUs.reasons.stack.title'),
      description: t('whyUs.reasons.stack.description'),
      stat: '100%',
      statLabel: 'Modern',
    },
    {
      icon: <IconSupport />,
      title: t('whyUs.reasons.support.title'),
      description: t('whyUs.reasons.support.description'),
      stat: '24/7',
      statLabel: 'Support',
    },
  ];

  return (
    <section className="section section-surface why-us" id="por-que-nosotros">
      <SectionMotion className="section-motion-inner">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              {t('whyUs.title')} <span className="gradient-text">{t('whyUs.titleAccent')}</span>
            </h2>
            <p className="section-subtitle">{t('whyUs.subtitle')}</p>
          </div>

          <div className="reasons-grid">
            {reasons.map((reason, index) => (
              <ReasonCard key={index} reason={reason} index={index} />
            ))}
          </div>
        </div>
      </SectionMotion>
    </section>
  );
};

const ReasonCard = ({ reason, index }) => (
  <StaggerItem className="reason-card" index={index}>
    <div className="reason-icon-wrap">{reason.icon}</div>
    <div className="reason-stat">
      <span className="stat-value">{reason.stat}</span>
      <span className="stat-label">{reason.statLabel}</span>
    </div>
    <div className="reason-content">
      <h3 className="reason-title">{reason.title}</h3>
      <p className="reason-description">{reason.description}</p>
    </div>
  </StaggerItem>
);

export default WhyUs;
