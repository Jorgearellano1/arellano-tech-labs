import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../common/LanguageSwitcher';
import Logo from '../common/Logo';
import './Header.css';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { t } = useTranslation();
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
        document.body.classList.toggle('menu-open', isMobileMenuOpen);
        if (!isMobileMenuOpen) return undefined;
        const onKey = (e) => { if (e.key === 'Escape') setIsMobileMenuOpen(false); };
        const onResize = () => { if (window.innerWidth > 900) setIsMobileMenuOpen(false); };
        window.addEventListener('keydown', onKey);
        window.addEventListener('resize', onResize);
        return () => {
            document.body.style.overflow = '';
            document.body.classList.remove('menu-open');
            window.removeEventListener('keydown', onKey);
            window.removeEventListener('resize', onResize);
        };
    }, [isMobileMenuOpen]);

    const navLinks = [
        { path: '/#trabajo', label: t('nav.projects') },
        { path: '/animacion', label: t('rd.nav.animation') },
        { path: '/contacto', label: t('nav.contact') }
    ];

    const isActive = (path) => {
        if (path === '/') {
            return location.pathname === '/' && !location.hash;
        }
        if (path.startsWith('/#')) {
            return location.pathname === '/' && location.hash === path.slice(1);
        }
        return location.pathname.startsWith(path);
    };

    return (
        <>
        <header className={`header ${isScrolled ? 'scrolled' : ''} ${isMobileMenuOpen ? 'is-open' : ''}`}>
            <nav className="nav-container" role="navigation">
                {/* Logo y Marca */}
                <Link to="/" className="nav-brand" aria-label="AJM Technology" onClick={() => setIsMobileMenuOpen(false)}>
                    <Logo />
                </Link>

                {/* Desktop Navigation */}
                <ul className="nav-menu" role="menubar">
                    {navLinks.map(link => (
                        <li key={link.path} role="none">
                            <Link
                                to={link.path}
                                className={`nav-link ${isActive(link.path) ? 'active' : ''}`}
                                role="menuitem"
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Actions */}
                <div className="nav-actions">
                    <LanguageSwitcher />
                    <Link to="/contacto" className="nav-cta-btn">
                        {t('hero.cta')}
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label={t('nav.aria.toggleMenu')}
                    aria-expanded={isMobileMenuOpen}
                >
                    <span className="hamburger-line"></span>
                    <span className="hamburger-line"></span>
                </button>
            </nav>
        </header>

            {/* Menú móvil: fuera del header para que el desenfoque del header no lo recorte */}
            <div className={`mobile-menu ${isMobileMenuOpen ? 'active' : ''}`} aria-hidden={!isMobileMenuOpen}>
                <ul className="mobile-nav-links">
                    {navLinks.map((link, i) => (
                        <li key={link.path} style={{ '--i': i }}>
                            <Link
                                to={link.path}
                                className={`mobile-nav-link ${isActive(link.path) ? 'active' : ''}`}
                                onClick={() => setIsMobileMenuOpen(false)}
                                tabIndex={isMobileMenuOpen ? 0 : -1}
                            >
                                <span>{link.label}</span>
                                <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                            </Link>
                        </li>
                    ))}
                </ul>
                <Link
                    to="/contacto"
                    tabIndex={isMobileMenuOpen ? 0 : -1}
                    className="mobile-cta-btn"
                    onClick={() => setIsMobileMenuOpen(false)}
                >
                    {t('hero.cta')}
                </Link>
            </div>
        </>
    );
};

export default Header;
