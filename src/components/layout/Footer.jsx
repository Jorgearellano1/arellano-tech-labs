import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Footer.css';

const Footer = () => {
    const { t } = useTranslation();
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        servicios: [
            { label: t('services.web.title'), href: '#servicios' },
            { label: t('services.mobile.title'), href: '#servicios' },
            { label: t('services.ar.title'), href: '#servicios' },
            { label: t('services.enterprise.title'), href: '#servicios' }
        ],
        empresa: [
            { label: t('footer.company.about'), href: '/nosotros' },
            { label: t('footer.company.process'), href: '/#proceso' },
            { label: t('footer.company.contact'), href: '/contacto' }
        ]
    };

    const socialLinks = [
        {
            name: 'GitHub',
            href: 'https://github.com/Jorgearellano1',
            icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
            )
        }
    ];

    return (
        <footer className="footer">
            <div className="footer-content container">
                <div className="footer-top">
                    <div className="footer-brand">
                        <Link to="/" className="footer-logo">
                            <h3 className="logo-text">AJM</h3>
                            <span className="logo-text-secondary">TECHNOLOGY</span>
                        </Link>
                        <p className="footer-tagline">
                            {t('footer.tagline')}
                        </p>
                        <div className="footer-social">
                            {socialLinks.map(social => (
                                <a
                                    key={social.name}
                                    href={social.href}
                                    className="social-link"
                                    aria-label={social.name}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="footer-links-grid">
                        <div className="footer-links-column">
                            <h4 className="footer-column-title">{t('footer.services')}</h4>
                            <ul className="footer-links">
                                {footerLinks.servicios.map(link => (
                                    <li key={link.label}>
                                        <Link to={link.href} className="footer-link">
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="footer-links-column">
                            <h4 className="footer-column-title">{t('footer.company.title')}</h4>
                            <ul className="footer-links">
                                {footerLinks.empresa.map(link => (
                                    <li key={link.label}>
                                        <Link to={link.href} className="footer-link">
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="footer-links-column">
                            <h4 className="footer-column-title">{t('footer.contact')}</h4>
                            <ul className="footer-links">
                                <li>
                                    <a href="mailto:contacto@ajmptech.com" className="footer-link">
                                        contacto@ajmptech.com
                                    </a>
                                </li>
                                <li className="footer-address">
                                    {t('footer.address.city')}<br />
                                    {t('footer.address.country')}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p className="footer-copyright">
                        {t('footer.copyright', { year: currentYear })}
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
