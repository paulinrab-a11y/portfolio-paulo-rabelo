import type { Idioma } from '@/data/idiomas';

/**
 * Bandeiras simplificadas (desenho próprio em SVG, sem emoji): Brasil para
 * português, Estados Unidos para inglês e Espanha para espanhol. Decorativas:
 * quem nomeia o idioma é o texto ao lado.
 */
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
  return (
    <svg viewBox="0 0 30 20" className={classe} aria-hidden="true" focusable="false">
      <rect width="30" height="20" fill="#aa151b" />
      <rect y="5" width="30" height="10" fill="#f1bf00" />
    </svg>
  );
}
