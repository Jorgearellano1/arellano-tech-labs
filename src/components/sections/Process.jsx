import { useTranslation } from 'react-i18next';
import SectionMotion from '../common/SectionMotion';
import StaggerItem from '../common/StaggerItem';
import './Process.css';

const Process = () => {
    const { t } = useTranslation();

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
        <section className="section section-surface-alt process" id="proceso">
            <SectionMotion className="section-motion-inner">
                <div className="container">
                    <div className="section-header">
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
            </SectionMotion>
        </section>
    );
};

const ProcessStep = ({ step, index }) => (
    <StaggerItem className="process-step" index={index}>
        <div className="step-number-wrap">
            <span className="step-number">{step.number}</span>
        </div>
        <div className="step-content">
            <h3 className="step-title">{step.title}</h3>
            <p className="step-description">{step.description}</p>
        </div>
    </StaggerItem>
);

export default Process;
