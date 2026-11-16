import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ParallaxScene, Layer } from '../common/Parallax';
import roko from '../../assets/animacion/roko.webp';
import mina from '../../assets/animacion/mina.webp';

/** Cierre de la home: bloque amarillo con llamada a contacto. */
const Outro = () => {
    const { t } = useTranslation();
    return (
        <ParallaxScene className="rd-outro">
            <div className="rd-wrap rd-outro-inner">
                <h2>{t('rd.outro.title')}</h2>
                <Link className="rd-btn" to="/contacto">{t('hero.cta')}</Link>
            </div>
            <Layer depth={0.5} travel={90} className="rd-outro-ch rd-outro-ch--l"><img className="rd-float" src={mina} alt="" loading="lazy" decoding="async" /></Layer>
            <Layer depth={0.7} travel={120} className="rd-outro-ch rd-outro-ch--r"><img className="rd-float rd-float--b" src={roko} alt="" loading="lazy" decoding="async" /></Layer>
        </ParallaxScene>
    );
};

export default Outro;
