import { useTranslation } from 'react-i18next';
import { clients } from '../../data/clients';

/** Franja de logos a color que se desplaza de izquierda a derecha. */
const ClientLogos = () => {
    const { t } = useTranslation();
    const row = (hidden) => clients.map((c) => (
        <li key={`${c.id}-${hidden}`} aria-hidden={hidden || undefined}>
            {c.logo ? <img src={c.logo} alt={hidden ? '' : c.name} decoding="async" /> : <b>{c.name}</b>}
        </li>
    ));
    return (
        <section className="hm-band" aria-label={t('rd.clients.title')}>
            <ul className="hm-band-track">{row(false)}{row(true)}</ul>
        </section>
    );
};

export default ClientLogos;
