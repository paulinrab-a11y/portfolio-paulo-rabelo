import type { MetadataRoute } from 'next';
import { abas, codigoHtml, idiomas } from '@/data/idiomas';
import { servicos } from '@/data/servicos';
import { trabalhos } from '@/data/trabalhos';
import { alternativas, type Ref } from '@/lib/rotas';
import { servicosComTrabalho } from '@/lib/servicos';
import { SITE_URL } from '@/lib/site';

/** Cada página nos três idiomas, com as alternativas (hreflang) ligando as versões */
export default function sitemap(): MetadataRoute.Sitemap {
  const refs: Ref[] = [
    { pagina: 'home' },
    { pagina: 'trabalhos' },
    ...abas.map((aba): Ref => ({ pagina: 'trabalhos', aba })),
    ...trabalhos.map((t): Ref => ({ pagina: 'trabalhos', trabalho: t.slug })),
    { pagina: 'servicos' },
    ...servicosComTrabalho(servicos, trabalhos).map((s): Ref => ({ pagina: 'servicos', servico: s.slug })),
    { pagina: 'sobre' },
    { pagina: 'cv' },
  ];
  return refs.flatMap((ref) => {
    const alt = alternativas(ref);
    const languages = Object.fromEntries(idiomas.map((l) => [codigoHtml[l], `${SITE_URL}${alt[l]}`]));
    return idiomas.map((l) => ({ url: `${SITE_URL}${alt[l]}`, alternates: { languages } }));
  });
}
