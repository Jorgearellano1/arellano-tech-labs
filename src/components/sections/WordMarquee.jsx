import { useTranslation } from 'react-i18next';

/** Cinta de palabras gigantes con lo que hace el estudio. */
const WordMarquee = () => {
    const { t } = useTranslation();
    const words = t('rd.marquee', { returnObjects: true });
    const list = Array.isArray(words) ? words : [];
    const row = (hidden) => list.map((w) => (
        <li key={`${w}-${hidden}`} aria-hidden={hidden || undefined}>{w}<i /></li>
    ));
    return (
        <div className="rd-words">
            <ul className="rd-words-track">{row(false)}{row(true)}</ul>
        </div>
    );
};

export default WordMarquee;
