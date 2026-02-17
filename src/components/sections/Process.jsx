import { useTranslation } from 'react-i18next';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import './Process.css';

const Process = () => {
    const { t } = useTranslation();
    const [titleRef, titleVisible] = useScrollReveal();

    const steps = [
        {
            number: '01',
            title: t('process.steps.discovery.title'),
            description: t('process.steps.discovery.description')
        },
        {
            number: '02',
            title: t('process.steps.strategy.title'),
            description: t('process.steps.strategy.description')
        },
        {
            number: '03',
            title: t('process.steps.development.title'),
            description: t('process.steps.development.description')
        },
        {
            number: '04',
            title: t('process.steps.launch.title'),
            description: t('process.steps.launch.description')
        }
    ];

    return (
        <section className="section process" id="proceso">
            <div className="container">
                <div
                    ref={titleRef}
                    className={`section-header scroll-reveal ${titleVisible ? 'visible' : ''}`}
                >
                    <h2 className="section-title">
                        {t('process.title')} <span className="gradient-text">{t('process.titleAccent')}</span>
                    </h2>
                    <p className="section-subtitle">
                        {t('process.subtitle')}
                    </p>
                </div>

                <div className="process-timeline">
                    {steps.map((step, index) => (
                        <ProcessStep key={index} step={step} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

const ProcessStep = ({ step, index }) => {
    const [stepRef, stepVisible] = useScrollReveal({ threshold: 0.3 });

    return (
        <div
            ref={stepRef}
            className={`process-step scroll-reveal ${stepVisible ? 'visible' : ''}`}
            style={{ transitionDelay: `${index * 150}ms` }}
        >
            <div className="step-number">{step.number}</div>
            <div className="step-content">
                <h3 className="step-title">{step.title}</h3>
                <p className="step-description">{step.description}</p>
            </div>
            {index < 3 && <div className="step-connector" />}
        </div>
    );
};

export default Process;
