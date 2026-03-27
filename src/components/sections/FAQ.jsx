import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SectionMotion from '../common/SectionMotion';
import StaggerItem from '../common/StaggerItem';
import './FAQ.css';

const FAQ = () => {
    const { t } = useTranslation();
    const [openIndex, setOpenIndex] = useState(null);

    const faqs = [
        {
            question: t('faq.items.time.question'),
            answer: t('faq.items.time.answer')
        },
        {
            question: t('faq.items.pricing.question'),
            answer: t('faq.items.pricing.answer')
        },
        {
            question: t('faq.items.support.question'),
            answer: t('faq.items.support.answer')
        },
        {
            question: t('faq.items.startups.question'),
            answer: t('faq.items.startups.answer')
        },
        {
            question: t('faq.items.quality.question'),
            answer: t('faq.items.quality.answer')
        },
        {
            question: t('faq.items.progress.question'),
            answer: t('faq.items.progress.answer')
        }
    ];

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="section section-surface-alt faq" id="faq">
            <SectionMotion className="section-motion-inner">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">
                            {t('faq.title')} <span className="gradient-text">{t('faq.titleAccent')}</span>
                        </h2>
                        <p className="section-subtitle">
                            {t('faq.subtitle')}
                        </p>
                    </div>

                    <div className="faq-list">
                        {faqs.map((faq, index) => (
                            <FAQItem
                                key={index}
                                faq={faq}
                                index={index}
                                isOpen={openIndex === index}
                                onToggle={() => toggleFAQ(index)}
                            />
                        ))}
                    </div>
                </div>
            </SectionMotion>
        </section>
    );
};

const FAQItem = ({ faq, index, isOpen, onToggle }) => (
    <StaggerItem className={`faq-item ${isOpen ? 'open' : ''}`} index={index}>
        <button
            type="button"
            className="faq-question"
            onClick={onToggle}
            aria-expanded={isOpen}
        >
            <span className="faq-question-text">{faq.question}</span>
            <svg
                className="faq-icon"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
            >
                <path
                    d="M12 5V19M5 12H19"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </button>
        <div className="faq-answer">
            <p>{faq.answer}</p>
        </div>
    </StaggerItem>
);

export default FAQ;
