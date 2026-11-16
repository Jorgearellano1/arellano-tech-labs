import { useTranslation } from 'react-i18next';
import { clients } from '../../data/clients';

/** Nube de logos, todos en blanco y del mismo peso visual. Sin movimiento. */
const ClientLogos = () => {
    const { t } = useTranslation();
    return (
        <section className="hm-clients" aria-label={t('rd.clients.title')}>
            <div className="hm-wrap">
                <p className="hm-kicker">{t('rd.clients.title')}</p>
                <ul className="hm-cloud">
                    {clients.map((c) => {
                        const inner = c.logo ? <img src={c.logo} alt={c.name} loading="lazy" decoding="async" /> : <b>{c.name}</b>;
                        return (
                            <li key={c.id}>
                                {c.url ? <a href={c.url} target="_blank" rel="noopener noreferrer" aria-label={c.name}>{inner}</a> : <span>{inner}</span>}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </section>
    );
};

export default ClientLogos;
