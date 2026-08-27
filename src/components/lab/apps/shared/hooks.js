import { useEffect, useState } from 'react';

/* ---------- navegación en pila ---------- */
export function useStack(root) {
    const [stack, setStack] = useState([root]);
    const [dir, setDir] = useState(1);
    const push = (screen) => { setDir(1); setStack(s => [...s, screen]); };
    const pop = () => { setDir(-1); setStack(s => (s.length > 1 ? s.slice(0, -1) : s)); };
    const reset = (screen) => { setDir(-1); setStack([screen || root]); };
    return { stack, top: stack[stack.length - 1], depth: stack.length, dir, push, pop, reset };
}

/* ---------- brindis / toast dentro de la app ---------- */
export function useAppToast() {
    const [msg, setMsg] = useState(null);
    useEffect(() => {
        if (!msg) return undefined;
        const id = setTimeout(() => setMsg(null), 1800);
        return () => clearTimeout(id);
    }, [msg]);
    return [msg, setMsg];
}
