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
        return () => { document.body.style.overflow = ''; };
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
        <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
            <nav className="nav-container" role="navigation">
                {/* Logo y Marca */}
                <Link to="/" className="nav-brand" aria-label="AJM Technology">
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
