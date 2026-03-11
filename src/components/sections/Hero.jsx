import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '../common/Button';
import heroImage from '../../assets/hero-illustration.png';
import './Hero.css';

const Hero = () => {
    const heroRef = useRef(null);
    const { t } = useTranslation();

    return (
        <section ref={heroRef} className="hero">
            <div className="hero-content container">
                <div className="hero-text">
                    <h1 className="hero-title fade-in-up">
                        {t('hero.prefix')}<br />
                        <span className="hero-title-accent">software excepcional.</span>
                    </h1>

                    <p
                        className="hero-description fade-in-up delay-1"
                        dangerouslySetInnerHTML={{ __html: t('hero.subtitle') }}
                    />

                    <div className="hero-cta fade-in-up delay-2">
                        <Button variant="primary" size="lg" to="/contacto">
                            {t('hero.cta')}
                        </Button>
                    </div>
                </div>

                <div className="hero-visual fade-in-up delay-1">
                    <div className="hero-illustration">
                        <img
                            src={heroImage}
                            alt="AJM Technology - Software Development Illustration"
                            className="hero-image"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
