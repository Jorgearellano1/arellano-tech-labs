import { motion as Motion, useReducedMotion } from 'framer-motion';
import './charts.css';

/** Donut simple: slices [{ name, value, color }]. */
const DonutChart = ({ slices, size = 140, thickness = 18, centerLabel, centerSub, ariaLabel }) => {
    const reduce = useReducedMotion();
    const total = slices.reduce((a, s) => a + s.value, 0) || 1;
    const r = (size - thickness) / 2;
    const c = 2 * Math.PI * r;
    const lens = slices.map(s => (s.value / total) * c);
    const offsets = lens.map((_, i) => lens.slice(0, i).reduce((a, b) => a + b, 0));

    return (
        <div className="chart chart-donut" role="img" aria-label={ariaLabel} style={{ width: size, maxWidth: '100%' }}>
            <svg viewBox={`0 0 ${size} ${size}`}>
                <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--d-surface-2, #EEF0F6)" strokeWidth={thickness} />
                {slices.map((s, i) => {
                    const len = lens[i];
                    return (
                        <Motion.circle
                            key={s.name}
                            cx={size / 2} cy={size / 2} r={r}
                            fill="none"
                            stroke={s.color}
                            strokeWidth={thickness}
                            strokeLinecap="butt"
                            transform={`rotate(-90 ${size / 2} ${size / 2})`}
                            initial={false}
                            animate={{ strokeDasharray: `${len} ${c - len}`, strokeDashoffset: -offsets[i] }}
                            transition={{ duration: reduce ? 0 : 0.6, ease: 'easeOut' }}
                        />
                    );
                })}
                {centerLabel && <text className="chart-donut-center" x="50%" y="50%" textAnchor="middle" dominantBaseline="central" fontSize={size * 0.16}>{centerLabel}</text>}
                {centerSub && <text className="chart-donut-sub" x="50%" y={size / 2 + size * 0.14} textAnchor="middle">{centerSub}</text>}
            </svg>
            <ul className="chart-legend">
                {slices.map(s => <li key={s.name}><i style={{ background: s.color }} />{s.name} · {Math.round((s.value / total) * 100)}%</li>)}
            </ul>
        </div>
    );
};

export default DonutChart;
