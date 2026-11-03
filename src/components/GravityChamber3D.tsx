'use client';
import {useEffect,useRef,useState} from 'react';

/** Original kinetic optical sculpture. No external models/textures or new dependencies. */
export function GravityChamber3D({paused=false}:{paused?:boolean}){
 const canvas=useRef<HTMLCanvasElement>(null);
 const pausedRef=useRef(paused);
 const [active,setActive]=useState(false);
 useEffect(()=>{pausedRef.current=paused},[paused]);
 useEffect(()=>{
  const el=canvas.current;
  if(!el||matchMedia('(prefers-reduced-motion: reduce)').matches
   ||matchMedia('(max-width: 720px)').matches
   ||(navigator as Navigator&{connection?:{saveData?:boolean}}).connection?.saveData)return;
  let disposed=false;
  let cleanup=()=>{};
  const initialize=()=>{(async()=>{
   const THREE=await import('three');
   const {RoomEnvironment}=await import('three/addons/environments/RoomEnvironment.js');
   if(disposed)return;
   let renderer:import('three').WebGLRenderer;
   try{renderer=new THREE.WebGLRenderer({canvas:el,alpha:true,antialias:true,powerPreference:'high-performance'});}
   catch{return;}
   renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.3));
   renderer.setClearColor(0x000000,0);
   renderer.outputColorSpace=THREE.SRGBColorSpace;
   renderer.toneMapping=THREE.ACESFilmicToneMapping;
   renderer.toneMappingExposure=1.48;
   const scene=new THREE.Scene();
   const camera=new THREE.PerspectiveCamera(37,1,.1,100);
   camera.position.set(0,.15,13.7);
   const pmrem=new THREE.PMREMGenerator(renderer);
   const room=new RoomEnvironment();
   const environment=pmrem.fromScene(room,.05);
   scene.environment=environment.texture;
   scene.add(new THREE.AmbientLight(0xdce9f5,1.12));
   const lights=[
    new THREE.PointLight(0xc9e7ff,180,35),
    new THREE.PointLight(0xeac5ac,125,30),
    new THREE.PointLight(0xe5f5db,95,30)
   ];
   lights[0].position.set(-4.5,4.2,7.5);
   lights[1].position.set(4.8,-3.2,5.4);
   lights[2].position.set(1.5,2,-5);
   lights.forEach(light=>scene.add(light));
   const root=new THREE.Group();scene.add(root);
   const orbital=new THREE.Group();root.add(orbital);
   const lensGroup=new THREE.Group();root.add(lensGroup);
   const tracked:Array<import('three').BufferGeometry|import('three').Material>=[];
   const metal=new THREE.MeshPhysicalMaterial({color:0xdceaf0,metalness:1,roughness:.16,clearcoat:1,clearcoatRoughness:.1,envMapIntensity:2.05});
   const champagne=new THREE.MeshPhysicalMaterial({color:0xe8c9a7,metalness:.86,roughness:.25,clearcoat:.8,envMapIntensity:1.45});
   const graphite=new THREE.MeshStandardMaterial({color:0x273940,metalness:.88,roughness:.26,envMapIntensity:1.65});
   const glass=new THREE.MeshPhysicalMaterial({color:0xb4dee2,metalness:0,roughness:.035,transmission:.83,thickness:2.3,ior:1.33,transparent:true,opacity:.78,clearcoat:1,envMapIntensity:1.35});
   const inner=new THREE.MeshPhysicalMaterial({color:0xe9edee,metalness:.8,roughness:.11,clearcoat:1,envMapIntensity:1.9});
   tracked.push(metal,champagne,graphite,glass,inner);
   const torus=(radius:number,tube:number,arc:number,material:import('three').Material)=>{
    const geo=new THREE.TorusGeometry(radius,tube,14,144,arc);
    tracked.push(geo);return new THREE.Mesh(geo,material);
   };
   // Open, offset arcs create a 3D optical instrument—not a generic globe.
   const arc1=torus(3.17,.135,Math.PI*1.72,metal);
   arc1.rotation.set(.5,.4,.12);orbital.add(arc1);
   const arc2=torus(3.43,.092,Math.PI*1.46,graphite);
   arc2.rotation.set(1.08,-.28,1.6);orbital.add(arc2);
   const arc3=torus(2.79,.045,Math.PI*1.9,champagne);
   arc3.rotation.set(-.37,.84,-.64);orbital.add(arc3);
   const collar=torus(3.64,.018,Math.PI*2,metal);
   collar.rotation.set(1.06,.06,-.12);orbital.add(collar);
   const secondCollar=torus(2.43,.012,Math.PI*2,champagne);
   secondCollar.rotation.set(-.3,.4,1.1);orbital.add(secondCollar);
   // Engraved steel stops around outer mechanical collar.
   const stopGeo=new THREE.BoxGeometry(.1,.32,.12);tracked.push(stopGeo);
   for(let i=0;i<30;i++){
    const angle=i/30*Math.PI*2;
    const tick=new THREE.Mesh(stopGeo,i%5===0?champagne:metal);
    tick.position.set(Math.cos(angle)*3.64,Math.sin(angle)*3.64,0);
    tick.rotation.z=angle-Math.PI/2;orbital.add(tick);
   }
   const lensGeo=new THREE.IcosahedronGeometry(1.7,3);tracked.push(lensGeo);
   const lens=new THREE.Mesh(lensGeo,glass);lensGroup.add(lens);
   const innerGeo=new THREE.IcosahedronGeometry(.95,2);tracked.push(innerGeo);
   const core=new THREE.Mesh(innerGeo,inner);lensGroup.add(core);
   const wireGeo=new THREE.IcosahedronGeometry(1.33,1);tracked.push(wireGeo);
   const edgesGeo=new THREE.EdgesGeometry(wireGeo);tracked.push(edgesGeo);
   const filaments=new THREE.LineSegments(edgesGeo,new THREE.LineBasicMaterial({color:0xd8f6f3,transparent:true,opacity:.37,depthWrite:false}));
   tracked.push(filaments.material);lensGroup.add(filaments);
   const satelliteGeo=new THREE.OctahedronGeometry(.26,0);tracked.push(satelliteGeo);
   for(let i=0;i<6;i++){
    const satellite=new THREE.Mesh(satelliteGeo,i%2===0?metal:champagne);
    const t=i/6*Math.PI*2;satellite.position.set(Math.cos(t)*4.45,Math.sin(t)*3.15,Math.sin(t*2)*.8);
    satellite.rotation.set(t,t*.6,t*.3);root.add(satellite);
   }
   // Fine star registration, spatial not decorative background particles.
   const pointsGeo=new THREE.BufferGeometry();tracked.push(pointsGeo);
   const coords=new Float32Array(96*3);
   for(let i=0;i<96;i++){
    const a=i*2.39996323,y=1-2*(i+.5)/96,r=Math.sqrt(1-y*y);
    coords[i*3]=r*Math.cos(a)*4.7;coords[i*3+1]=y*4.7;coords[i*3+2]=r*Math.sin(a)*4.7;
   }
   pointsGeo.setAttribute('position',new THREE.BufferAttribute(coords,3));
   const pointMat=new THREE.PointsMaterial({color:0xd6eadf,size:.032,transparent:true,opacity:.52,depthWrite:false});
   tracked.push(pointMat);root.add(new THREE.Points(pointsGeo,pointMat));
   let raf=0,last=0,visible=true,dragging=false,lastPointer=0,rotationOffset=0,pointerX=0,pointerY=0;
   const size=()=>{
    const r=el.getBoundingClientRect();if(r.width<1||r.height<1)return;
    camera.aspect=r.width/r.height;
    camera.position.z=r.width<700?15.8:13.7;
    camera.updateProjectionMatrix();renderer.setSize(r.width,r.height,false);
   };
   const resize=new ResizeObserver(size);resize.observe(el);size();
   const observer=new IntersectionObserver(entries=>{visible=entries[0]?.isIntersecting??false},{threshold:.02});
   observer.observe(el);
   const move=(e:PointerEvent)=>{
    pointerX=(e.clientX/innerWidth-.5)*2;
    pointerY=(e.clientY/innerHeight-.5)*2;
    if(dragging){rotationOffset+=(e.clientX-lastPointer)*.006;lastPointer=e.clientX;}
   };
   const down=(e:PointerEvent)=>{dragging=true;lastPointer=e.clientX;el.setPointerCapture(e.pointerId);};
   const up=()=>{dragging=false;};
   window.addEventListener('pointermove',move,{passive:true});
   el.addEventListener('pointerdown',down);
   el.addEventListener('pointerup',up);el.addEventListener('pointercancel',up);el.addEventListener('lostpointercapture',up);
   let t0=0;
   const animate=(t:number)=>{
    raf=requestAnimationFrame(animate);
    if(!visible||document.hidden||t-last<33)return;
    const delta=Math.min((t-last)/1000,.1);last=t;
    if(!pausedRef.current)t0+=delta;
    const time=t0;
    root.rotation.y+=(rotationOffset+pointerX*.16+Math.sin(time*.12)*.18-root.rotation.y)*.04;
    root.rotation.x+=(-pointerY*.1+Math.sin(time*.22)*.07-root.rotation.x)*.035;
    if(!pausedRef.current){
      orbital.rotation.z+=.00065;orbital.rotation.y+=.0003;
      lensGroup.rotation.y+=.0027;lensGroup.rotation.x+=.0007;
      root.position.y=Math.sin(time*.72)*.09;
      lights[1].position.x=4.8+Math.sin(time*.4)*1.3;
    }
    renderer.render(scene,camera);
   };
   renderer.render(scene,camera);setActive(true);
   raf=requestAnimationFrame(animate);
   cleanup=()=>{
    cancelAnimationFrame(raf);observer.disconnect();resize.disconnect();
    window.removeEventListener('pointermove',move);
    el.removeEventListener('pointerdown',down);el.removeEventListener('pointerup',up);
    el.removeEventListener('pointercancel',up);el.removeEventListener('lostpointercapture',up);
    tracked.forEach(x=>x.dispose());environment.texture.dispose();pmrem.dispose();room.dispose();renderer.dispose();
   };
  })().catch(()=>{});};
  // Keep static authored 3D visible immediately. Initialize heavy renderer on idle.
  let cancelIdle=()=>{};
  if('requestIdleCallback' in window){
   const id=window.requestIdleCallback(initialize,{timeout:3200});
   cancelIdle=()=>window.cancelIdleCallback(id);
  }else{
   const timer=window.setTimeout(initialize,1300);
   cancelIdle=()=>window.clearTimeout(timer);
  }
  return()=>{disposed=true;cancelIdle();cleanup()};
 },[]);
 return <div className="artifact-stage gravity-scene" aria-label="Interactive floating glass optical core inside asymmetric polished titanium orbital frames" role="img">
  <div className="artifact-fallback gravity-still" aria-hidden="true">
   <div className="gravity-still-ring ring-outer"/><div className="gravity-still-ring ring-inner"/>
   <div className="gravity-still-core"><div className="gravity-still-facet"/></div>
   <div className="gravity-still-speck s-one"/><div className="gravity-still-speck s-two"/>
  </div>
  <canvas ref={canvas} className={'artifact-webgl gravity-canvas '+(active?'webgl-live':'')} data-cursor="drag" aria-hidden="true"/>
 </div>;
}
