import { Abertura } from '@/components/home/Abertura';
import { Creditos } from '@/components/home/Creditos';
import { Fim } from '@/components/home/Fim';
import { Heroi } from '@/components/home/Heroi';
import { Manifesto } from '@/components/home/Manifesto';
import { Selecionados } from '@/components/home/Selecionados';
import { SobreResumo } from '@/components/home/SobreResumo';
import { Timeline } from '@/components/home/Timeline';
import { trabalhos } from '@/data/trabalhos';
import { destaques } from '@/lib/trabalhos';

export default function Home() {
  return (
    <>
      <Abertura />
      <Heroi />
      <Manifesto />
      <Selecionados itens={destaques(trabalhos)} />
      <Timeline lista={trabalhos} />
      <Creditos />
      <SobreResumo />
      <Fim />
    </>
  );
}
