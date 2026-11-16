import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ROUTE_META, SITE, projectMeta } from '../../seo/meta';
import { getProjectBySlug } from '../../data/projects';

const setMeta = (selector, value) => {
    const el = document.head.querySelector(selector);
    if (el) el.setAttribute(el.tagName === 'LINK' ? 'href' : 'content', value);
};

/** Mantiene título, descripción y URL canónica al día al navegar dentro del sitio. */
const Seo = () => {
    const { pathname } = useLocation();
    const { t } = useTranslation();

    useEffect(() => {
        const path = pathname.replace(/\/$/, '') || '/';
        let meta = ROUTE_META[path];
        const slug = path.match(/^\/proyectos\/([^/]+)$/)?.[1];
        const project = slug && getProjectBySlug(slug);
        if (project) meta = projectMeta(t(project.name), t(project.shortDescription));
        if (!meta) meta = ROUTE_META['/'];
        const url = SITE.url + (path === '/' ? '/' : path);
        document.title = meta.title;
        setMeta('meta[name="description"]', meta.description);
        setMeta('link[rel="canonical"]', url);
        setMeta('meta[property="og:title"]', meta.title);
        setMeta('meta[property="og:description"]', meta.description);
        setMeta('meta[property="og:url"]', url);
    }, [pathname, t]);

    return null;
};

export default Seo;
