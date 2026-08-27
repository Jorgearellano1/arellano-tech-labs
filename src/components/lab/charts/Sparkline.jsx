import { smoothPath } from './useChartScale';
import './charts.css';

/** Mini línea sin ejes para tiles KPI. */
const Sparkline = ({ values, color = 'var(--d-accent)', width = 120, height = 32 }) => {
    const max = Math.max(...values), min = Math.min(...values);
    const span = max - min || 1;
    const pts = values.map((v, i) => [
        (i / (values.length - 1)) * (width - 4) + 2,
        height - 3 - ((v - min) / span) * (height - 6)
    ]);
    const d = smoothPath(pts);
    const area = `${d} L${pts[pts.length - 1][0]},${height} L${pts[0][0]},${height} Z`;
    const last = pts[pts.length - 1];
    return (
        <svg className="chart-sparkline" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" aria-hidden>
            <path d={area} fill={color} opacity="0.14" />
            <path d={d} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" />
            <circle cx={last[0]} cy={last[1]} r="3" fill={color} />
        </svg>
    );
};

export default Sparkline;
