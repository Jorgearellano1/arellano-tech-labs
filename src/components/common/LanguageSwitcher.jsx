import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LANGUAGES } from '../../i18n/languages';
import './LanguageSwitcher.css';

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();
    const [open, setOpen] = useState(false);
    const ref = useRef(null);
    const current = LANGUAGES.find(l => i18n.language?.startsWith(l.code)) || LANGUAGES[0];

    useEffect(() => {
        if (!open) return undefined;
        const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
        const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
        document.addEventListener('pointerdown', onDoc);
        document.addEventListener('keydown', onKey);
        return () => { document.removeEventListener('pointerdown', onDoc); document.removeEventListener('keydown', onKey); };
    }, [open]);

    const choose = (code) => { i18n.changeLanguage(code); setOpen(false); };

    return (
        <div className="language-switcher-wrap" ref={ref}>
            <button
                type="button"
                onClick={() => setOpen(o => !o)}
                className="language-switcher"
                aria-haspopup="listbox"
                aria-expanded={open}
                aria-label={current.name}
            >
                <span className="lang-text">{current.short}</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M6 9l6 6 6-6" /></svg>
            </button>
            {open && (
                <ul className="language-menu" role="listbox" aria-label="Language">
                    {LANGUAGES.map(l => (
                        <li key={l.code} role="option" aria-selected={l.code === current.code}>
                            <button type="button" className={`language-option ${l.code === current.code ? 'active' : ''}`} onClick={() => choose(l.code)} lang={l.code}>
                                <span className="language-option-code">{l.short}</span>
                                <span>{l.name}</span>
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default LanguageSwitcher;
