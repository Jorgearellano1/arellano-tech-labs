import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

/** Cierre de la home: llamada a contacto. */
const Outro = () => {
    const { t } = useTranslation();
    return (
        <section className="hm-outro">
            <div className="hm-wrap">
                <div className="hm-outro-panel">
                    <h2>{t('rd.outro.title')}</h2>
                    <div>
                        <Link className="rd-btn" to="/contacto">{t('hero.cta')}</Link>
                        <span>contacto@ajmptech.com</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Outro;
