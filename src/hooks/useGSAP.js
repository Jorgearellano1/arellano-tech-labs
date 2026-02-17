import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export const useGSAP = (callback, deps = []) => {
    const contextRef = useRef();

    useEffect(() => {
        contextRef.current = gsap.context(() => {
            callback(gsap, ScrollTrigger);
        });

        return () => contextRef.current.revert();
    }, deps);

    return contextRef;
};

export default useGSAP;
