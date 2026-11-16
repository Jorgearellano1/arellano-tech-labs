import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ParallaxScene, Layer } from '../common/Parallax';
import { getProjectBySlug, hostOf } from '../../data/projects';

const CASES = ['vap360', 'sirius', 'planta-llipata', 'totemiq'];

/** Muro de casos: los proyectos con sitio público, con logo, captura y enlace real. */
const FeaturedProjects = () => {
    const { t } = useTranslation();
    const cases = CASES.map(getProjectBySlug).filter(Boolean);

    return (
        <section className="rd-cases" id="proyectos">
            <div className="rd-wrap">
                <h2 className="rd-h2">{t('rd.cases.title')}</h2>
                {cases.map((p) => (
                    <article className="rd-case" key={p.id} style={{ '--case': p.color }}>
                        <div className="rd-case-copy">
                            {p.logo && <img className="rd-case-logo" src={p.logo} alt="" loading="lazy" decoding="async" />}
                            <h3>{t(p.name)}</h3>
                            <p>{t(p.shortDescription)}</p>
                            <div className="rd-case-links">
                                {p.link
                                    ? <a className="rd-link" href={p.link} target="_blank" rel="noopener noreferrer">{hostOf(p.link)} ↗</a>
                                    : p.private && <span className="rd-badge">{t('rd.cases.private')}</span>}
                                <Link className="rd-link rd-link--quiet" to={`/proyectos/${p.slug}`}>{t('rd.cases.viewCase')}</Link>
                            </div>
                        </div>
                        <ParallaxScene className="rd-case-shot">
                            <Layer depth={0.3} travel={120}>
                                <img src={p.thumbnail} alt={t(p.name)} loading="lazy" decoding="async" />
                            </Layer>
                        </ParallaxScene>
                    </article>
                ))}
                <Link className="rd-btn rd-btn--ghost" to="/proyectos">{t('rd.cases.all')}</Link>
            </div>
        </section>
    );
};

export default FeaturedProjects;
