'use client';
import {useEffect,useRef,useState} from 'react';

/** Stylized portrait-and-torso 3D composition. Face sourced from Archit's real portrait,
 * not a reconstructed 3D scan. Body and staging are procedurally authored. */
export function ArchitAvatar3D({paused=false}:{paused?:boolean}){
 const canvas=useRef<HTMLCanvasElement>(null);
 const pausedRef=useRef(paused);
 const [live,setLive]=useState(false);
 useEffect(()=>{pausedRef.current=paused},[paused]);
 useEffect(()=>{
  const el=canvas.current;
  if(!el||matchMedia('(max-width:720px)').matches||matchMedia('(prefers-reduced-motion: reduce)').matches
  ||(navigator as Navigator&{connection?:{saveData?:boolean}}).connection?.saveData)return;
  let dead=false,dispose=()=>{};
  (async()=>{
   const THREE=await import('three');
   if(dead)return;
   let renderer:import('three').WebGLRenderer;
   try{renderer=new THREE.WebGLRenderer({canvas:el,antialias:true,alpha:true,powerPreference:'high-performance'});}
   catch{return}
   renderer.setPixelRatio(Math.min(devicePixelRatio||1,1.45));
   renderer.outputColorSpace=THREE.SRGBColorSpace;
   renderer.toneMapping=THREE.ACESFilmicToneMapping;
   renderer.toneMappingExposure=1.6;
   const scene=new THREE.Scene();
   const camera=new THREE.PerspectiveCamera(34,1,.1,100);camera.position.set(0,-1,17.8);camera.lookAt(0,-1,0);
   scene.add(new THREE.AmbientLight(0xdde7ff,2.1));
   const key=new THREE.DirectionalLight(0xe8f5ff,3);key.position.set(-3,5,7);scene.add(key);
   const rim=new THREE.PointLight(0xb7efdc,90,18);rim.position.set(3,1,-1);scene.add(rim);
   const warm=new THREE.PointLight(0xe5bca3,55,16);warm.position.set(-4,-2,4);scene.add(warm);
   const root=new THREE.Group();scene.add(root);
   const geometries:import('three').BufferGeometry[]=[];
   const materials:import('three').Material[]=[];
   const mat=(color:number,metalness:number,roughness:number)=>{
    const m=new THREE.MeshStandardMaterial({color,metalness,roughness});materials.push(m);return m;
   };
   const navy=mat(0x14212d,.34,.52),suit=mat(0x202b34,.22,.64),edge=mat(0xc8e9db,.72,.22),skin=mat(0xbda58f,.04,.9);
   const shape=(geo:import('three').BufferGeometry,material:import('three').Material,parent=root)=>{
    geometries.push(geo);const mesh=new THREE.Mesh(geo,material);parent.add(mesh);return mesh;
   };
   // Mannequin body: stylized, not an assertion about actual physique/outfit.
   const chest=shape(new THREE.SphereGeometry(1,44,28),suit);
   chest.scale.set(1.6,1.36,.75);chest.position.set(0,-1.72,-.53);
   const torso=shape(new THREE.CylinderGeometry(1.21,.82,2.1,48,1),suit);
   torso.scale.set(1.15,1, .7);torso.position.set(0,-2.65,-.58);
   for(const side of [-1,1]){
    const shoulder=shape(new THREE.SphereGeometry(.75,26,16),suit);
    shoulder.position.set(side*1.32,-1.73,-.48);shoulder.scale.set(.9,1.19,.91);
    const arm=shape(new THREE.CapsuleGeometry(.43,1.68,8,20),navy);
    arm.position.set(side*1.64,-3.02,-.44);arm.rotation.z=side*.11;
    const seam=shape(new THREE.TorusGeometry(.59,.018,8,90,Math.PI*1.42),edge);
    seam.position.set(side*1.06,-1.62,.22);seam.rotation.set(.52,.3,side*.35);
   }
   // Lower body is intentionally stylized: single photo cannot verify Archit's silhouette.
   const hips=shape(new THREE.SphereGeometry(1,36,22),navy);
   hips.scale.set(.95,.62,.6);hips.position.set(0,-3.34,-.54);
   for(const side of [-1,1]){
    const thigh=shape(new THREE.CylinderGeometry(.47,.36,1.5,32),navy);
    thigh.position.set(side*.58,-4.12,-.55);
    thigh.rotation.z=side*.035;
    const shin=shape(new THREE.CylinderGeometry(.37,.28,1.55,30),navy);
    shin.position.set(side*.6,-5.38,-.53);
    shin.rotation.z=side*.02;
    const shoe=shape(new THREE.SphereGeometry(1,28,16),graphiteDark());
    shoe.scale.set(.54,.29,.87);shoe.position.set(side*.6,-6.19,.14);
   }
   function graphiteDark(){return suit}
   const neck=shape(new THREE.CylinderGeometry(.39,.48,.72,28),skin);
   neck.position.set(0,-.55,-.15);
   // Cutout portrait is a photo plane; perspective limited to a few degrees
   // to avoid pretending one source photo contains unobserved side geometry.
   const photoTexture=new THREE.TextureLoader().load('/archit-portrait.svg');
   photoTexture.colorSpace=THREE.SRGBColorSpace;
   const portraitMat=new THREE.MeshBasicMaterial({map:photoTexture,transparent:true,side:THREE.DoubleSide,depthWrite:false});
   materials.push(portraitMat);
   const portrait=shape(new THREE.PlaneGeometry(3.3,3.75),portraitMat);
   portrait.position.set(0,.77,.68);
   const halo=shape(new THREE.TorusGeometry(2.57,.037,12,160),edge);
   halo.position.set(0,.36,-1.15);halo.rotation.set(.26,.23,.14);
   const halo2=shape(new THREE.TorusGeometry(2.9,.024,8,160),edge);
   halo2.position.set(0,.35,-1.24);halo2.rotation.set(1.04,.16,.08);
   const platform=shape(new THREE.CylinderGeometry(2.05,2.14,.24,72),navy);
   platform.position.set(0,-6.65,-.3);
   const rail=shape(new THREE.TorusGeometry(2.08,.04,12,120),edge);
   rail.position.set(0,-6.52,-.3);rail.rotation.x=Math.PI/2;
   root.position.y=.45;
   let raf=0,previous=0,visible=true,px=0,py=0,deltaAngle=0,dragging=false,lastX=0;
   const resize=()=>{
    const b=el.getBoundingClientRect();if(b.width<1||b.height<1)return;
    camera.aspect=b.width/b.height;camera.position.z=b.width<720?19:17.8;
    camera.updateProjectionMatrix();renderer.setSize(b.width,b.height,false);
   };
   const ro=new ResizeObserver(resize);ro.observe(el);resize();
   const io=new IntersectionObserver(x=>{visible=x[0]?.isIntersecting??false},{threshold:.02});io.observe(el);
   const move=(e:PointerEvent)=>{px=(e.clientX/innerWidth-.5)*2;py=(e.clientY/innerHeight-.5)*2;
    if(dragging){deltaAngle=Math.max(-.27,Math.min(.27,deltaAngle+(e.clientX-lastX)*.002));lastX=e.clientX}
   };
   const down=(e:PointerEvent)=>{dragging=true;lastX=e.clientX;el.setPointerCapture(e.pointerId)};
   const up=()=>{dragging=false};
   window.addEventListener('pointermove',move,{passive:true});
   el.addEventListener('pointerdown',down);el.addEventListener('pointerup',up);
   el.addEventListener('pointercancel',up);el.addEventListener('lostpointercapture',up);
   let seconds=0;
   const animate=(t:number)=>{
    raf=requestAnimationFrame(animate);if(document.hidden||!visible||t-previous<33)return;
    const dt=Math.min((t-previous)/1000,.1);previous=t;
    if(!pausedRef.current)seconds+=dt;
    const angle=deltaAngle+px*.06;
    root.rotation.y+=(angle-root.rotation.y)*.035;
    root.rotation.x+=(-py*.025-root.rotation.x)*.035;
    root.position.y=.45+(pausedRef.current?0:Math.sin(seconds*.6)*.075);
    if(!pausedRef.current){halo.rotation.z+=.001;halo2.rotation.y-=.0006;}
    renderer.render(scene,camera);
   };
   renderer.render(scene,camera);setLive(true);raf=requestAnimationFrame(animate);
   dispose=()=>{cancelAnimationFrame(raf);ro.disconnect();io.disconnect();
    window.removeEventListener('pointermove',move);el.removeEventListener('pointerdown',down);
    el.removeEventListener('pointerup',up);el.removeEventListener('pointercancel',up);
    el.removeEventListener('lostpointercapture',up);
    geometries.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());photoTexture.dispose();renderer.dispose()};
  })().catch(()=>{});
  return()=>{dead=true;dispose()};
 },[]);
 return <div className="artifact-stage archit-avatar-stage" role="img" aria-label="Stylized 3D figure representing Archit Jain, using Archit's real published portrait as face image">
  <div className="archit-avatar-fallback" aria-hidden="true"><div className="archit-avatar-halo"/><img src="/archit-portrait.svg" alt="" /><div className="archit-avatar-pedestal"/></div>
  <canvas ref={canvas} className={'artifact-webgl archit-avatar-canvas '+(live?'webgl-live':'')} aria-hidden="true"/>
 </div>
}
