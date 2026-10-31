"use client";
import { useEffect, useRef } from "react";

/** Original procedural orbital; lightweight CSS fallback works without WebGL or motion. */
export function Orbital({ compact = false }: { compact?: boolean }) {
  const host = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = host.current;
    if (!node || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let active = true;
    let teardown = () => {};
    import("three").then(T => {
      if (!active) return;
      let renderer: InstanceType<typeof T.WebGLRenderer>;
      try { renderer = new T.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "low-power" }); }
      catch { return; }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.setClearColor(0x000000, 0);
      renderer.outputColorSpace = T.SRGBColorSpace;
      node.appendChild(renderer.domElement);
      renderer.domElement.setAttribute("aria-hidden", "true");
      const scene = new T.Scene();
      const camera = new T.PerspectiveCamera(38, 1, .1, 100);
      camera.position.z = 9;
      const rig = new T.Group(); scene.add(rig);
      const coreMaterial = new T.MeshPhysicalMaterial({ color: 0xb1e454, metalness: .24, roughness: .28, clearcoat: .95, clearcoatRoughness: .12 });
      const blackMaterial = new T.MeshStandardMaterial({ color: 0x20231e, metalness: .5, roughness: .33, side: T.DoubleSide });
      const wireMaterial = new T.MeshBasicMaterial({ color: 0x272a23, wireframe: true, transparent: true, opacity: .2 });
      const core = new T.Mesh(new T.TorusKnotGeometry(1.3, .34, 170, 12, 2, 3), coreMaterial);
      rig.add(core);
      const ringA = new T.Mesh(new T.TorusGeometry(2.28, .045, 8, 110), blackMaterial); ringA.rotation.x = .9; rig.add(ringA);
      const ringB = new T.Mesh(new T.TorusGeometry(2.64, .012, 5, 120), blackMaterial); ringB.rotation.set(.17, .7, .3); rig.add(ringB);
      const cage = new T.Mesh(new T.IcosahedronGeometry(2.1, 1), wireMaterial); rig.add(cage);
      scene.add(new T.AmbientLight(0xffffff, 1.7));
      const light = new T.PointLight(0xffffff, 78); light.position.set(3, 4, 5); scene.add(light);
      const back = new T.PointLight(0xc1f66a, 35); back.position.set(-3, -2, 1); scene.add(back);
      const resize = () => {
        const { clientWidth: w, clientHeight: h } = node;
        if (!w || !h) return;
        renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix();
      };
      const observer = new ResizeObserver(resize); observer.observe(node); resize();
      let visible = true; let raf = 0; let targetX = 0; let targetY = 0;
      const onPointer = (e: PointerEvent) => {
        const r = node.getBoundingClientRect();
        targetX = ((e.clientX - r.left) / r.width - .5) * .45;
        targetY = ((e.clientY - r.top) / r.height - .5) * .26;
      };
      const intersection = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; if (visible) frame(); else cancelAnimationFrame(raf); }, { threshold: .01 });
      intersection.observe(node);
      const clock = new T.Clock();
      function frame() {
        cancelAnimationFrame(raf);
        if (!visible || document.hidden) return;
        const t = clock.getElapsedTime();
        rig.rotation.y += ((t * .14 + targetX) - rig.rotation.y) * .045;
        rig.rotation.x += ((.15 + targetY) - rig.rotation.x) * .05;
        core.rotation.z = t * .06; ringB.rotation.z = t * .1; cage.rotation.y = t * -.05;
        renderer.render(scene, camera);
        raf = requestAnimationFrame(frame);
      }
      node.addEventListener("pointermove", onPointer, { passive: true });
      const onVisibility = () => { if (document.hidden) cancelAnimationFrame(raf); else frame(); };
      document.addEventListener("visibilitychange", onVisibility); frame();
      teardown = () => {
        cancelAnimationFrame(raf); observer.disconnect(); intersection.disconnect(); node.removeEventListener("pointermove", onPointer);
        document.removeEventListener("visibilitychange", onVisibility);
        core.geometry.dispose(); ringA.geometry.dispose(); ringB.geometry.dispose(); cage.geometry.dispose();
        coreMaterial.dispose(); blackMaterial.dispose(); wireMaterial.dispose(); renderer.dispose();
        renderer.domElement.remove();
      };
    }).catch(() => {});
    return () => { active = false; teardown(); };
  }, []);
  return <div ref={host} className={`orbital-canvas ${compact ? "orbital-compact" : ""}`} aria-hidden="true"><div className="orbital-fallback"><span/><span/><span/><b>✳</b></div></div>;
}
