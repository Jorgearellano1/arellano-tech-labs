import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Crew from './Crew';

/** Puerta a la rama Animación desde la home, con los personajes de las dos series. */
const AnimationSection = () => {
    const { t } = useTranslation();
    return (
        <section className="rd-crew-sec" id="animacion">
            <div className="rd-wrap rd-crew-head">
                <h2 className="rd-h2">{t('rd.anim.title')} <span>{t('rd.anim.titleAccent')}</span></h2>
                <Link className="rd-btn rd-btn--y" to="/animacion">{t('rd.anim.more')}</Link>
            </div>
            <Crew />
        </section>
    );
};

export default AnimationSection;
