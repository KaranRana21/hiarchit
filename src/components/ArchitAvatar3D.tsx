'use client';
import {useEffect,useRef,useState} from 'react';

/** Spatial portrait sculpture. Archit's real published photograph supplies likeness.
 * Curved depth planes, polished three-dimensional rings and stage are real WebGL;
 * absent side/back/body photo data is not fabricated. */
export function ArchitAvatar3D({paused=false}:{paused?:boolean}){
 const canvas=useRef<HTMLCanvasElement>(null),pausedRef=useRef(paused);
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
   catch{return;}
   renderer.setPixelRatio(Math.min(devicePixelRatio||1,1.45));
   renderer.outputColorSpace=THREE.SRGBColorSpace;
   renderer.toneMapping=THREE.ACESFilmicToneMapping;
   renderer.toneMappingExposure=1.45;
   const scene=new THREE.Scene();
   const camera=new THREE.PerspectiveCamera(34,1,.1,100);
   camera.position.set(0,0,15.7);camera.lookAt(0,0,0);
   scene.add(new THREE.AmbientLight(0xe5fcfa,1.1));
   const light=new THREE.PointLight(0xc9ecdd,180,30);light.position.set(-4,3,6);scene.add(light);
   const backlight=new THREE.PointLight(0xe7c2ab,115,27);backlight.position.set(4,-2,-2);scene.add(backlight);
   const root=new THREE.Group();scene.add(root);
   const geometries:import('three').BufferGeometry[]=[];
   const materials:import('three').Material[]=[];
   const metal=new THREE.MeshStandardMaterial({color:0xc5e1da,metalness:.92,roughness:.19});
   const gold=new THREE.MeshStandardMaterial({color:0xd3b9a0,metalness:.82,roughness:.26});
   const dark=new THREE.MeshStandardMaterial({color:0x263b43,metalness:.65,roughness:.35});
   materials.push(metal,gold,dark);
   const mesh=(geo:import('three').BufferGeometry,mat:import('three').Material,parent=root)=>{
    geometries.push(geo);const m=new THREE.Mesh(geo,mat);parent.add(m);return m;
   };
   // 3D orbital instrument: physical depth and moving metal geometry.
   const halo=mesh(new THREE.TorusGeometry(3.43,.063,12,144),metal);
   halo.rotation.set(.2,.32,-.17);halo.position.z=-.78;
   const halo2=mesh(new THREE.TorusGeometry(3.9,.022,8,160),gold);
   halo2.rotation.set(1.02,.14,.31);halo2.position.z=-1.6;
   const rail=mesh(new THREE.TorusGeometry(3.2,.018,8,160),metal);
   rail.rotation.set(.54,-.48,.18);rail.position.z=-1.8;
   const glassMat=new THREE.MeshPhysicalMaterial({color:0xb6cbd1,metalness:0,roughness:.15,transmission:.46,opacity:.38,transparent:true,depthWrite:false,side:THREE.DoubleSide});
   materials.push(glassMat);
   const shell=mesh(new THREE.IcosahedronGeometry(3.1,1),glassMat);shell.position.z=-2.1;shell.scale.z=.3;
   // Studio-like floating support and understated lower reflection.
   const platform=mesh(new THREE.CylinderGeometry(2.45,2.56,.18,72),dark);
   platform.position.set(0,-3.48,-.94);
   const platformEdge=mesh(new THREE.TorusGeometry(2.48,.03,10,120),gold);
   platformEdge.position.set(0,-3.38,-.94);platformEdge.rotation.x=Math.PI/2;
   const portraitGeo=new THREE.PlaneGeometry(4.85,6.2,28,8);
   const position=portraitGeo.attributes.position;
   for(let i=0;i<position.count;i++){
    const x=position.getX(i),y=position.getY(i);
    position.setZ(i,.22*(1-(x/2.425)**2)+.03*Math.sin(y*.8));
   }
   portraitGeo.computeVertexNormals();geometries.push(portraitGeo);
   const photoTexture=new THREE.TextureLoader().load('/archit-portrait.svg');
   photoTexture.colorSpace=THREE.SRGBColorSpace;
   const portraitMat=new THREE.MeshBasicMaterial({map:photoTexture,transparent:true,side:THREE.DoubleSide,depthWrite:false});
   materials.push(portraitMat);
   const portrait=new THREE.Mesh(portraitGeo,portraitMat);
   portrait.position.set(0,-.05,.95);root.add(portrait);
   // Thin glancing light behind shoulders, not invented torso anatomy.
   const ticksGeo=new THREE.BoxGeometry(.04,.17,.06);geometries.push(ticksGeo);
   for(let i=0;i<36;i++){
    const a=i/36*Math.PI*2;const tick=new THREE.Mesh(ticksGeo,i%6===0?gold:metal);
    tick.position.set(Math.cos(a)*3.78,Math.sin(a)*3.78,-1.55);
    tick.rotation.z=a-Math.PI/2;root.add(tick);
   }
   let raf=0,last=0,visible=true,px=0,py=0,drag=false,lastX=0,dragX=0,t=0;
   const resize=()=>{
    const r=el.getBoundingClientRect();if(r.width<1||r.height<1)return;
    camera.aspect=r.width/r.height;camera.position.z=r.width<700?17.8:15.7;camera.updateProjectionMatrix();
    renderer.setSize(r.width,r.height,false);
   };
   const ro=new ResizeObserver(resize);ro.observe(el);resize();
   const io=new IntersectionObserver(entries=>{visible=entries[0]?.isIntersecting??false},{threshold:.02});io.observe(el);
   const move=(e:PointerEvent)=>{
    px=(e.clientX/innerWidth-.5)*2;py=(e.clientY/innerHeight-.5)*2;
    if(drag){dragX=Math.max(-.2,Math.min(.2,dragX+(e.clientX-lastX)*.0016));lastX=e.clientX;}
   };
   const down=(e:PointerEvent)=>{drag=true;lastX=e.clientX;el.setPointerCapture(e.pointerId);};
   const up=()=>{drag=false;};
   window.addEventListener('pointermove',move,{passive:true});
   el.addEventListener('pointerdown',down);el.addEventListener('pointerup',up);
   el.addEventListener('pointercancel',up);el.addEventListener('lostpointercapture',up);
   const animate=(now:number)=>{
    raf=requestAnimationFrame(animate);if(document.hidden||!visible||now-last<33)return;
    const dt=Math.min((now-last)/1000,.1);last=now;if(!pausedRef.current)t+=dt;
    // Small movements retain believable frontal likeness from single source photo.
    root.rotation.y+=(dragX+px*.055-root.rotation.y)*.03;
    root.rotation.x+=(-py*.027-root.rotation.x)*.04;
    root.position.y=pausedRef.current?0:Math.sin(t*.7)*.045;
    if(!pausedRef.current){halo.rotation.z+=.0009;halo2.rotation.z-=.0006;rail.rotation.x+=.00035;}
    renderer.render(scene,camera);
   };
   renderer.render(scene,camera);setLive(true);raf=requestAnimationFrame(animate);
   dispose=()=>{cancelAnimationFrame(raf);ro.disconnect();io.disconnect();
    window.removeEventListener('pointermove',move);
    el.removeEventListener('pointerdown',down);el.removeEventListener('pointerup',up);
    el.removeEventListener('pointercancel',up);el.removeEventListener('lostpointercapture',up);
    geometries.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());photoTexture.dispose();renderer.dispose();
   };
  })().catch(()=>{});
  return()=>{dead=true;dispose()};
 },[]);
 return <div className="artifact-stage archit-avatar-stage" role="img" aria-label="Spatial portrait sculpture of Archit Jain with real photo and three-dimensional orbital frame">
   <div className="archit-avatar-fallback" aria-hidden="true"><div className="archit-avatar-halo"/><img src="/archit-portrait.svg" alt=""/><div className="archit-avatar-pedestal"/></div>
   <canvas ref={canvas} className={'artifact-webgl archit-avatar-canvas '+(live?'webgl-live':'')} aria-hidden="true"/>
  </div>;
}
