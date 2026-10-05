import { describe, expect, it } from 'vitest';
import { ehVideo, type Midia, midia, proporcao, temMidia, todasAsMidias } from './midia';

const video: Midia = {
  orientation: 'horizontal',
  width: 1150,
  height: 640,
  poster: { avif: '/p.avif', jpg: '/p.jpg' },
  preview: { mp4: '/v.mp4', duration: 7 },
  full: null,
};
const foto: Midia = { ...video, orientation: 'imagem', preview: null, full: null, images: [{ src: '/c.avif', width: 10, height: 10, label: 'capa' }] };
const fonte = { video, foto };

describe('midia', () => {
  it('acha pelo slug', () => {
    expect(midia('video', fonte)).toBe(video);
    expect(temMidia('foto', fonte)).toBe(true);
    expect(temMidia('nada', fonte)).toBe(false);
  });

  it('avisa quando a pasta não existe', () => {
    expect(() => midia('nada', fonte)).toThrow(/nada/);
  });

  it('distingue vídeo de imagem', () => {
    expect(ehVideo(video)).toBe(true);
    expect(ehVideo(foto)).toBe(false);
    expect(ehVideo({ ...foto, full: { mp4: '/f.mp4', duration: 30 } })).toBe(true);
  });

  it('proporção para o CSS', () => {
    expect(proporcao(video)).toBe('1150 / 640');
  });

  it('lista todas', () => {
    expect(todasAsMidias(fonte)).toHaveLength(2);
  });

  it('o manifesto real carrega', () => {
    expect(todasAsMidias().length).toBeGreaterThan(0);
  });
});
