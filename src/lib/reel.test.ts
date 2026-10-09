import { describe, expect, it } from 'vitest';
import { corteNoTempo, cortesDoReel } from './reel';

const trechos = [
  { from: 'vis', in: '00:06:59:06', out: '00:07:00:18' }, // 1,4 s
  { from: 'pod', in: '00:09:53:00', out: '00:09:54:15' }, // 1,5 s
  { from: 'x', in: '00:00:00:00', out: '00:00:01:00' }, // 1 s sem trabalho
  { from: 'yt', in: '00:59:10:15', out: '00:59:12:00' }, // 1,5 s
];

describe('cortesDoReel', () => {
  it('põe os cortes em sequência no loop e mapeia para o trabalho', () => {
    const c = cortesDoReel(trechos);
    expect(c.map((x) => x.slug)).toEqual(['visualizer-anjo005', 'podcast-opiniao-segura-laad', 'youtube-constance-silksong']);
    expect(c[0].inicio).toBe(0);
    expect(c[0].fim).toBeCloseTo(1.4, 5);
    expect(c[1].fim).toBeCloseTo(2.9, 5);
    // O trecho sem trabalho ocupa tempo, mas não vira corte
    expect(c[2].inicio).toBeCloseTo(3.9, 5);
    expect(c[2].fim).toBeCloseTo(5.4, 5);
  });

  it('ignora trecho com tempo inválido', () => {
    expect(cortesDoReel([{ from: 'vis', in: 'x', out: '00:00:01:00' }])).toEqual([]);
  });
});

describe('corteNoTempo', () => {
  const c = cortesDoReel(trechos);

  it('acha o corte do tempo e volta ao começo no fim do loop', () => {
    expect(corteNoTempo(c, 0)).toBe(0);
    expect(corteNoTempo(c, 1.5)).toBe(1);
    expect(corteNoTempo(c, 4)).toBe(2);
    expect(corteNoTempo(c, 5.4 + 0.1)).toBe(0);
  });

  it('no buraco de um trecho sem trabalho, fica com o último corte e sem lista devolve -1', () => {
    expect(corteNoTempo(c, 3.2)).toBe(2);
    expect(corteNoTempo([], 1)).toBe(-1);
  });
});
