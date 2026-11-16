import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Crew from './Crew';

/** Escena de la rama Animación en la home: cielo estrellado y los dos repartos. */
const AnimationSection = () => {
    const { t } = useTranslation();
    return (
        <section className="rd-sky rd-sky--scene" id="animacion">
            <div className="rd-sky-stars" aria-hidden="true" />
            <div className="rd-wrap rd-sky-head">
                <h2>{t('rd.anim.title')} <span>{t('rd.anim.titleAccent')}</span></h2>
                <Link className="rd-btn rd-btn--y" to="/animacion">{t('rd.anim.more')}</Link>
            </div>
            <Crew />
        </section>
    );
};

export default AnimationSection;
