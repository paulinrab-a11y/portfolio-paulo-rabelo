import { serializarLd } from '@/lib/seo';

/** Dados estruturados da página (gerados em src/lib/seo.ts) */
export function JsonLd({ dados }: { dados: Record<string, unknown> | Record<string, unknown>[] }) {
  // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD de dados fixos do site, com < escapado em serializarLd
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializarLd(dados) }} />;
}
