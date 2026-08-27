/**
 * Prueba de humo: renderiza cada escena del laboratorio y las páginas con
 * react-dom/server a través del SSR de Vite. Si un componente lanza en render,
 * aquí explota antes de llegar al navegador.
 */
import { createServer } from 'vite';
import { renderToString } from 'react-dom/server';
import React from 'react';

// Stubs mínimos de navegador para inicializadores de estado
const mq = () => ({ matches: false, addEventListener() {}, removeEventListener() {} });
globalThis.window = globalThis;
globalThis.matchMedia = mq;
globalThis.localStorage = { getItem: () => null, setItem() {}, removeItem() {} };
Object.defineProperty(globalThis, 'navigator', { value: { language: 'es', connection: null }, configurable: true });
globalThis.document = { documentElement: { getAttribute: () => null, setAttribute() {}, removeAttribute() {}, style: { setProperty() {}, removeProperty() {} } }, readyState: 'loading', addEventListener() {}, getElementById: () => null };
globalThis.addEventListener = () => {};
globalThis.removeEventListener = () => {};
globalThis.IntersectionObserver = undefined;
globalThis.performance = globalThis.performance || { now: () => 0, getEntriesByType: () => [] };

const server = await createServer({ server: { middlewareMode: true }, appType: 'custom', logLevel: 'error' });
const load = (p) => server.ssrLoadModule(p);

let failures = 0;
async function check(name, factory) {
  try {
    const el = await factory();
    const html = renderToString(el);
    console.log(`✓ ${name.padEnd(14)} ${html.length.toString().padStart(6)} chars`);
  } catch (e) {
    failures++;
    console.log(`✗ ${name}: ${e.message.split('\n')[0]}`);
  }
}

await load('/src/i18n/config.js');
const { MemoryRouter, Routes, Route } = await import('react-router-dom');
const wrap = (Comp, props = {}, path = '/') => React.createElement(MemoryRouter, { initialEntries: [path] }, React.createElement(Comp, props));

for (const scene of ['WebDemo', 'ArDemo', 'MobileDemo', 'SystemsDemo', 'PerfDemo']) {
  await check(scene, async () => wrap((await load(`/src/components/lab/demos/${scene}.jsx`)).default, { preset: {}, openScene() {} }));
}
await check('MobileDemo:ar', async () => wrap((await load('/src/components/lab/demos/MobileDemo.jsx')).default, { preset: { app: 'ar' } }));
await check('MobileDemo:adm', async () => wrap((await load('/src/components/lab/demos/MobileDemo.jsx')).default, { preset: { app: 'admin', mode: 'dark' } }));
await check('MobileDemo:bk', async () => wrap((await load('/src/components/lab/demos/MobileDemo.jsx')).default, { preset: { app: 'booking' } }));
await check('Home', async () => wrap((await load('/src/pages/Home.jsx')).default));
await check('Projects', async () => wrap((await load('/src/pages/Projects.jsx')).default));
await check('ProjectDetail', async () => {
  const PD = (await load('/src/pages/ProjectDetail.jsx')).default;
  return React.createElement(MemoryRouter, { initialEntries: ['/proyectos/bd-clinica'] }, React.createElement(Routes, null, React.createElement(Route, { path: '/proyectos/:slug', element: React.createElement(PD) })));
});
await check('Header', async () => wrap((await load('/src/components/layout/Header.jsx')).default));
await check('Hero', async () => wrap((await load('/src/components/sections/Hero.jsx')).default));
await check('Services', async () => wrap((await load('/src/components/sections/Services.jsx')).default));

await server.close();
console.log(failures ? `\n${failures} fallo(s)` : '\nTodo renderiza.');
process.exit(failures ? 1 : 0);
