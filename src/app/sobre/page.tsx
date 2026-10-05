import type { Metadata } from 'next';
import Link from 'next/link';
import { contato, experiencias, formacao, perfil } from '@/data/perfil';

export const metadata: Metadata = {
  title: 'Sobre',
  description: 'Paulo Rabelo: editor de vídeo, motion designer e diretor de arte em São Paulo. Experiência, formação e ferramentas.',
  alternates: { canonical: '/sobre' },
};

export default function Sobre() {
  const lista = experiencias.filter((e) => !e.soNoCV);
  return (
    <>
      <section aria-labelledby="sobre-titulo" className="margem grade gap-y-10 pt-[calc(var(--cabecalho)+clamp(48px,10vh,120px))] pb-20">
        <div className="col-span-12 lg:col-span-7">
          <p className="rotulo mb-3 text-rec">Sobre</p>
          <h1 id="sobre-titulo" className="titulo-display text-[clamp(64px,12vw,184px)]">
            Paulo Rabelo
          </h1>
          <p className="mt-6 font-mono text-cinza">
            {perfil.funcaoCurta} · {perfil.cidade}
          </p>
        </div>
        <div className="col-span-12 space-y-5 self-end text-xl leading-relaxed lg:col-span-5">
          {perfil.bio.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <p className="text-cinza">{perfil.disponibilidade}</p>
        </div>
      </section>

      <section aria-labelledby="experiencia" className="cartela margem py-20">
        <div className="grade gap-y-8">
          <h2 id="experiencia" className="rotulo secundario col-span-12 lg:col-span-3">
            Experiência
          </h2>
          <ol className="col-span-12 lg:col-span-9">
            {lista.map((e) => (
              <li key={`${e.empresa}${e.cargo}`} className="grid grid-cols-12 gap-x-4 gap-y-1 border-t border-preto/15 py-6">
                <span className="rotulo secundario col-span-12 tabular-nums md:col-span-3 md:pt-2">{e.periodo}</span>
                <div className="col-span-12 md:col-span-9">
                  <h3 className="titulo-display text-[clamp(30px,3.6vw,52px)]">{e.empresa}</h3>
                  <p className="mt-1 text-lg">{e.cargo}</p>
                  {e.detalhe && <p className="secundario mt-2">{e.detalhe}</p>}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-label="Formação e ferramentas" className="margem grade gap-y-12 py-20">
        <div className="col-span-12 md:col-span-6">
          <h2 className="rotulo mb-5 text-cinza">Formação</h2>
          <p className="text-xl">
            {formacao.graduacao.curso}, {formacao.graduacao.instituicao} ({formacao.graduacao.ano})
          </p>
          <p className="mt-4 text-cinza">
            {formacao.cursos.instituicao}: {formacao.cursos.lista.join(', ')}.
          </p>
        </div>
        <div className="col-span-12 md:col-span-6">
          <h2 className="rotulo mb-5 text-cinza">Ferramentas</h2>
          <ul className="flex flex-wrap gap-2">
            {perfil.ferramentas.map((f) => (
              <li key={f} className="rotulo border border-linha px-3 py-2">
                {f}
              </li>
            ))}
          </ul>
          <h2 className="rotulo mt-10 mb-5 text-cinza">O que eu faço</h2>
          <p className="text-lg">{perfil.servicos.join(' · ')}</p>
        </div>
        <div className="col-span-12 flex flex-wrap gap-3">
          <a href={contato.whatsapp.href} target="_blank" rel="noopener noreferrer" className="botao botao-rec">
            Falar no WhatsApp
          </a>
          <Link href="/cv" className="botao text-creme">
            Ver CV
          </Link>
        </div>
      </section>
    </>
  );
}
