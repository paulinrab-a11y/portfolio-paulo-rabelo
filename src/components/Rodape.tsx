import Link from 'next/link';
import { contato, perfil } from '@/data/perfil';
import { servicos } from '@/data/servicos';
import { trabalhos } from '@/data/trabalhos';
import { servicosComTrabalho } from '@/lib/servicos';

export function Rodape() {
  return (
    <footer className="margem grid gap-8 border-t border-linha bg-black py-10 md:grid-cols-12">
      <nav aria-label="Serviços" className="md:col-span-8">
        <ul className="rotulo flex flex-wrap gap-x-6 gap-y-3 text-cinza">
          {servicosComTrabalho(servicos, trabalhos).map((s) => (
            <li key={s.slug}>
              <Link href={`/servicos/${s.slug}`} className="hover:text-creme">
                {s.nome}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <ul className="rotulo flex flex-wrap gap-x-6 gap-y-3 text-cinza md:col-span-4 md:justify-end">
        <li>
          <a href={contato.whatsapp.href} target="_blank" rel="noopener noreferrer" className="hover:text-creme">
            WhatsApp
          </a>
        </li>
        <li>
          <a href={contato.email.href} className="hover:text-creme">
            E-mail
          </a>
        </li>
        <li>
          <a href={contato.linkedin.href} target="_blank" rel="noopener noreferrer" className="hover:text-creme">
            LinkedIn
          </a>
        </li>
        <li>
          <Link href="/cv" className="hover:text-creme">
            CV
          </Link>
        </li>
      </ul>
      <p className="rotulo text-cinza md:col-span-12">
        {perfil.nome} · {perfil.cidade}
      </p>
    </footer>
  );
}
