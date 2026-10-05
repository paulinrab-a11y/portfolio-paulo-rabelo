'use client';

/** GSAP Flip fica fora de motion.ts: só /trabalhos usa, e a home não precisa baixar. */
import { Flip } from 'gsap/Flip';
import { gsap } from './motion';

if (typeof window !== 'undefined') gsap.registerPlugin(Flip);

export { Flip };
