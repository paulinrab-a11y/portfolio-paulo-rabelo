import { ViewTransition } from 'react';

/** Troca de página com letterbox (globals.css). Sem suporte, troca sem animar. */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition enter="pagina-entra" exit="pagina-sai" default="none">
      <div>{children}</div>
    </ViewTransition>
  );
}
