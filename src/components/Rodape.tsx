import Link from 'next/link';
import type { Idioma } from '@/data/idiomas';
import { servicos } from '@/data/servicos';
import { trabalhos } from '@/data/trabalhos';
import { perfilNo, servicoEm, t } from '@/lib/i18n';
import { caminho } from '@/lib/rotas';
import { servicosComTrabalho } from '@/lib/servicos';

export function Rodape({ lang }: { lang: Idioma }) {
  const tx = t(lang);
  const p = perfilNo(lang);
  return (
    <footer className="sem-impressao margem grid gap-8 border-t border-linha bg-black py-10 md:grid-cols-12">
      <nav aria-label={tx.nav.servicos} className="md:col-span-8">
        <ul className="rotulo flex flex-wrap gap-x-6 gap-y-3 text-cinza">
          {servicosComTrabalho(servicos, trabalhos).map((s) => (
            <li key={s.slug}>
              <Link href={caminho(lang, { pagina: 'servicos', servico: s.slug })} className="hover:text-creme">
                {servicoEm(s, lang).nome}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <ul className="rotulo flex flex-wrap gap-x-6 gap-y-3 text-cinza md:col-span-4 md:justify-end">
        <li>
          <a href={p.contato.whatsapp.href} target="_blank" rel="noopener noreferrer" className="hover:text-creme">
            WhatsApp
          </a>
        </li>
        <li>
          <a href={p.contato.email.href} className="hover:text-creme">
            {p.contato.email.rotulo}
          </a>
        </li>
        <li>
          <a href={p.contato.linkedin.href} target="_blank" rel="noopener noreferrer" className="hover:text-creme">
            LinkedIn
          </a>
        </li>
        <li>
          <Link href={caminho(lang, { pagina: 'cv' })} className="hover:text-creme">
            {tx.nav.cv}
          </Link>
        </li>
      </ul>
      <p className="rotulo text-cinza md:col-span-12">
        {p.nome} · {p.cidade}
      </p>
    </footer>
  );
}
