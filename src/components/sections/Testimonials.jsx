import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import './Testimonials.css';

const Testimonials = () => {
    const { t } = useTranslation();
    const [titleRef, titleVisible] = useScrollReveal();
    const [currentIndex, setCurrentIndex] = useState(0);

    const testimonials = [
        {
            quote: t('testimonials.items.t1.quote'),
            author: t('testimonials.items.t1.author'),
            role: t('testimonials.items.t1.role'),
            company: t('testimonials.items.t1.company'),
            color: '#E8B547'
        },
        {
            quote: t('testimonials.items.t2.quote'),
            author: t('testimonials.items.t2.author'),
            role: t('testimonials.items.t2.role'),
            company: t('testimonials.items.t2.company'),
            color: '#F5C3D8'
        },
        {
            quote: t('testimonials.items.t3.quote'),
            author: t('testimonials.items.t3.author'),
            role: t('testimonials.items.t3.role'),
            company: t('testimonials.items.t3.company'),
            color: '#C4D7FF'
        },
        {
            quote: t('testimonials.items.t4.quote'),
            author: t('testimonials.items.t4.author'),
            role: t('testimonials.items.t4.role'),
            company: t('testimonials.items.t4.company'),
            color: '#4A7C59'
        }
    ];

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    return (
        <section className="section testimonials" id="testimonios">
            <div className="container">
                <div
                    ref={titleRef}
                    className={`section-header scroll-reveal ${titleVisible ? 'visible' : ''}`}
                >
                    <h2 className="section-title">
                        {t('testimonials.title')} <span className="gradient-text">{t('testimonials.titleAccent')}</span>
                    </h2>
                    <p className="section-subtitle">
                        {t('testimonials.subtitle')}
                    </p>
                </div>

                <div className="testimonials-carousel">
                    <button
                        className="carousel-btn carousel-btn-prev"
                        onClick={prevSlide}
                        aria-label="Previous testimonial"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>

                    <div className="testimonials-track">
                        {testimonials.map((testimonial, index) => (
                            <div
                                key={index}
                                className={`testimonial-card ${index === currentIndex ? 'active' : ''}`}
                                style={{
                                    '--accent-color': testimonial.color,
                                    transform: `translateX(${(index - currentIndex) * 110}%)`
                                }}
                            >
                                <div className="testimonial-quote">
                                    <svg className="quote-icon" width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                                    </svg>
                                    <p>{testimonial.quote}</p>
                                </div>
                                <div className="testimonial-author">
                                    <div className="author-avatar" style={{ background: testimonial.color }}>
                                        {testimonial.author.charAt(0)}
                                    </div>
                                    <div className="author-info">
                                        <h4 className="author-name">{testimonial.author}</h4>
                                        <p className="author-role">{testimonial.role}, {testimonial.company}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button
                        className="carousel-btn carousel-btn-next"
                        onClick={nextSlide}
                        aria-label="Next testimonial"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>

                <div className="carousel-dots">
                    {testimonials.map((_, index) => (
                        <button
                            key={index}
                            className={`dot ${index === currentIndex ? 'active' : ''}`}
                            onClick={() => setCurrentIndex(index)}
                            aria-label={`Go to testimonial ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
