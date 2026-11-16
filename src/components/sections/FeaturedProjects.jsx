import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ParallaxScene, Layer } from '../common/Parallax';
import { getFeaturedProjects } from '../../data/projects';

const host = (url) => new URL(url).hostname.replace(/^www\./, '');

/** Muro de casos: los proyectos con sitio público, con logo, captura y enlace real. */
const FeaturedProjects = () => {
    const { t } = useTranslation();
    const cases = getFeaturedProjects().filter((p) => p.link).slice(0, 3);

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
                                <a className="rd-link" href={p.link} target="_blank" rel="noopener noreferrer">{host(p.link)} ↗</a>
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
