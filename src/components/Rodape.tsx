import Link from 'next/link';
import { contato, perfil } from '@/data/perfil';

export function Rodape() {
  return (
    <footer className="margem flex flex-col gap-4 border-t border-linha bg-black py-8 md:flex-row md:items-center md:justify-between">
      <p className="rotulo text-cinza">
        {perfil.nome} · {perfil.cidade}
      </p>
      <ul className="rotulo flex flex-wrap gap-x-6 gap-y-2 text-cinza">
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
    </footer>
  );
}
