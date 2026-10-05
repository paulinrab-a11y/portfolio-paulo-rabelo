const DIGITOS = '0123456789';

/**
 * Texto que se monta letra a letra a partir de dígitos de timecode.
 * `progresso` vai de 0 (só dígitos) a 1 (texto final). Espaços e pontuação
 * ficam sempre no lugar. `sorteio` muda os dígitos a cada quadro sem
 * depender de Math.random (o resultado é previsível para teste).
 */
export function montarDeDigitos(alvo: string, progresso: number, sorteio = 0): string {
  const p = Math.min(1, Math.max(0, progresso));
  const letras = [...alvo];
  const visiveis = letras.filter((c) => /\S/.test(c)).length;
  const prontas = Math.floor(p * visiveis);
  let indice = 0;
  return letras
    .map((c, i) => {
      if (!/\S/.test(c)) return c;
      const pronta = indice < prontas;
      indice += 1;
      if (pronta || p === 1) return c;
      return DIGITOS[(i * 7 + sorteio * 3) % DIGITOS.length];
    })
    .join('');
}
