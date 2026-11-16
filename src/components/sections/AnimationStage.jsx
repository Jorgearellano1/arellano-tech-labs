import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ParallaxScene, Layer } from '../common/Parallax';
import selva from '../../assets/animacion/selva.webp';
import lupuna from '../../assets/animacion/abuela-lupuna.webp';
import bufi from '../../assets/animacion/bufi.webp';
import tari from '../../assets/animacion/tari.webp';
import mayo from '../../assets/animacion/mayo.webp';
import ushico from '../../assets/animacion/ushico.webp';

/** Escena de selva con los personajes de Legado Amazónico a distinta profundidad. */
const AnimationStage = () => {
    const { t } = useTranslation();
    const [hop, setHop] = useState(0);
    return (
        <ParallaxScene className="rd-stage">
            <Layer depth={0.1} travel={90} className="rd-stage-bg" style={{ backgroundImage: `url(${selva})` }} />
            <Layer depth={0.16} className="rd-ch rd-ch--lupuna"><img src={lupuna} alt="Abuela Lupuna" loading="lazy" decoding="async" /></Layer>
            <Layer depth={0.26} className="rd-ch rd-ch--bufi"><img className="rd-float rd-float--b" src={bufi} alt="Bufi" loading="lazy" decoding="async" /></Layer>
            <Layer depth={0.36} className="rd-ch rd-ch--tari"><img src={tari} alt="Tari" loading="lazy" decoding="async" /></Layer>
            <Layer depth={0.85} travel={170} className="rd-ch rd-ch--mayo"><img className="rd-float rd-float--c" src={mayo} alt="Mayo" loading="lazy" decoding="async" /></Layer>
            <Layer depth={0.58} travel={130} className="rd-ch rd-ch--ushico">
                <button type="button" onClick={() => setHop((n) => n + 1)} aria-label={t('rd.anim.tap')}>
                    <img key={hop} className={hop ? 'rd-hop' : 'rd-float'} src={ushico} alt="Ushico" loading="lazy" decoding="async" />
                </button>
            </Layer>
            <span className="rd-stage-hint">{t('rd.anim.tap')}</span>
        </ParallaxScene>
    );
};

export default AnimationStage;
