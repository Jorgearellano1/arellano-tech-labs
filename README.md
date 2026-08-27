# AJM Technology — ajmptech.com

Sitio corporativo de AJM Technology. React 19 + Vite 7, sin framework de CSS: tokens propios en `src/index.css`.

## Desarrollo

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # genera dist/
npm run preview    # sirve dist/
npm run lint
```

Copia `.env.example` a `.env` y rellena `VITE_WEB3FORMS_KEY` (formulario de contacto). En Vercel va como variable de entorno.

## Estructura

```
src/
├── data/projects.js        fuente única de proyectos (textos vía i18n)
├── i18n/config.js          traducciones ES/EN del sitio
├── i18n/lab.js             traducciones del laboratorio
├── pages/                  Home, Projects, ProjectDetail, About, Contact (rutas diferidas)
├── components/
│   ├── layout/             Header, Footer
│   ├── sections/           Hero, Services, WhyUs, Process, FeaturedProjects, FAQ, CTA
│   ├── common/             Button, Badge, SectionMotion, StaggerItem…
│   └── lab/                el Laboratorio interactivo (ver abajo)
└── assets/projects/        capturas de proyectos en WebP
```

## El Laboratorio (`src/components/lab`)

Sección de la home con cinco escenas, una por servicio. Cada escena se carga solo cuando se elige (`React.lazy`) y la sección solo se monta al entrar en viewport.

| Escena | Archivo | Qué demuestra |
|---|---|---|
| Web | `demos/WebDemo.jsx` | Paleta que retematiza en vivo, tabla ordenable, gráficos SVG propios, marco responsive con container queries |
| AR | `demos/ArDemo.jsx` | `ar.totemiq.art` incrustado en un teléfono, QR estático, respaldo con capturas |
| Mobile | `demos/MobileDemo.jsx` | Teléfono iOS/Android con cuatro apps (`apps/`): tema, acento, tipografía, densidad, idioma y estados |
| Sistemas | `demos/SystemsDemo.jsx` | Arquitectura clicable, simulador de petición con latencias, consola de endpoints |
| Optimización | `demos/PerfDemo.jsx` | Antes/después medido en este sitio, comparador PNG/WebP, carrera de descarga real |

Piezas compartidas: `useDemoTheme.js` (estado → variables `--d-*`), `DemoFrame.jsx` (viewport selector), `PhoneShell.jsx` (marco de teléfono), `charts/` (Bar, Line, Donut, Sparkline sin dependencias).

Para abrir una escena desde cualquier componente: `import { openLab } from './components/lab/openLab'; openLab('mobile', { app: 'admin' })`.

## Rendimiento

Build del 27/08/2026: imágenes 8,6 MB → 848 KB (WebP), JS inicial 530 KB en un archivo → ~62 KB + chunks por ruta y por librería, 10 dependencias sin uso eliminadas. La escena de Optimización muestra estos números.
