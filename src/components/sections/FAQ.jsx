import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import './FAQ.css';

const FAQ = () => {
    const { t } = useTranslation();
    const [titleRef, titleVisible] = useScrollReveal();
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
        <section className="section faq" id="faq">
            <div className="container">
                <div
                    ref={titleRef}
                    className={`section-header scroll-reveal ${titleVisible ? 'visible' : ''}`}
                >
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
        </section>
    );
};

const FAQItem = ({ faq, index, isOpen, onToggle }) => {
    const [itemRef, itemVisible] = useScrollReveal({ threshold: 0.2 });

    return (
        <div
            ref={itemRef}
            className={`faq-item scroll-reveal ${itemVisible ? 'visible' : ''} ${isOpen ? 'open' : ''}`}
            style={{ transitionDelay: `${index * 50}ms` }}
        >
            <button className="faq-question" onClick={onToggle}>
                <span>{faq.question}</span>
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
        </div>
    );
};

export default FAQ;
