import { describe, expect, it } from 'vitest';
import { duracaoCurta, segundosDoTimecode, timecode } from './timecode';

describe('timecode', () => {
  it('começa em zero', () => {
    expect(timecode(0)).toBe('00:00:00:00');
  });

  it('conta quadros a 30 fps pelo tempo', () => {
    expect(timecode(1000 / 30)).toBe('00:00:00:01');
    expect(timecode(1500)).toBe('00:00:01:15');
  });

  it('vira minutos e horas', () => {
    expect(timecode(61_000)).toBe('00:01:01:00');
    expect(timecode(3_600_000 + 2_000)).toBe('01:00:02:00');
  });

  it('nunca fica negativo', () => {
    expect(timecode(-500)).toBe('00:00:00:00');
  });

  it('aceita outra taxa de quadros', () => {
    expect(timecode(500, 24)).toBe('00:00:00:12');
  });
});

describe('segundosDoTimecode', () => {
  it('converte de volta', () => {
    expect(segundosDoTimecode('00:03:25:15')).toBeCloseTo(205.5);
    expect(segundosDoTimecode('01:00:00;00')).toBe(3600);
  });

  it('recusa formato inválido', () => {
    expect(segundosDoTimecode('3:25')).toBeNaN();
  });

  it('é o inverso de timecode', () => {
    expect(timecode(segundosDoTimecode('00:54:08:12') * 1000)).toBe('00:54:08:12');
  });
});

describe('duracaoCurta', () => {
  it('formata minutos e segundos', () => {
    expect(duracaoCurta(42)).toBe('0:42');
    expect(duracaoCurta(725.4)).toBe('12:05');
    expect(duracaoCurta(-3)).toBe('0:00');
  });
});
