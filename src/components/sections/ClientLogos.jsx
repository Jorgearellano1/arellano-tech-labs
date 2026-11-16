import { useTranslation } from 'react-i18next';
import { clients } from '../../data/clients';

const Item = ({ c, hidden }) => (
    <li aria-hidden={hidden || undefined}>
        {c.url && !hidden ? (
            <a href={c.url} target="_blank" rel="noopener noreferrer" aria-label={c.name}>
                <img src={c.logo} alt={c.name} loading="lazy" decoding="async" />
            </a>
        ) : (
            <span><img src={c.logo} alt={hidden ? '' : c.name} loading="lazy" decoding="async" /></span>
        )}
    </li>
);

/** Franja de logos en movimiento continuo; se detiene al pasar el cursor. */
const ClientLogos = () => {
    const { t } = useTranslation();
    return (
        <section className="rd-clients rd-night" aria-label={t('rd.clients.title')}>
            <p className="rd-clients-title">{t('rd.clients.title')}</p>
            <div className="rd-marquee">
                <ul className="rd-marquee-track">
                    {clients.map((c) => <Item key={c.name} c={c} />)}
                    {clients.map((c) => <Item key={`${c.name}-2`} c={c} hidden />)}
                </ul>
            </div>
        </section>
    );
};

export default ClientLogos;
