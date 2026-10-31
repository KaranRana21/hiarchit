'use client';
import {useEffect,useRef,useState} from 'react';

/** One deliberate 3D object: precision lines surround a human-centered core. */
export function Sculpture(){const canvas=useRef<HTMLCanvasElement>(null);const [ready,setReady]=useState(false);
 useEffect(()=>{
  const el=canvas.current;if(!el)return;
  const device=window.matchMedia('(max-width: 720px)').matches||window.matchMedia('(prefers-reduced-motion: reduce)').matches||!!((navigator as Navigator & {connection?:{saveData?:boolean}}).connection?.saveData);
  if(device)return;
  let killed=false;let dispose=()=>{};
  (async()=>{let THREE:typeof import('three');try{THREE=await import('three')}catch{return}
   if(killed||!el)return;
   let renderer:import('three').WebGLRenderer;
   try{renderer=new THREE.WebGLRenderer({canvas:el,antialias:true,alpha:true,powerPreference:'low-power'})}catch{return}
   renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.6));renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.6;
   const scene=new THREE.Scene();const camera=new THREE.PerspectiveCamera(33,1,.1,100);camera.position.set(0,0,9.6);
   scene.add(new THREE.AmbientLight(0xf8eeeb,.8));
   const lamp=new THREE.PointLight(0xffffff,85,40);lamp.position.set(-3,4,7);scene.add(lamp);
   const warm=new THREE.PointLight(0xff694a,64,32);warm.position.set(5,-2,3);scene.add(warm);
   const icy=new THREE.PointLight(0x91a5b9,45,32);icy.position.set(-3,-3,-1);scene.add(icy);
   const group=new THREE.Group();scene.add(group);
   const shellGeo=new THREE.TorusKnotGeometry(2.07,.53,260,18,2,3);
   const shellMat=new THREE.MeshPhysicalMaterial({color:0xb7bdc4,metalness:.93,roughness:.17,clearcoat:1,clearcoatRoughness:.1,envMapIntensity:1.1,side:THREE.DoubleSide});
   const knot=new THREE.Mesh(shellGeo,shellMat);knot.rotation.set(.16,.65,.44);group.add(knot);
   const ringGeo=new THREE.TorusGeometry(3.07,.012,5,240);
   const ringMat=new THREE.MeshBasicMaterial({color:0x9caaae,transparent:true,opacity:.5});
   const ring=new THREE.Mesh(ringGeo,ringMat);ring.rotation.set(.72,0,.1);group.add(ring);
   const ring2=new THREE.Mesh(ringGeo,ringMat.clone());ring2.rotation.set(.25,1.08,.48);ring2.scale.setScalar(.91);group.add(ring2);
   const accentGeo=new THREE.IcosahedronGeometry(.18,2);
   const accentMat=new THREE.MeshStandardMaterial({color:0xff694a,emissive:0xa82413,emissiveIntensity:.25,metalness:.3,roughness:.3});
   const accent=new THREE.Mesh(accentGeo,accentMat);accent.position.set(2.4,1.8,1.2);group.add(accent);
   const lineGeo=new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-3.5,-2.5,0),new THREE.Vector3(3.5,2.5,0)]);
   const lineMat=new THREE.LineBasicMaterial({color:0xffffff,transparent:true,opacity:.045});const line=new THREE.Line(lineGeo,lineMat);group.add(line);
   let raf=0;let w=0,h=0;let visible=true;let mouseX=0,mouseY=0;let last=0;
   const measure=()=>{const box=el.getBoundingClientRect();if(box.width<4||box.height<4)return;w=box.width;h=box.height;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix()};
   const pointer=(e:PointerEvent)=>{mouseX=(e.clientX/window.innerWidth-.5);mouseY=(e.clientY/window.innerHeight-.5)};
   const io=new IntersectionObserver(entries=>{visible=entries[0]?.isIntersecting??false},{threshold:.02});io.observe(el);
   const ro=new ResizeObserver(measure);ro.observe(el);measure();
   const animate=(t:number)=>{raf=requestAnimationFrame(animate);if(!visible||document.hidden||t-last<30)return;last=t;
    const k=t*.00012;group.rotation.y=k+mouseX*.21;group.rotation.x=-.08+Math.sin(k*.7)*.12+mouseY*.1;group.position.y=Math.sin(k*.7)*.13;ring.rotation.z=k*.28;
    renderer.render(scene,camera)};
   raf=requestAnimationFrame(animate);setReady(true);
   window.addEventListener('pointermove',pointer,{passive:true});
   dispose=()=>{cancelAnimationFrame(raf);io.disconnect();ro.disconnect();window.removeEventListener('pointermove',pointer);shellGeo.dispose();shellMat.dispose();ringGeo.dispose();ringMat.dispose();(ring2.material as import('three').Material).dispose();accentGeo.dispose();accentMat.dispose();lineGeo.dispose();lineMat.dispose();renderer.dispose()};
  })();return()=>{killed=true;dispose()}
 },[]);
 return <div className="sculpture-wrap" aria-label="Abstract 3D metallic sculpture representing engineered systems" role="img"><div className="sculpture-fallback" aria-hidden="true"><span className="fallback-ring fallback-ring-one"/><span className="fallback-ring fallback-ring-two"/><span className="fallback-core"/></div><canvas ref={canvas} className={'sculpture-canvas '+(ready?'canvas-ready':'')} aria-hidden="true"/><div className="sculpture-label mono">FIG. 001 <span>—</span> SYSTEM / HUMAN</div><span className="sculpture-cross cross-top">+</span><span className="sculpture-cross cross-bottom">+</span></div>
}
