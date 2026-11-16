import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ROUTE_META, SITE } from '../../seo/meta';

const setMeta = (selector, value) => {
    const el = document.head.querySelector(selector);
    if (el) el.setAttribute(el.tagName === 'LINK' ? 'href' : 'content', value);
};

/** Mantiene título, descripción y URL canónica al día al navegar dentro del sitio. */
const Seo = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        const path = pathname.replace(/\/$/, '') || '/';
        let meta = ROUTE_META[path];
        if (!meta) meta = ROUTE_META['/'];
        const url = SITE.url + (path === '/' ? '/' : path);
        document.title = meta.title;
        setMeta('meta[name="description"]', meta.description);
        setMeta('link[rel="canonical"]', url);
        setMeta('meta[property="og:title"]', meta.title);
        setMeta('meta[property="og:description"]', meta.description);
        setMeta('meta[property="og:url"]', url);
    }, [pathname]);

    return null;
};

export default Seo;
