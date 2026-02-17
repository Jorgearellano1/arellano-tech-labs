import anime from 'animejs';

/**
 * Discord-style bounce animation
 * @param {string} target - CSS selector or DOM element
 * @param {object} options - Animation options
 */
export const discordBounce = (target, options = {}) => {
    return anime({
        targets: target,
        scale: [
            { value: 0.9, duration: 100 },
            { value: 1.1, duration: 200 },
            { value: 1.05, duration: 150 },
            { value: 1.03, duration: 100 },
            { value: 1, duration: 100 }
        ],
        easing: 'spring(1, 80, 10, 0)',
        ...options
    });
};

/**
 * Apple-style smooth fade in
 * @param {string} target - CSS selector or DOM element
 * @param {object} options - Animation options
 */
export const appleFadeIn = (target, options = {}) => {
    return anime({
        targets: target,
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 800,
        easing: 'cubicBezier(0.25, 0.46, 0.45, 0.94)',
        ...options
    });
};

/**
 * Discord-style slide in animation
 * @param {string} target - CSS selector or DOM element
 * @param {object} options - Animation options
 */
export const discordSlideIn = (target, options = {}) => {
    return anime({
        targets: target,
        opacity: [0, 1],
        translateY: [-10, 0],
        scale: [0.95, 1.02, 1],
        duration: 300,
        easing: 'cubicBezier(0.34, 1.56, 0.64, 1)',
        ...options
    });
};

/**
 * Staggered animation for multiple elements
 * @param {string} target - CSS selector or DOM element
 * @param {object} options - Animation options
 */
export const staggerAnimation = (target, options = {}) => {
    return anime({
        targets: target,
        opacity: [0, 1],
        translateY: [30, 0],
        delay: anime.stagger(100, { start: 200 }),
        duration: 600,
        easing: 'cubicBezier(0.34, 1.56, 0.64, 1)',
        ...options
    });
};

/**
 * Hover glow effect
 * @param {string} target - CSS selector or DOM element
 */
export const hoverGlow = (target) => {
    const element = document.querySelector(target);

    if (!element) return;

    element.addEventListener('mouseenter', () => {
        anime({
            targets: element,
            boxShadow: '0 0 30px rgba(88, 101, 242, 0.6)',
            duration: 200,
            easing: 'easeOutQuad'
        });
    });

    element.addEventListener('mouseleave', () => {
        anime({
            targets: element,
            boxShadow: '0 0 0px rgba(88, 101, 242, 0)',
            duration: 200,
            easing: 'easeOutQuad'
        });
    });
};

/**
 * Parallax scroll effect
 * @param {string} target - CSS selector or DOM element
 * @param {number} speed - Parallax speed (0-1)
 */
export const parallaxScroll = (target, speed = 0.5) => {
    const element = document.querySelector(target);

    if (!element) return;

    const handleScroll = () => {
        const scrollY = window.scrollY;
        const offset = scrollY * speed;
        element.style.transform = `translateY(${offset}px)`;
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
};

/**
 * Magnetic button effect (follows cursor)
 * @param {string} target - CSS selector or DOM element
 */
export const magneticButton = (target) => {
    const button = document.querySelector(target);

    if (!button) return;

    button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        anime({
            targets: button,
            translateX: x * 0.3,
            translateY: y * 0.3,
            duration: 200,
            easing: 'easeOutQuad'
        });
    });

    button.addEventListener('mouseleave', () => {
        anime({
            targets: button,
            translateX: 0,
            translateY: 0,
            duration: 300,
            easing: 'spring(1, 80, 10, 0)'
        });
    });
};

/**
 * Text reveal animation
 * @param {string} target - CSS selector or DOM element
 * @param {object} options - Animation options
 */
export const textReveal = (target, options = {}) => {
    const element = document.querySelector(target);

    if (!element) return;

    const text = element.textContent;
    element.innerHTML = text
        .split('')
        .map(char => `<span class="char">${char === ' ' ? '&nbsp;' : char}</span>`)
        .join('');

    return anime({
        targets: `${target} .char`,
        opacity: [0, 1],
        translateY: [20, 0],
        delay: anime.stagger(30),
        duration: 600,
        easing: 'cubicBezier(0.25, 0.46, 0.45, 0.94)',
        ...options
    });
};

export default {
    discordBounce,
    appleFadeIn,
    discordSlideIn,
    staggerAnimation,
    hoverGlow,
    parallaxScroll,
    magneticButton,
    textReveal
};
