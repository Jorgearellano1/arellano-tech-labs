import { ParallaxScene, Layer } from '../common/Parallax';
import roko from '../../assets/animacion/roko.webp';
import mina from '../../assets/animacion/mina.webp';
import pip from '../../assets/animacion/pip.webp';
import markup from '../../assets/animacion/markup.webp';

/** Reparto de Rokko, recortado y a distinta profundidad. */
const RokkoStage = () => (
    <ParallaxScene className="rd-stage rd-stage--rokko">
        <Layer depth={0.12} travel={80} className="rd-rokko-sun" />
        <Layer depth={0.22} className="rd-ch rd-ch--markup"><img src={markup} alt="Mr. Markup" loading="lazy" decoding="async" /></Layer>
        <Layer depth={0.38} className="rd-ch rd-ch--mina"><img src={mina} alt="Mina" loading="lazy" decoding="async" /></Layer>
        <Layer depth={0.6} travel={130} className="rd-ch rd-ch--roko"><img className="rd-float" src={roko} alt="Roko" loading="lazy" decoding="async" /></Layer>
        <Layer depth={0.9} travel={170} className="rd-ch rd-ch--pip"><img className="rd-float rd-float--c" src={pip} alt="Pip" loading="lazy" decoding="async" /></Layer>
    </ParallaxScene>
);

export default RokkoStage;
