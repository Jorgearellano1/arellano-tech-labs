/**
 * Después de `vite build`: crea un index.html por ruta con su título, descripción y URL
 * canónica ya escritos, más sitemap.xml y robots.txt. Así Google y las vistas previas de
 * WhatsApp o LinkedIn leen los datos correctos de cada página sin ejecutar JavaScript.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { ROUTE_META, SITE, projectMeta } from '../src/seo/meta.js';

const dist = new URL('../dist/', import.meta.url);
const base = readFileSync(new URL('index.html', dist), 'utf8');
const data = readFileSync(new URL('../src/data/projects.js', import.meta.url), 'utf8');
const es = readFileSync(new URL('../src/i18n/config.js', import.meta.url), 'utf8');
const rd = readFileSync(new URL('../src/i18n/redesign.js', import.meta.url), 'utf8');

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const esBlock = es.slice(es.indexOf('\n    es: {'));

/** Texto en español de una clave tipo projectsData.p8.name o rd.p.sirius; si no es clave, es literal. */
function text(key) {
    let m = key.match(/^projectsData\.(p\d+)\.(\w+)$/);
    if (m) {
        const block = esBlock.slice(esBlock.indexOf(`${m[1]}: {`));
        return block.match(new RegExp(`${m[2]}: '((?:[^'\\\\]|\\\\.)*)'`))?.[1].replace(/\\'/g, "'") ?? key;
    }
    m = key.match(/^rd\.p\.(\w+)$/);
    if (m) return rd.slice(rd.indexOf('\n    es: {')).match(new RegExp(`${m[1]}: "((?:[^"\\\\]|\\\\.)*)"`))?.[1] ?? key;
    return key;
}

const pages = { ...ROUTE_META };
for (const m of data.matchAll(/slug: '([^']+)'[\s\S]*?name: '([^']+)'[\s\S]*?shortDescription: '([^']+)'/g)) {
    pages[`/proyectos/${m[1]}`] = projectMeta(text(m[2]), text(m[3]));
}

function render(path, { title, description }) {
    const url = SITE.url + (path === '/' ? '/' : path);
    return base
        .replace(/<title>[^<]*<\/title>/, `<title>${esc(title)}</title>`)
        .replace(/(<meta name="description" content=")[^"]*/, `$1${esc(description)}`)
        .replace(/(<link rel="canonical" href=")[^"]*/, `$1${url}`)
        .replace(/(<meta property="og:title" content=")[^"]*/, `$1${esc(title)}`)
        .replace(/(<meta property="og:description" content=")[^"]*/, `$1${esc(description)}`)
        .replace(/(<meta property="og:url" content=")[^"]*/, `$1${url}`)
        .replace(/(<meta name="twitter:title" content=")[^"]*/, `$1${esc(title)}`)
        .replace(/(<meta name="twitter:description" content=")[^"]*/, `$1${esc(description)}`);
}

for (const [path, meta] of Object.entries(pages)) {
    if (path === '/') { writeFileSync(new URL('index.html', dist), render(path, meta)); continue; }
    const dir = new URL(`.${path}/`, dist);
    mkdirSync(dir, { recursive: true });
    writeFileSync(new URL('index.html', dir), render(path, meta));
}

const today = new Date().toISOString().slice(0, 10);
const urls = Object.keys(pages).map((p) => `  <url><loc>${SITE.url}${p === '/' ? '/' : p}</loc><lastmod>${today}</lastmod></url>`).join('\n');
writeFileSync(new URL('sitemap.xml', dist), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
writeFileSync(new URL('robots.txt', dist), `User-agent: *\nAllow: /\n\nSitemap: ${SITE.url}/sitemap.xml\n`);
console.log(`seo-pages: ${Object.keys(pages).length} páginas, sitemap.xml y robots.txt`);
