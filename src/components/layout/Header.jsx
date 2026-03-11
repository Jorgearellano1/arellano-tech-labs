import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../common/LanguageSwitcher';
import useTheme from '../../hooks/useTheme';
import logoLight from '../../assets/logo-light.png';
import logoDark from '../../assets/logo-dark.png';
import './Header.css';

const Header = () => {
    const { theme, toggleTheme } = useTheme();
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
        setIsMobileMenuOpen(false);
    }, [location]);

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }, [isMobileMenuOpen]);

    const navLinks = [
        { path: '/', label: t('nav.home') },
        { path: '/contacto', label: t('nav.contact') }
    ];

    const isActive = (path) => {
        if (path === '/') {
            return location.pathname === '/';
        }
        return location.pathname.startsWith(path);
    };

    return (
        <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
            <nav className="nav-container" role="navigation">
                {/* Logo y Marca */}
                <Link to="/" className="nav-brand">
                    <div className="brand-logo">
                        <img
                            src={theme === 'dark' ? logoDark : logoLight}
                            alt="AJM Technology Logo"
                            className="logo-image"
                        />
                    </div>
                    <div className="brand-text">
                        <h2 className="brand-name">AJM</h2>
                        <p className="brand-tagline">TECHNOLOGY</p>
                    </div>
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
                    <button
                        onClick={toggleTheme}
                        className="theme-toggle"
                        aria-label="Toggle Dark Mode"
                        title={theme === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}
                    >
                        {theme === 'dark' ? (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="5" />
                                <line x1="12" y1="1" x2="12" y2="3" />
                                <line x1="12" y1="21" x2="12" y2="23" />
                                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                                <line x1="1" y1="12" x2="3" y2="12" />
                                <line x1="21" y1="12" x2="23" y2="12" />
                                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                            </svg>
                        ) : (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                            </svg>
                        )}
                    </button>
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
                    <span className="hamburger-line"></span>
                </button>
            </nav>

            {/* Mobile Menu Overlay */}
            <div
                className={`menu-overlay ${isMobileMenuOpen ? 'active' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Mobile Menu */}
            <div className={`mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}>
                <ul className="mobile-nav-links">
                    {navLinks.map(link => (
                        <li key={link.path}>
                            <Link
                                to={link.path}
                                className={`mobile-nav-link ${isActive(link.path) ? 'active' : ''}`}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>
                <Link
                    to="/contacto"
                    className="mobile-cta-btn"
                    onClick={() => setIsMobileMenuOpen(false)}
                >
                    {t('hero.cta')}
                </Link>
            </div>
        </header>
    );
};

export default Header;
