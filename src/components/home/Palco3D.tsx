'use client';

import { type RefObject, useEffect, useRef } from 'react';

interface Props {
  /** Pôsteres dos destaques, na ordem da película */
  posters: string[];
  /** Progresso da película (0 a 1), escrito pelo ScrollTrigger de Selecionados */
  progresso: RefObject<number>;
}

const REC = 0xe23e3a;
const PRETO = 0x0b0b0c;

/**
 * Palco 3D atrás da película dos destaques: um rolo de filme e a fita com os
 * pôsteres dos trabalhos. A rolagem gira o rolo e corre a fita; o mouse
 * inclina a câmera de leve. Só monta onde a película corre (desktop com
 * movimento liberado; quem decide é Selecionados) e o Three.js só baixa aí.
 * Sem WebGL, a seção fica como antes.
 */
export function Palco3D({ posters, progresso }: Props) {
  const tela = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = tela.current;
    if (!canvas) return;
    let parar = () => {};
    let cancelado = false;

    import('three').then((THREE) => {
      if (cancelado) return;
      let renderer: InstanceType<typeof THREE.WebGLRenderer>;
      try {
        renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
      } catch {
        return;
      }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.outputColorSpace = THREE.SRGBColorSpace;

      const cena = new THREE.Scene();
      cena.fog = new THREE.Fog(PRETO, 9, 22);
      const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 60);

      cena.add(new THREE.AmbientLight(0xffffff, 0.35));
      const chave = new THREE.DirectionalLight(0xfff1dc, 2.2);
      chave.position.set(-4, 6, 8);
      cena.add(chave);
      const contra = new THREE.PointLight(REC, 60, 30, 1.6);
      contra.position.set(5, -1, -4);
      cena.add(contra);

      // Rolo: disco com cinco janelas e o furo do eixo, em metal escuro
      const disco = new THREE.Shape();
      disco.absarc(0, 0, 2.4, 0, Math.PI * 2, false);
      const eixo = new THREE.Path();
      eixo.absarc(0, 0, 0.32, 0, Math.PI * 2, true);
      disco.holes.push(eixo);
      for (let i = 0; i < 5; i++) {
        const a = (i / 5) * Math.PI * 2;
        const janela = new THREE.Path();
        janela.absarc(Math.cos(a) * 1.35, Math.sin(a) * 1.35, 0.62, 0, Math.PI * 2, true);
        disco.holes.push(janela);
      }
      const geoDisco = new THREE.ExtrudeGeometry(disco, { depth: 0.08, bevelEnabled: true, bevelThickness: 0.03, bevelSize: 0.03, bevelSegments: 2, curveSegments: 48 });
      geoDisco.center();
      const metal = new THREE.MeshStandardMaterial({ color: 0x2a2a2e, metalness: 0.85, roughness: 0.32 });
      const rolo = new THREE.Group();
      const frente = new THREE.Mesh(geoDisco, metal);
      frente.position.z = 0.34;
      const verso = new THREE.Mesh(geoDisco, metal);
      verso.position.z = -0.34;
      // Miolo enrolado: filme acumulado entre os dois discos
      const geoMiolo = new THREE.CylinderGeometry(1.55, 1.55, 0.6, 64, 1, false);
      geoMiolo.rotateX(Math.PI / 2);
      const pelicula = new THREE.MeshStandardMaterial({ color: 0x151517, metalness: 0.2, roughness: 0.55 });
      rolo.add(frente, verso, new THREE.Mesh(geoMiolo, pelicula));
      rolo.position.set(4.2, 0.4, -3);
      rolo.rotation.y = -0.55;
      cena.add(rolo);

      // Fita: sai do rolo e atravessa a cena em curva, com os quadros dos trabalhos
      const caminho = new THREE.CatmullRomCurve3([
        new THREE.Vector3(4.2, -0.6, -3.4),
        new THREE.Vector3(2, -0.9, -2.6),
        new THREE.Vector3(-0.6, -0.3, -2.4),
        new THREE.Vector3(-3.4, 0.6, -3),
        new THREE.Vector3(-6.2, 1.4, -4.6),
        new THREE.Vector3(-9, 2.2, -7),
      ]);
      const SEG = 240;
      const LARG = 0.95;
      const pos: number[] = [];
      const uv: number[] = [];
      const idx: number[] = [];
      const cima = new THREE.Vector3(0, 1, 0.25).normalize();
      for (let i = 0; i <= SEG; i++) {
        const u = i / SEG;
        const p = caminho.getPointAt(u);
        const t = caminho.getTangentAt(u);
        // Torção leve ao longo da fita
        const lado = new THREE.Vector3()
          .crossVectors(t, cima)
          .normalize()
          .applyAxisAngle(t, Math.sin(u * Math.PI * 2) * 0.5);
        const b = new THREE.Vector3().crossVectors(lado, t).normalize();
        pos.push(p.x + b.x * LARG * 0.5, p.y + b.y * LARG * 0.5, p.z + b.z * LARG * 0.5, p.x - b.x * LARG * 0.5, p.y - b.y * LARG * 0.5, p.z - b.z * LARG * 0.5);
        uv.push(u, 1, u, 0);
        if (i < SEG) {
          const k = i * 2;
          idx.push(k, k + 1, k + 2, k + 1, k + 3, k + 2);
        }
      }
      const geoFita = new THREE.BufferGeometry();
      geoFita.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
      geoFita.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
      geoFita.setIndex(idx);
      geoFita.computeVertexNormals();

      // Textura da fita: perfurações e um quadro por trabalho, desenhados num canvas
      const QW = 360;
      const QH = 240;
      const tex2d = document.createElement('canvas');
      tex2d.width = QW * Math.max(posters.length, 1);
      tex2d.height = QH;
      const ctx = tex2d.getContext('2d');
      const textura = new THREE.CanvasTexture(tex2d);
      textura.colorSpace = THREE.SRGBColorSpace;
      textura.wrapS = THREE.RepeatWrapping;
      textura.repeat.set(3, 1);
      textura.anisotropy = 4;
      if (ctx) {
        ctx.fillStyle = '#0b0b0c';
        ctx.fillRect(0, 0, tex2d.width, QH);
        ctx.fillStyle = '#f3efe4';
        for (let x = 8; x < tex2d.width; x += 30) {
          ctx.fillRect(x, 10, 14, 18);
          ctx.fillRect(x, QH - 28, 14, 18);
        }
      }
      posters.forEach((src, i) => {
        const img = new Image();
        img.decoding = 'async';
        img.onload = () => {
          if (!ctx || cancelado) return;
          // Recorta para o quadro (cover), sem recolorir a peça
          const x0 = i * QW + 14;
          const w = QW - 28;
          const h = QH - 80;
          const r = Math.max(w / img.width, h / img.height);
          const sw = w / r;
          const sh = h / r;
          ctx.drawImage(img, (img.width - sw) / 2, (img.height - sh) / 2, sw, sh, x0, 40, w, h);
          textura.needsUpdate = true;
        };
        img.src = src;
      });
      const matFita = new THREE.MeshStandardMaterial({ map: textura, color: 0x8a8a8a, side: THREE.DoubleSide, metalness: 0.1, roughness: 0.5 });
      cena.add(new THREE.Mesh(geoFita, matFita));

      // Poeira de luz no ar, bem pouca
      const N = 180;
      const pts = new Float32Array(N * 3);
      for (let i = 0; i < N; i++) {
        pts[i * 3] = (Math.random() - 0.5) * 20;
        pts[i * 3 + 1] = (Math.random() - 0.5) * 9;
        pts[i * 3 + 2] = -Math.random() * 10;
      }
      const geoPoeira = new THREE.BufferGeometry();
      geoPoeira.setAttribute('position', new THREE.BufferAttribute(pts, 3));
      const matPoeira = new THREE.PointsMaterial({ color: 0xf3efe4, size: 0.025, transparent: true, opacity: 0.5 });
      const poeira = new THREE.Points(geoPoeira, matPoeira);
      cena.add(poeira);

      const medir = () => {
        const { clientWidth: w, clientHeight: h } = canvas;
        if (!w || !h) return;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      };
      medir();
      const ro = new ResizeObserver(medir);
      ro.observe(canvas);

      const mouse = { x: 0, y: 0 };
      const mover = (e: PointerEvent) => {
        mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouse.y = (e.clientY / window.innerHeight) * 2 - 1;
      };
      window.addEventListener('pointermove', mover, { passive: true });

      let visivel = false;
      const io = new IntersectionObserver(([e]) => {
        visivel = e.isIntersecting;
      });
      io.observe(canvas);

      const suave = { p: progresso.current ?? 0, mx: 0, my: 0 };
      const relogio = new THREE.Clock();
      let quadro = 0;
      const desenhar = () => {
        quadro = requestAnimationFrame(desenhar);
        if (!visivel || document.hidden) {
          relogio.getDelta();
          return;
        }
        const dt = Math.min(relogio.getDelta(), 1 / 30);
        const k = 1 - Math.exp(-5.2 * dt);
        suave.p += ((progresso.current ?? 0) - suave.p) * k;
        suave.mx += (mouse.x - suave.mx) * k;
        suave.my += (mouse.y - suave.my) * k;
        const p = suave.p;
        const tempo = relogio.elapsedTime;
        rolo.rotation.z = -p * Math.PI * 4 - tempo * 0.05;
        textura.offset.x = -p * 2.2 - tempo * 0.004;
        poeira.rotation.y = tempo * 0.01;
        // Câmera: começa perto do rolo e abre para a fita inteira
        camera.position.set(1.2 - p * 2.4 + suave.mx * 0.5, 0.4 - p * 0.3 - suave.my * 0.3, 8.5 + p * 1.5);
        camera.lookAt(-0.4 - p * 1.2, -0.1, -2.2);
        contra.intensity = 45 + Math.sin(tempo * 1.3) * 8;
        renderer.render(cena, camera);
      };
      desenhar();

      parar = () => {
        cancelAnimationFrame(quadro);
        ro.disconnect();
        io.disconnect();
        window.removeEventListener('pointermove', mover);
        for (const g of [geoDisco, geoMiolo, geoFita, geoPoeira]) g.dispose();
        for (const m of [metal, pelicula, matFita, matPoeira]) m.dispose();
        textura.dispose();
        renderer.dispose();
      };
    });

    return () => {
      cancelado = true;
      parar();
    };
  }, [posters, progresso]);

  return <canvas ref={tela} data-palco-3d className="pointer-events-none absolute inset-0 h-full w-full" />;
}
