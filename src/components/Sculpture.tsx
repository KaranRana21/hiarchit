"use client";
import { useEffect, useRef } from "react";

/** Procedural art. No reference site's assets or models. */
export function Sculpture() {
  const host = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = host.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let cleanup = () => {};
    let active = true;
    import("three").then((THREE) => {
      if (!active || !el) return;
      let renderer: InstanceType<typeof THREE.WebGLRenderer>;
      try { renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" }); }
      catch { return; }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.7));
      renderer.setClearColor(0x000000, 0);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      el.appendChild(renderer.domElement);
      renderer.domElement.setAttribute("aria-hidden", "true");
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
      camera.position.set(0, 0, 8.7);
      const rig = new THREE.Group(); scene.add(rig);
      const material = new THREE.MeshPhysicalMaterial({ color: 0xf97d54, metalness: 0.6, roughness: 0.25, clearcoat: 0.85, clearcoatRoughness: 0.12 });
      const wireMaterial = new THREE.MeshBasicMaterial({ color: 0xf9e8d2, wireframe: true, transparent: true, opacity: 0.16 });
      const inner = new THREE.Mesh(new THREE.TorusKnotGeometry(1.34, 0.39, 200, 16, 2, 5), material);
      rig.add(inner);
      const cage = new THREE.Mesh(new THREE.IcosahedronGeometry(2.43, 2), wireMaterial);
      rig.add(cage);
      const ringMaterial = new THREE.MeshBasicMaterial({ color: 0xe8dfd1, transparent: true, opacity: 0.43 });
      const ring = new THREE.Mesh(new THREE.TorusGeometry(2.06, 0.007, 6, 150), ringMaterial);
      ring.rotation.set(0.5, 0.2, -0.3); rig.add(ring);
      const ring2 = new THREE.Mesh(new THREE.TorusGeometry(2.5, 0.006, 6, 160), ringMaterial);
      ring2.rotation.set(1.2, 0.45, 0.2); rig.add(ring2);
      scene.add(new THREE.AmbientLight(0xffffff, 1.35));
      const key = new THREE.PointLight(0xffad7e, 85, 20); key.position.set(3, 5, 5); scene.add(key);
      const fill = new THREE.PointLight(0x678c9e, 60, 20); fill.position.set(-4, -3, 2); scene.add(fill);
      const resize = () => {
        const w = el.clientWidth, h = el.clientHeight;
        if (!w || !h) return;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.position.z = w < 520 ? 11 : 8.7;
        camera.updateProjectionMatrix();
      };
      const resizeObserver = new ResizeObserver(resize); resizeObserver.observe(el); resize();
      let pointerX = 0, pointerY = 0;
      const move = (e: PointerEvent) => { const box = el.getBoundingClientRect(); pointerX = (e.clientX - box.left) / box.width - 0.5; pointerY = (e.clientY - box.top) / box.height - 0.5; };
      el.addEventListener("pointermove", move, { passive: true });
      const clock = new THREE.Clock();
      let raf = 0;
      const tick = () => {
        const t = clock.getElapsedTime();
        rig.rotation.y += (t * 0.10 + pointerX * 0.24 - rig.rotation.y) * 0.035;
        rig.rotation.x += (0.11 + Math.sin(t * 0.25) * 0.09 - pointerY * 0.16 - rig.rotation.x) * 0.035;
        cage.rotation.y = -t * 0.045; cage.rotation.z = t * 0.025;
        inner.rotation.z = t * 0.055;
        renderer.render(scene, camera);
        raf = requestAnimationFrame(tick);
      };
      tick();
      const visibility = () => { if (document.hidden) cancelAnimationFrame(raf); else { cancelAnimationFrame(raf); tick(); } };
      document.addEventListener("visibilitychange", visibility);
      cleanup = () => {
        cancelAnimationFrame(raf); resizeObserver.disconnect();
        el.removeEventListener("pointermove", move); document.removeEventListener("visibilitychange", visibility);
        inner.geometry.dispose(); cage.geometry.dispose(); ring.geometry.dispose(); ring2.geometry.dispose();
        material.dispose(); wireMaterial.dispose(); ringMaterial.dispose(); renderer.dispose();
        if (renderer.domElement.parentNode === el) el.removeChild(renderer.domElement);
      };
    }).catch(() => {});
    return () => { active = false; cleanup(); };
  }, []);
  return <div className="sculpture" ref={host} aria-hidden="true"><div className="sculpture-static"><span className="static-ring"/><span className="static-core">✳</span></div></div>;
}
