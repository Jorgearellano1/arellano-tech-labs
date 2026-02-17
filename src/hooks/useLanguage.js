import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export const useLanguage = () => {
    const { i18n } = useTranslation();

    useEffect(() => {
        // Update HTML lang attribute when language changes
        document.documentElement.lang = i18n.language;
    }, [i18n.language]);

    return { language: i18n.language, changeLanguage: i18n.changeLanguage };
};
