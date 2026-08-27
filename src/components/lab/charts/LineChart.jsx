import { useState } from 'react';
import { motion as Motion, useReducedMotion } from 'framer-motion';
import { niceMax, ticks, fmtCompact, smoothPath } from './useChartScale';
import './charts.css';

/**
 * Líneas suaves con área. Mismo contrato que BarChart:
 * data: [{ label, values: [...] }], series: [{ name, color }]
 */
const LineChart = ({ data, series, height = 200, formatValue = fmtCompact, locale, showLegend = true, ariaLabel }) => {
    const reduce = useReducedMotion();
    const [hover, setHover] = useState(null);
    const W = 600, H = height, padL = 36, padB = 24, padT = 10, padR = 10;
    const innerW = W - padL - padR;
    const innerH = H - padT - padB;
    const max = niceMax(Math.max(...data.flatMap(d => d.values)));
    const x = (i) => padL + (innerW / Math.max(1, data.length - 1)) * i;
    const y = (v) => padT + innerH - (v / max) * innerH;

    return (
        <div className="chart chart-lines" role="img" aria-label={ariaLabel}>
            <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" style={{ height }}
                onMouseLeave={() => setHover(null)}>
                <g className="chart-grid">
                    {ticks(max).map(tk => <line key={tk} x1={padL} x2={W - padR} y1={y(tk)} y2={y(tk)} />)}
                </g>
                <g className="chart-axis">
                    {ticks(max).map(tk => <text key={tk} x={padL - 6} y={y(tk) + 3} textAnchor="end">{formatValue(tk, locale)}</text>)}
                    {data.map((d, i) => <text key={d.label} x={x(i)} y={H - 6} textAnchor="middle">{d.label}</text>)}
                </g>
                {series.map((s, si) => {
                    const pts = data.map((d, i) => [x(i), y(d.values[si])]);
                    const d = smoothPath(pts);
                    const area = `${d} L${x(data.length - 1)},${y(0)} L${x(0)},${y(0)} Z`;
                    return (
                        <g key={s.name}>
                            <Motion.path className="chart-area" fill={s.color} initial={false} animate={{ d: area }} transition={{ duration: reduce ? 0 : 0.5, ease: 'easeOut' }} />
                            <Motion.path className="chart-line-path" stroke={s.color} initial={false} animate={{ d }} transition={{ duration: reduce ? 0 : 0.5, ease: 'easeOut' }} />
                            {pts.map((p, i) => (
                                <Motion.circle
                                    key={i}
                                    className="chart-dot"
                                    r={hover && hover.i === i ? 5 : 3.5}
                                    fill={s.color}
                                    initial={false}
                                    animate={{ cx: p[0], cy: p[1] }}
                                    transition={{ duration: reduce ? 0 : 0.5, ease: 'easeOut' }}
                                    onMouseEnter={() => setHover({ i, si, x: p[0], y: p[1], v: data[i].values[si] })}
                                    tabIndex={0}
                                    onFocus={() => setHover({ i, si, x: p[0], y: p[1], v: data[i].values[si] })}
                                    onBlur={() => setHover(null)}
                                    aria-label={`${data[i].label} ${s.name}: ${formatValue(data[i].values[si], locale)}`}
                                />
                            ))}
                        </g>
                    );
                })}
            </svg>
            {hover && (
                <div className="chart-tooltip" style={{ left: `${(hover.x / W) * 100}%`, top: `${(hover.y / H) * 100}%` }}>
                    {data[hover.i].label} · {series[hover.si].name}
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

export default LineChart;
