import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Crew from './Crew';

/** Puerta a la rama Animación: título, botón y los dos repartos. */
const AnimationSection = () => {
    const { t } = useTranslation();
    return (
        <section className="hm-anim" id="animacion">
            <div className="hm-wrap hm-anim-head">
                <h2 className="hm-h2">{t('rd.anim.title')} <span>{t('rd.anim.titleAccent')}</span></h2>
                <div>
                    <p>{t('rd.anim.sub')}</p>
                    <Link className="rd-btn rd-btn--y" to="/animacion">{t('rd.anim.more')}</Link>
                </div>
            </div>
            <Crew />
        </section>
    );
};

export default AnimationSection;
