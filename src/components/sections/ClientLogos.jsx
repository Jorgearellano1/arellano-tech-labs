import { useTranslation } from 'react-i18next';
import { clients } from '../../data/clients';

const ClientLogos = () => {
    const { t } = useTranslation();
    return (
        <section className="rd-clients" aria-label={t('rd.clients.title')}>
            <div className="rd-wrap">
                <p className="rd-clients-title">{t('rd.clients.title')}</p>
                <ul className="rd-clients-grid">
                    {clients.map((c) => (
                        <li key={c.name}>
                            {c.url ? (
                                <a href={c.url} target="_blank" rel="noopener noreferrer" aria-label={c.name}>
                                    <img src={c.logo} alt={c.name} loading="lazy" decoding="async" />
                                </a>
                            ) : (
                                <span><img src={c.logo} alt={c.name} loading="lazy" decoding="async" /></span>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default ClientLogos;
