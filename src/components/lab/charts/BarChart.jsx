import { useState } from 'react';
import { motion as Motion, useReducedMotion } from 'framer-motion';
import { niceMax, ticks, fmtCompact } from './useChartScale';
import './charts.css';

/**
 * Barras agrupadas o simples.
 * data: [{ label, values: [n, n, ...] }]  — series: [{ name, color }]
 */
const BarChart = ({ data, series, height = 200, formatValue = fmtCompact, locale, showLegend = true, ariaLabel }) => {
    const reduce = useReducedMotion();
    const [hover, setHover] = useState(null);
    const W = 600, H = height, padL = 36, padB = 24, padT = 10, padR = 6;
    const innerW = W - padL - padR;
    const innerH = H - padT - padB;
    const max = niceMax(Math.max(...data.flatMap(d => d.values)));
    const groupW = innerW / data.length;
    const barW = Math.min(28, (groupW * 0.7) / series.length);
    const y = (v) => padT + innerH - (v / max) * innerH;

    return (
        <div className="chart chart-bars" role="img" aria-label={ariaLabel}>
            <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" style={{ height }}>
                <g className="chart-grid">
                    {ticks(max).map(tk => (
                        <line key={tk} x1={padL} x2={W - padR} y1={y(tk)} y2={y(tk)} />
                    ))}
                </g>
                <g className="chart-axis">
                    {ticks(max).map(tk => (
                        <text key={tk} x={padL - 6} y={y(tk) + 3} textAnchor="end">{formatValue(tk, locale)}</text>
                    ))}
                    {data.map((d, i) => (
                        <text key={d.label} x={padL + groupW * i + groupW / 2} y={H - 6} textAnchor="middle">{d.label}</text>
                    ))}
                </g>
                {data.map((d, gi) => (
                    <g key={d.label}>
                        {d.values.map((v, si) => {
                            const totalW = barW * series.length + 4 * (series.length - 1);
                            const x = padL + groupW * gi + (groupW - totalW) / 2 + si * (barW + 4);
                            const isHover = hover && hover.gi === gi && hover.si === si;
                            const dim = hover && !isHover;
                            return (
                                <Motion.rect
                                    key={si}
                                    className={`chart-bar ${dim ? 'dim' : ''}`}
                                    x={x}
                                    width={barW}
                                    rx={4}
                                    fill={series[si].color}
                                    initial={reduce ? false : { y: y(0), height: 0 }}
                                    animate={{ y: y(v), height: Math.max(0, y(0) - y(v)) }}
                                    transition={{ duration: reduce ? 0 : 0.5, ease: [0.22, 1, 0.36, 1], delay: reduce ? 0 : gi * 0.02 }}
                                    onMouseEnter={() => setHover({ gi, si, x: x + barW / 2, y: y(v), v })}
                                    onMouseLeave={() => setHover(null)}
                                    onFocus={() => setHover({ gi, si, x: x + barW / 2, y: y(v), v })}
                                    onBlur={() => setHover(null)}
                                    tabIndex={0}
                                    aria-label={`${d.label} ${series[si].name}: ${formatValue(v, locale)}`}
                                />
                            );
                        })}
                    </g>
                ))}
            </svg>
            {hover && (
                <div className="chart-tooltip" style={{ left: `${(hover.x / W) * 100}%`, top: `${(hover.y / H) * 100}%` }}>
                    {data[hover.gi].label} · {series[hover.si].name}
                    <strong>{formatValue(hover.v, locale)}</strong>
                </div>
            )}
            {showLegend && series.length > 1 && (
                <ul className="chart-legend">
                    {series.map(s => <li key={s.name}><i style={{ background: s.color }} />{s.name}</li>)}
                </ul>
            )}
        </div>
    );
};

export default BarChart;
