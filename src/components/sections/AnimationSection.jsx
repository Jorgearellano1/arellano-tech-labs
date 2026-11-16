import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import AnimationStage from './AnimationStage';

/** Puerta a la rama Animación desde la home. */
const AnimationSection = () => {
    const { t } = useTranslation();
    return (
        <section className="rd-anim" id="animacion">
            <div className="rd-wrap rd-anim-head">
                <h2>{t('rd.anim.title')} <span>{t('rd.anim.titleAccent')}</span></h2>
                <Link className="rd-btn rd-btn--gold" to="/animacion">{t('rd.anim.more')}</Link>
            </div>
            <AnimationStage />
        </section>
    );
};

export default AnimationSection;
