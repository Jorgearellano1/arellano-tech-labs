import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import DemoFrame from '../DemoFrame';
import BarChart from '../charts/BarChart';
import LineChart from '../charts/LineChart';
import Sparkline from '../charts/Sparkline';
import DonutChart from '../charts/DonutChart';
import useDemoTheme, { useApplyPaletteToSite } from '../useDemoTheme';
import { palettes } from '../data/palettes';
import { categoryIds, salesByMonth, products, monthLabelsFor } from '../data/sampleData';
import { langOf, localeFor } from '../../../i18n/languages';
import { fmtMoney, fmtCompact } from '../charts/useChartScale';
import './WebDemo.css';

const PAGE_SIZE = 6;

const SortIcon = ({ dir }) => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden style={{ opacity: dir ? 1 : 0.35 }}>
        {dir === 'desc' ? <path d="M6 9l6 6 6-6" /> : <path d="M6 15l6-6 6 6" />}
    </svg>
);

const WebDemo = () => {
    const { t, i18n } = useTranslation();
    const lang = langOf(i18n.language);
    const locale = localeFor(lang);
    const theme = useDemoTheme({ palette: 'ambar', mode: 'light' });
    const { state, set, vars, palette } = theme;

    const [chartType, setChartType] = useState('bars');
    const [applySite, setApplySite] = useState(false);
    const [selectedCats, setSelectedCats] = useState(() => new Set(categoryIds));
    const [range, setRange] = useState(12);
    const [query, setQuery] = useState('');
    const [sort, setSort] = useState({ key: 'revenue', dir: 'desc' });
    const [page, setPage] = useState(0);

    useApplyPaletteToSite(applySite, palette);

    const catLabel = useCallback((id) => t(`lab.web.categories.${id}`), [t]);
    const monthLabels = monthLabelsFor(locale);
    const activeCatIdx = categoryIds.map((c, i) => (selectedCats.has(c) ? i : -1)).filter(i => i >= 0);

    const chartSeries = activeCatIdx.map(i => ({ name: catLabel(categoryIds[i]), color: palette.chart[i] }));

    // Cálculos baratos (12 filas): sin memo para no pelear con el compilador de React
    const chartData = salesByMonth.slice(12 - range).map((row, i) => ({
        label: monthLabels[12 - range + i],
        values: activeCatIdx.map(ci => row[ci])
    }));

    const totals = (() => {
        const rows = salesByMonth.slice(12 - range);
        const total = rows.reduce((a, r) => a + activeCatIdx.reduce((b, ci) => b + r[ci], 0), 0);
        const prev = salesByMonth.slice(Math.max(0, 12 - range * 2), 12 - range);
        const prevTotal = prev.reduce((a, r) => a + activeCatIdx.reduce((b, ci) => b + r[ci], 0), 0) || total * 0.85;
        const perMonth = rows.map(r => activeCatIdx.reduce((b, ci) => b + r[ci], 0));
        const orders = Math.round(total / 118);
        return {
            total, growth: ((total - prevTotal) / prevTotal) * 100, perMonth, orders,
            ticket: total / Math.max(1, orders), conversion: 2.4 + activeCatIdx.length * 0.35
        };
    })();

    const byCategory = activeCatIdx.map(ci => ({
        name: catLabel(categoryIds[ci]),
        color: palette.chart[ci],
        value: salesByMonth.slice(12 - range).reduce((a, r) => a + r[ci], 0)
    }));

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        const rows = products.filter(p => selectedCats.has(p.category) && (!q || p.name.toLowerCase().includes(q) || catLabel(p.category).toLowerCase().includes(q)));
        const dir = sort.dir === 'asc' ? 1 : -1;
        return rows.sort((a, b) => {
            const av = a[sort.key], bv = b[sort.key];
            if (typeof av === 'string') return av.localeCompare(bv) * dir;
            return (av - bv) * dir;
        });
    }, [query, selectedCats, sort, catLabel]);

    const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    const safePage = Math.min(page, pages - 1);
    const pageRows = filtered.slice(safePage * PAGE_SIZE, safePage * PAGE_SIZE + PAGE_SIZE);

    const toggleCat = (id) => {
        setSelectedCats(prev => {
            const next = new Set(prev);
            if (next.has(id)) { if (next.size > 1) next.delete(id); } else next.add(id);
            return next;
        });
        setPage(0);
    };

    const toggleSort = (key) => {
        setSort(prev => ({ key, dir: prev.key === key && prev.dir === 'desc' ? 'asc' : 'desc' }));
    };

    const columns = [
        { key: 'name', label: t('lab.web.table.product'), align: 'left' },
        { key: 'category', label: t('lab.web.table.category'), align: 'left' },
        { key: 'units', label: t('lab.web.table.units'), align: 'right' },
        { key: 'revenue', label: t('lab.web.table.revenue'), align: 'right' },
        { key: 'trend', label: t('lab.web.table.trend'), align: 'right' },
        { key: 'stock', label: t('lab.web.table.stock'), align: 'right' }
    ];

    return (
        <div className="lab-layout web-demo-layout">
            <aside className="lab-controls">
                <div className="lab-intro">
                    <h3>{t('lab.web.intro.title')}</h3>
                    <p>{t('lab.web.intro.body')}</p>
                </div>

                <div className="lab-control">
                    <span className="lab-control-label">{t('lab.controls.palette')} <em>{palette.name[lang] || palette.name.en}</em></span>
                    <div className="lab-swatches" role="group" aria-label={t('lab.controls.palette')}>
                        {palettes.map(p => (
                            <button
                                key={p.id}
                                type="button"
                                className="lab-swatch"
                                style={{ '--sw': `linear-gradient(135deg, ${p.accent} 50%, ${p.secondary} 50%)` }}
                                aria-pressed={state.palette === p.id}
                                aria-label={p.name[lang] || p.name.en}
                                title={p.name[lang] || p.name.en}
                                onClick={() => set('palette', p.id)}
                            />
                        ))}
                    </div>
                </div>

                <div className="lab-control">
                    <span className="lab-control-label">{t('lab.controls.mode')}</span>
                    <div className="lab-seg" role="group">
                        <button type="button" aria-pressed={state.mode === 'light'} onClick={() => set('mode', 'light')}>{t('lab.controls.light')}</button>
                        <button type="button" aria-pressed={state.mode === 'dark'} onClick={() => set('mode', 'dark')}>{t('lab.controls.dark')}</button>
                    </div>
                </div>

                <div className="lab-control">
                    <span className="lab-control-label">{t('lab.web.chartType')}</span>
                    <div className="lab-seg" role="group">
                        <button type="button" aria-pressed={chartType === 'bars'} onClick={() => setChartType('bars')}>{t('lab.web.bars')}</button>
                        <button type="button" aria-pressed={chartType === 'lines'} onClick={() => setChartType('lines')}>{t('lab.web.lines')}</button>
                    </div>
                </div>

                <label className="lab-switch">
                    <span>{t('lab.web.applySite')}<small>{t('lab.web.applySiteHint')}</small></span>
                    <input type="checkbox" checked={applySite} onChange={(e) => setApplySite(e.target.checked)} />
                    <span className="lab-switch-track" aria-hidden />
                </label>

                <p className="lab-hint">{t('lab.web.hint')}</p>
            </aside>

            <DemoFrame>
                <div className="demo-root web-demo" style={vars} data-scheme={vars.colorScheme}>
                    <header className="wd-topbar">
                        <div className="wd-brand"><i /> {t('lab.web.dashboardTitle')}</div>
                        <div className="wd-topbar-actions">
                            <div className="wd-range" role="group" aria-label={t('lab.web.period')}>
                                {[3, 6, 12].map(r => (
                                    <button key={r} type="button" className={range === r ? 'active' : ''} onClick={() => setRange(r)}>{r}{t('lab.web.monthsShort')}</button>
                                ))}
                            </div>
                            <button type="button" className="d-btn">{t('lab.web.export')}</button>
                        </div>
                    </header>

                    <div className="wd-body">
                        <div className="wd-kpis">
                            <div className="d-card wd-kpi">
                                <span className="d-muted">{t('lab.web.kpi.revenue')}</span>
                                <strong>{fmtMoney(totals.total, locale)}</strong>
                                <em className={totals.growth >= 0 ? 'up' : 'down'}>{totals.growth >= 0 ? '▲' : '▼'} {Math.abs(totals.growth).toFixed(1)}%</em>
                                <Sparkline values={totals.perMonth} color={palette.chart[0]} />
                            </div>
                            <div className="d-card wd-kpi">
                                <span className="d-muted">{t('lab.web.kpi.orders')}</span>
                                <strong>{fmtCompact(totals.orders, locale)}</strong>
                                <em className="up">▲ {(totals.growth * 0.8).toFixed(1)}%</em>
                                <Sparkline values={totals.perMonth.map(v => v / 118)} color={palette.chart[1]} />
                            </div>
                            <div className="d-card wd-kpi">
                                <span className="d-muted">{t('lab.web.kpi.ticket')}</span>
                                <strong>{fmtMoney(totals.ticket, locale)}</strong>
                                <em className="flat">— 0.4%</em>
                                <Sparkline values={totals.perMonth.map((v, i) => v / (110 + (i % 3) * 4))} color={palette.chart[2] || palette.chart[0]} />
                            </div>
                            <div className="d-card wd-kpi">
                                <span className="d-muted">{t('lab.web.kpi.conversion')}</span>
                                <strong>{totals.conversion.toFixed(2)}%</strong>
                                <em className="up">▲ 0.6 pt</em>
                                <Sparkline values={totals.perMonth.map((v, i) => 2 + (i % 4) * 0.3 + v / 60000)} color={palette.chart[3] || palette.chart[0]} />
                            </div>
                        </div>

                        <div className="wd-grid">
                            <div className="d-card wd-chart">
                                <div className="d-card-title">
                                    <span>{t('lab.web.chartTitle')}</span>
                                    <div className="wd-cats" role="group" aria-label={t('lab.web.table.category')}>
                                        {categoryIds.map((c, i) => (
                                            <button key={c} type="button" className={`d-chip ${selectedCats.has(c) ? 'active' : ''}`} aria-pressed={selectedCats.has(c)} onClick={() => toggleCat(c)}>
                                                <i style={{ background: palette.chart[i] }} />{catLabel(c)}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                {chartType === 'bars'
                                    ? <BarChart data={chartData} series={chartSeries} height={220} formatValue={(v) => fmtCompact(v, locale)} locale={locale} ariaLabel={t('lab.web.chartTitle')} />
                                    : <LineChart data={chartData} series={chartSeries} height={220} formatValue={(v) => fmtCompact(v, locale)} locale={locale} ariaLabel={t('lab.web.chartTitle')} />}
                            </div>
                            <div className="d-card wd-donut">
                                <div className="d-card-title"><span>{t('lab.web.share')}</span></div>
                                <DonutChart slices={byCategory} size={150} centerLabel={fmtCompact(totals.total, locale)} centerSub={t('lab.web.kpi.revenue')} ariaLabel={t('lab.web.share')} />
                            </div>
                        </div>

                        <div className="d-card wd-table-card">
                            <div className="d-card-title">
                                <span>{t('lab.web.tableTitle')} <span className="d-muted">· {filtered.length}</span></span>
                                <input
                                    className="d-input wd-search"
                                    type="search"
                                    placeholder={t('lab.web.search')}
                                    value={query}
                                    onChange={(e) => { setQuery(e.target.value); setPage(0); }}
                                    aria-label={t('lab.web.search')}
                                />
                            </div>

                            <div className="wd-table-wrap">
                                <table className="wd-table">
                                    <thead>
                                        <tr>
                                            {columns.map(col => (
                                                <th key={col.key} style={{ textAlign: col.align }} aria-sort={sort.key === col.key ? (sort.dir === 'asc' ? 'ascending' : 'descending') : 'none'}>
                                                    <button type="button" onClick={() => toggleSort(col.key)}>
                                                        {col.label} <SortIcon dir={sort.key === col.key ? sort.dir : null} />
                                                    </button>
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {pageRows.map(p => (
                                            <tr key={p.id}>
                                                <td data-label={columns[0].label}><strong>{p.name}</strong></td>
                                                <td data-label={columns[1].label}><span className="d-chip wd-cat-chip"><i style={{ background: palette.chart[categoryIds.indexOf(p.category)] }} />{catLabel(p.category)}</span></td>
                                                <td data-label={columns[2].label} className="num">{p.units.toLocaleString(locale)}</td>
                                                <td data-label={columns[3].label} className="num">{fmtMoney(p.revenue, locale)}</td>
                                                <td data-label={columns[4].label} className={`num trend ${p.trend >= 0 ? 'up' : 'down'}`}>{p.trend >= 0 ? '+' : ''}{p.trend.toFixed(1)}%</td>
                                                <td data-label={columns[5].label} className="num">
                                                    <span className={`d-pill ${p.stock < 20 ? 'd-pill--warn' : 'd-pill--good'}`}>{p.stock}</span>
                                                </td>
                                            </tr>
                                        ))}
                                        {pageRows.length === 0 && (
                                            <tr><td colSpan={6} className="wd-empty">{t('lab.web.noResults')}</td></tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            <div className="wd-pagination">
                                <span className="d-muted">{t('lab.web.page')} {safePage + 1} / {pages}</span>
                                <div>
                                    <button type="button" className="d-btn d-btn--ghost" disabled={safePage === 0} onClick={() => setPage(p => Math.max(0, p - 1))}>←</button>
                                    <button type="button" className="d-btn d-btn--ghost" disabled={safePage >= pages - 1} onClick={() => setPage(p => Math.min(pages - 1, p + 1))}>→</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </DemoFrame>
        </div>
    );
};

export default WebDemo;
