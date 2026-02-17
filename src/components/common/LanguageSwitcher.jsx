import { useTranslation } from 'react-i18next';
import './LanguageSwitcher.css';

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();

    const toggleLanguage = () => {
        const newLang = i18n.language === 'en' ? 'es' : 'en';
        i18n.changeLanguage(newLang);
    };

    return (
        <button
            onClick={toggleLanguage}
            className="language-switcher discord-hover-lift"
            aria-label="Switch language"
        >
            <span className="lang-text">{i18n.language === 'en' ? 'ES' : 'EN'}</span>
        </button>
    );
};

export default LanguageSwitcher;
