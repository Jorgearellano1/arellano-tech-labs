import { useTranslation } from 'react-i18next';
import { clients } from '../../data/clients';

const Tile = ({ c }) => {
    const inner = c.logo ? <img src={c.logo} alt={c.name} loading="lazy" decoding="async" /> : <b>{c.name}</b>;
    return (
        <li className={c.big ? 'is-big' : undefined}>
            {c.url
                ? <a href={c.url} target="_blank" rel="noopener noreferrer" aria-label={c.name}>{inner}</a>
                : <span>{inner}</span>}
        </li>
    );
};

/** Logos de las empresas y productos: las cuatro principales arriba, el resto debajo. Sin movimiento. */
const ClientLogos = () => {
    const { t } = useTranslation();
    return (
        <section className="hm-clients" aria-label={t('rd.clients.title')}>
            <div className="hm-wrap">
                <p className="hm-kicker">{t('rd.clients.title')}</p>
                <ul className="hm-clients-grid">
                    {clients.map((c) => <Tile key={c.name} c={c} />)}
                </ul>
            </div>
        </section>
    );
};

export default ClientLogos;
