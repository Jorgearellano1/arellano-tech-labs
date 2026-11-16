import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Crew from './Crew';
import selva from '../../assets/animacion/mundo/selva.webp';

/** Puerta a la rama Animación: la selva de la serie con los dos repartos en movimiento. */
const AnimationSection = () => {
    const { t } = useTranslation();
    return (
        <section className="hm-anim" id="animacion">
            <div className="hm-wrap">
                <div className="hm-anim-panel" style={{ backgroundImage: `url(${selva})` }}>
                    <div className="hm-anim-head">
                        <h2 className="hm-h2">{t('rd.anim2.h1a')} <span>{t('rd.anim2.h1b')}</span></h2>
                        <Link className="rd-btn rd-btn--y" to="/animacion">{t('rd.anim.more')}</Link>
                    </div>
                    <Crew />
                </div>
            </div>
        </section>
    );
};

export default AnimationSection;
