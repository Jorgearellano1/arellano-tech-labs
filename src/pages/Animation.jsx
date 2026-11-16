import { useTranslation } from 'react-i18next';
import AnimationStage from '../components/sections/AnimationStage';
import gla from '../assets/animacion/gla.webp';
import r1 from '../assets/animacion/rokko1.webp';
import r2 from '../assets/animacion/rokko2.webp';
import r3 from '../assets/animacion/rokko3.webp';

const ROKKO_CHANNEL = 'https://www.youtube.com/@RokoExplainsIt';

const Animation = () => {
    const { t } = useTranslation();
    return (
        <div className="rd-anim rd-anim--page">
            <div className="rd-wrap rd-anim-head">
                <h1>{t('rd.anim.title')} <span>{t('rd.anim.titleAccent')}</span></h1>
                <p className="rd-lead">{t('rd.anim.sub')}</p>
            </div>
            <AnimationStage />
            <div className="rd-wrap rd-prods">
                <article className="rd-prod">
                    <img className="rd-prod-mark" src={gla} alt="Grupo Legado Amazónico" loading="lazy" decoding="async" />
                    <h2 className="rd-prod-title">{t('rd.anim.legadoTitle')}</h2>
                    <p>{t('rd.anim.legadoText')}</p>
                    <ul className="rd-cast">{['Ushico', 'Bufi', 'Mayo', 'Tari', 'Abuela Lupuna'].map((n) => <li key={n}>{n}</li>)}</ul>
                </article>
                <article className="rd-prod">
                    <div className="rd-frames">
                        {[r1, r2, r3].map((src) => <img key={src} src={src} alt="Rokko" loading="lazy" decoding="async" />)}
                    </div>
                    <h2 className="rd-prod-title rd-prod-title--rokko">Rokko</h2>
                    <p>{t('rd.anim.rokkoText')}</p>
                    <ul className="rd-cast">{['Roko', 'Pip', 'Mina', 'Mr. Markup'].map((n) => <li key={n}>{n}</li>)}</ul>
                    <a className="rd-link" href={ROKKO_CHANNEL} target="_blank" rel="noopener noreferrer">{t('rd.anim.channel')} ↗</a>
                </article>
            </div>
        </div>
    );
};

export default Animation;
