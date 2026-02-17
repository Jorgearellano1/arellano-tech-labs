import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useScroll, useTransform } from 'framer-motion';
import AnimatedCounter from '../components/common/AnimatedCounter';
import './About.css';

const About = () => {
    const { t } = useTranslation();
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, 200]);

    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
    };

    const staggerContainer = {
        visible: { transition: { staggerChildren: 0.1 } }
    };

    return (
        <div className="about-page" ref={containerRef}>
            {/* Aurora Background (Koi Theme - Softer) */}
            <div className="koi-background">
                <div className="koi-blob blob-1"></div>
                <div className="koi-blob blob-2"></div>
                <div className="koi-blob blob-3"></div>
            </div>

            <section className="about-hero relative z-10">
                <div className="container">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                        className="hero-content-centered"
                    >
                        <h1 className="about-title-minimal">
                            {t('about.pageTitle')} <span className="text-gradient-water">{t('about.pageTitleAccent')}</span>
                        </h1>
                        <motion.p
                            variants={fadeInUp}
                            className="about-subtitle-minimal"
                        >
                            {t('about.subtitle')}
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            <section className="about-content relative z-10">
                <div className="container">
                    {/* Mission Section - Asymmetrical */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={fadeInUp}
                        className="mission-section"
                    >
                        <div className="mission-text">
                            <h2 className="section-heading-minimal">{t('about.missionTitle')}</h2>
                            <p className="text-body-large">{t('about.missionText')}</p>
                        </div>
                        <div className="mission-visual">
                            {/* Abstract Visual or just bold typography */}
                            <div className="abstract-circle"></div>
                        </div>
                    </motion.div>

                    {/* Values Grid - Clean & Glass */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="values-grid-minimal"
                    >
                        {[
                            { title: 'about.qualityTitle', text: 'about.qualityText', icon: '✦' },
                            { title: 'about.transparencyTitle', text: 'about.transparencyText', icon: '◎' },
                            { title: 'about.resultsTitle', text: 'about.resultsText', icon: '↗' },
                            { title: 'about.partnerTitle', text: 'about.partnerText', icon: '∞' }
                        ].map((item, index) => (
                            <motion.div key={index} variants={fadeInUp} className="value-card-minimal">
                                <span className="value-icon">{item.icon}</span>
                                <h3>{t(item.title)}</h3>
                                <p>{t(item.text)}</p>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Stats - Floating */}
                    <div className="stats-container-minimal">
                        <div className="stats-row">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6 }}
                                className="stat-item-minimal"
                            >
                                <div className="stat-number-minimal">
                                    <AnimatedCounter end={50} suffix="+" duration={2.5} />
                                </div>
                                <div className="stat-label-minimal">{t('about.projectsDelivered')}</div>
                            </motion.div>

                            <div className="divider-vertical-stat"></div>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                className="stat-item-minimal"
                            >
                                <div className="stat-number-minimal">
                                    <AnimatedCounter end={15} suffix="+" duration={2.5} />
                                </div>
                                <div className="stat-label-minimal">{t('about.activeClients')}</div>
                            </motion.div>

                            <div className="divider-vertical-stat"></div>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="stat-item-minimal"
                            >
                                <div className="stat-number-minimal">
                                    <AnimatedCounter end={99} suffix="%" duration={2.5} />
                                </div>
                                <div className="stat-label-minimal">{t('about.uptimeSLA')}</div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
