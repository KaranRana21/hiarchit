'use client';
import {useEffect,useRef,useState} from 'react';

/** Bespoke A-shaped artifact, three-dimensionally machined and lit in a virtual studio. */
export function Artifact3D(){
 const canvas=useRef<HTMLCanvasElement>(null);
 const [active,setActive]=useState(false);
 useEffect(()=>{
   const el=canvas.current;
   if(!el) return;
   const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
   const mobile=matchMedia('(max-width: 720px)').matches;
   const saveData=!!(navigator as Navigator&{connection?:{saveData?:boolean}}).connection?.saveData;
   if(reduced||saveData||mobile) return;
   let cancelled=false;
   let cleanup=()=>{};
   (async()=>{
     const THREE=await import('three');
     const {RoomEnvironment}=await import('three/addons/environments/RoomEnvironment.js');
     if(cancelled||!el)return;
     let renderer:import('three').WebGLRenderer;
     try { renderer=new THREE.WebGLRenderer({canvas:el,alpha:true,antialias:true,powerPreference:'high-performance'}); }
     catch { return; }
     renderer.setPixelRatio(Math.min(devicePixelRatio||1,1.6));
     renderer.outputColorSpace=THREE.SRGBColorSpace;
     renderer.toneMapping=THREE.ACESFilmicToneMapping;
     renderer.toneMappingExposure=1.26;
     const scene=new THREE.Scene();
     const camera=new THREE.PerspectiveCamera(33,1,.1,100);
     camera.position.set(0,0,14.7);
     const pmrem=new THREE.PMREMGenerator(renderer);
     const room=new RoomEnvironment();
     const env=pmrem.fromScene(room,.05);
     scene.environment=env.texture;
     const ambient=new THREE.AmbientLight(0xffffff,.55);scene.add(ambient);
     const key=new THREE.PointLight(0xe5f2ff,140,35);key.position.set(-3.5,4.5,7);scene.add(key);
     const rim=new THREE.PointLight(0xd7ac74,180,28);rim.position.set(4,-1,4);scene.add(rim);
     const cyan=new THREE.PointLight(0x9baec7,80,32);cyan.position.set(-4,-4,-2);scene.add(cyan);
     const whole=new THREE.Group();whole.rotation.set(.08,-.2,.1);scene.add(whole);
     const disposables:(import('three').BufferGeometry|import('three').Material)[]=[];
     const metallic=new THREE.MeshPhysicalMaterial({color:0xced5da,metalness:1,roughness:.14,clearcoat:1,clearcoatRoughness:.13,envMapIntensity:1.7});
     const gold=new THREE.MeshPhysicalMaterial({color:0xc4ac8b,metalness:.92,roughness:.23,clearcoat:.8,envMapIntensity:1.5});
     const darkMetal=new THREE.MeshStandardMaterial({color:0x20252d,metalness:.9,roughness:.28,envMapIntensity:1.15});
     disposables.push(metallic,gold,darkMetal);
     const prism=(length:number,radius:number)=>{const geo=new THREE.CylinderGeometry(radius*.79,radius,length,8,1);disposables.push(geo);return geo;};
     const glyph=new THREE.Group();whole.add(glyph);
     const legGeo=prism(5.18,.3);
     const left=new THREE.Mesh(legGeo,metallic);left.rotation.z=-.352;left.position.set(-.9,-.10,.45);glyph.add(left);
     const right=new THREE.Mesh(legGeo,metallic);right.rotation.z=.352;right.position.set(.9,-.10,.45);glyph.add(right);
     const barGeo=prism(1.86,.215);const bar=new THREE.Mesh(barGeo,gold);bar.rotation.z=Math.PI/2;bar.position.set(0,-.55,.67);glyph.add(bar);
     const capGeo=new THREE.IcosahedronGeometry(.35,2);disposables.push(capGeo);
     const cap=new THREE.Mesh(capGeo,gold);cap.position.set(0,2.42,.48);glyph.add(cap);
     // Kinetic armature — brushed steel elliptical orbits, not a generic decorative sphere.
     const circleGeo=new THREE.TorusGeometry(3.36,.038,8,180);disposables.push(circleGeo);
     const circle=new THREE.Mesh(circleGeo,darkMetal);circle.rotation.set(.7,.56,.23);whole.add(circle);
     const circle2=new THREE.Mesh(circleGeo,gold);circle2.scale.setScalar(1.12);circle2.rotation.set(1.24,-.38,.15);whole.add(circle2);
     const circle3=new THREE.Mesh(circleGeo,metallic);circle3.scale.setScalar(.84);circle3.rotation.set(.21,1.18,.32);whole.add(circle3);
     // Fine spatial measurement ticks attached to one orbital ring.
     const marks=new THREE.Group();whole.add(marks);
     const markGeo=prism(.12,.013);
     for(let i=0;i<48;i++){
       const a=i/48*Math.PI*2;
       const tick=new THREE.Mesh(markGeo,i%4===0?gold:darkMetal);
       tick.position.set(Math.cos(a)*3.73,Math.sin(a)*3.73,0);
       tick.rotation.z=a-Math.PI/2;
       marks.add(tick);
     }
     marks.rotation.set(.3,.55,-.1);
     const glassGeo=new THREE.IcosahedronGeometry(1.48,3);disposables.push(glassGeo);
     const glassMat=new THREE.MeshPhysicalMaterial({color:0xb6c8da,transmission:.75,thickness:1.5,roughness:.07,metalness:0,ior:1.31,transparent:true,opacity:.33,depthWrite:false,side:THREE.FrontSide});disposables.push(glassMat);
     const glass=new THREE.Mesh(glassGeo,glassMat);glass.position.z=-.54;glass.scale.setScalar(1.10);whole.add(glass);
     const pointsGeom=new THREE.BufferGeometry();disposables.push(pointsGeom);
     const coords=new Float32Array(180*3);
     for(let i=0;i<180;i++){const phi=(i*2.399963229728653);const y=1-2*((i+.5)/180);const r=Math.sqrt(1-y*y);coords[i*3]=5.15*r*Math.cos(phi);coords[i*3+1]=5.15*y;coords[i*3+2]=5.15*r*Math.sin(phi);}
     pointsGeom.setAttribute('position',new THREE.BufferAttribute(coords,3));
     const pointsMat=new THREE.PointsMaterial({color:0xe3d1b5,size:.029,sizeAttenuation:true,transparent:true,opacity:.52,depthWrite:false});disposables.push(pointsMat);
     const dust=new THREE.Points(pointsGeom,pointsMat);whole.add(dust);
     let raf=0,last=0,visible=true,pX=0,pY=0,w=0,h=0;
     const size=()=>{const rect=el.getBoundingClientRect();if(rect.width<=0||rect.height<=0)return;w=rect.width;h=rect.height;camera.aspect=w/h;camera.position.z=w<920?17.7:14.7;camera.updateProjectionMatrix();renderer.setSize(w,h,false);};
     const resize=new ResizeObserver(size);resize.observe(el);size();
     const onPointer=(e:PointerEvent)=>{pX=(e.clientX/innerWidth-.5)*2;pY=(e.clientY/innerHeight-.5)*2;};
     window.addEventListener('pointermove',onPointer,{passive:true});
     const observer=new IntersectionObserver(entries=>{visible=entries[0]?.isIntersecting??false},{threshold:0.02});observer.observe(el);
     const animate=(t:number)=>{raf=requestAnimationFrame(animate);if(!visible||document.hidden||t-last<32)return;last=t;
       const time=t*.00017;whole.rotation.y+=(time*.58+pX*.17-whole.rotation.y)*.025;
       whole.rotation.x+=(Math.sin(time*.8)*.12+pY*.12-whole.rotation.x)*.025;
       whole.position.y=Math.sin(time*1.9)*.085;
       circle.rotation.y+=.0012;circle2.rotation.z-=.001;circle3.rotation.x+=.0006;marks.rotation.z-=.00045;
       glass.rotation.y=time*.29;dust.rotation.y=-time*.12;
       rim.position.x=3.6+Math.sin(time*1.4)*1.3;
       renderer.render(scene,camera);
     };raf=requestAnimationFrame(animate);setActive(true);
     cleanup=()=>{cancelAnimationFrame(raf);resize.disconnect();observer.disconnect();window.removeEventListener('pointermove',onPointer);for(const d of disposables)d.dispose();pmrem.dispose();room.dispose();env.texture.dispose();renderer.dispose();};
   })().catch(()=>{});
   return()=>{cancelled=true;cleanup();};
 },[]);
 return <div className="artifact-stage" role="img" aria-label="Interactive 3D A monogram, machined platinum sculpture inside precision orbital rings">
   <div className="artifact-fallback" aria-hidden="true"><div className="fallback-ellipse ellipse-one"/><div className="fallback-ellipse ellipse-two"/><div className="fallback-a">A</div><div className="fallback-glow"/></div>
   <canvas ref={canvas} className={'artifact-webgl '+(active?'webgl-live':'')} aria-hidden="true"/>
   <div className="artifact-coordinate coord-top">38° 42&apos; / 08</div><div className="artifact-coordinate coord-bottom">OBJECT 01 — ARCHIT</div>
   <span className="artifact-cross cross-a" aria-hidden="true">+</span><span className="artifact-cross cross-b" aria-hidden="true">+</span>
 </div>;
}
