import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import Button from '../components/common/Button';
import './Contact.css';

const WEB3FORMS_KEY = 'ad1fcc1f-a52d-46c9-871f-e84fa7193e31';

const Contact = () => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const data = new FormData();
            data.append('access_key', WEB3FORMS_KEY);
            data.append('name', formData.name);
            data.append('email', formData.email);
            data.append('message', formData.message);
            data.append('subject', `Contacto Web - ${formData.name}`);

            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: data
            });

            const result = await response.json();

            if (response.ok) {
                toast.success(t('contactPage.form.success'));
                setFormData({ name: '', email: '', message: '' });
            } else {
                toast.error(result.message || 'Error al enviar el mensaje.');
            }
        } catch (error) {
            toast.error('Error al enviar el mensaje. Intenta de nuevo.');
            console.error('Web3Forms error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const fadeInUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    return (
        <div className="contact-page-minimal">
            <div className="aurora-background-subtle">
                <div className="aurora-blob-subtle blob-1"></div>
                <div className="aurora-blob-subtle blob-2"></div>
            </div>

            <div className="container relative z-10">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={fadeInUp}
                    className="contact-header-minimal"
                >
                    <h1 className="contact-title-minimal">
                        {t('contactPage.title')} <span className="text-gradient">{t('contactPage.titleAccent')}</span>
                    </h1>
                    <p className="contact-subtitle-minimal">
                        {t('contactPage.subtitle')}
                    </p>
                </motion.div>

                <div className="contact-layout-minimal">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="contact-info-minimal"
                    >
                        <div className="info-item-minimal">
                            <span className="info-label">{t('contactPage.form.email')}</span>
                            <a href="mailto:contacto@ajmptech.com" className="info-value">contacto@ajmptech.com</a>
                        </div>
                        <div className="info-item-minimal">
                            <span className="info-label">{t('contactPage.info.call.title')}</span>
                            <a href="tel:+51989147467" className="info-value">+51 989 147 467</a>
                        </div>
                        <div className="info-item-minimal">
                            <span className="info-label">{t('footer.address.country')}</span>
                            <p className="info-value">Lima, Perú</p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="contact-form-minimal-wrapper"
                    >
                        <form onSubmit={handleSubmit} className="contact-form-minimal">
                            <div className="form-group-minimal">
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    placeholder={t('contactPage.form.namePlaceholder')}
                                    className="minimal-input"
                                />
                            </div>
                            <div className="form-group-minimal">
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    placeholder={t('contactPage.form.emailPlaceholder')}
                                    className="minimal-input"
                                />
                            </div>
                            <div className="form-group-minimal">
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows="4"
                                    placeholder={t('contactPage.form.messagePlaceholder')}
                                    className="minimal-input textarea"
                                />
                            </div>
                            <div className="form-action">
                                <Button type="submit" variant="primary" size="lg" fullWidth>
                                    {t('contactPage.form.submit')}
                                </Button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
