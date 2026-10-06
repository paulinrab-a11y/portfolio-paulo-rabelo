import type { Idioma } from '@/data/idiomas';

/**
 * Bandeiras simplificadas (desenho próprio em SVG, sem emoji): Brasil para
 * português, Estados Unidos para inglês, Espanha para espanhol e China para
 * chinês simplificado. Decorativas: quem nomeia o idioma é o texto ao lado.
 */

/** Estrela de cinco pontas em (cx, cy), com uma ponta voltada para o ângulo dado (graus) */
function estrela(cx: number, cy: number, r: number, angulo = -90) {
  const pontos = Array.from({ length: 10 }, (_, i) => {
    const a = ((angulo + i * 36) * Math.PI) / 180;
    const raio = i % 2 === 0 ? r : r * 0.382;
    return `${(cx + raio * Math.cos(a)).toFixed(2)},${(cy + raio * Math.sin(a)).toFixed(2)}`;
  });
  return `M${pontos.join('L')}Z`;
}

/** Bandeira da China na grade oficial de 30 × 20: as estrelas pequenas apontam para a grande */
const estrelasChina = [
  estrela(5, 5, 3),
  ...[
    [10, 2],
    [12, 4],
    [12, 7],
    [10, 9],
  ].map(([x, y]) => estrela(x, y, 1, (Math.atan2(5 - y, 5 - x) * 180) / Math.PI)),
].join('');
export function Bandeira({ lang, className = '' }: { lang: Idioma; className?: string }) {
  const classe = `h-[14px] w-[21px] shrink-0 rounded-[2px] ${className}`;
  if (lang === 'pt') {
    return (
      <svg viewBox="0 0 30 20" className={classe} aria-hidden="true" focusable="false">
        <rect width="30" height="20" fill="#009b3a" />
        <path d="M15 2.4 27 10 15 17.6 3 10z" fill="#fedf00" />
        <circle cx="15" cy="10" r="4.4" fill="#002776" />
        <path d="M10.8 9.2c2.8-.9 5.8-.6 8.4.9" stroke="#fff" strokeWidth="0.9" fill="none" />
      </svg>
    );
  }
  if (lang === 'en') {
    return (
      <svg viewBox="0 0 30 20" className={classe} aria-hidden="true" focusable="false">
        <rect width="30" height="20" fill="#fff" />
        {[0, 2, 4, 6, 8, 10, 12].map((i) => (
          <rect key={i} y={(i * 20) / 13} width="30" height={20 / 13} fill="#b22234" />
        ))}
        <rect width="13" height={(20 / 13) * 7} fill="#3c3b6e" />
      </svg>
    );
  }
  if (lang === 'zh') {
    return (
      <svg viewBox="0 0 30 20" className={classe} aria-hidden="true" focusable="false">
        <rect width="30" height="20" fill="#ee1c25" />
        <path d={estrelasChina} fill="#ffff00" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 30 20" className={classe} aria-hidden="true" focusable="false">
      <rect width="30" height="20" fill="#aa151b" />
      <rect y="5" width="30" height="10" fill="#f1bf00" />
    </svg>
  );
}
