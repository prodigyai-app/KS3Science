/* Heat transfer models for KS3: conduction, convection and radiation (900×470 scenes).
   Registered into KSModels.defs; models.js render() calls window.KSModelsExtra[id](p, phase).
   render() is called every frame with the current controls (p) and the time since Play (phase, seconds).
   Each model keeps its running state on p (one p per model on the page) and restarts when the controls
   change or Reset sets the time back to zero. */
(root=>{'use strict';
const M=root.KSModels;if(!M)return;
const f=v=>(+v).toFixed(1),r0=v=>Math.round(v);
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const T=(x,y,s,o={})=>`<text x="${f(x)}" y="${f(y)}" font-family="Arial" font-size="${o.size||15}" text-anchor="${o.anchor||'start'}" fill="${o.fill||'#1d2733'}"${o.weight?` font-weight="${o.weight}"`:''}${o.op!=null?` opacity="${o.op}"`:''}>${s}</text>`;
const C=()=>root.LAB&&root.LAB.C;
const svg=(label,body,defs='')=>`<svg class="ks-real" viewBox="0 0 900 470" role="img" aria-label="${label}"><defs>${defs}</defs>${body}</svg>`;
const room=(g,label,defs)=>{const c=C();return svg(label,(c?c.room(330)+c.benchFront(440):'<rect width="900" height="470" fill="#eef1f4"/><rect y="330" width="900" height="110" fill="#d9dde1"/><rect y="440" width="900" height="30" fill="#111416"/>')+g,defs);};
const shadow=(x,y,rx,ry=6,op=.2)=>`<ellipse cx="${f(x)}" cy="${f(y)}" rx="${f(rx)}" ry="${f(ry)}" fill="#000" opacity="${op}"/>`;
const arrowHead=(x,y,a,s=12,col='#c0392b')=>`<path d="M${f(x)} ${f(y)}L${f(x-s*Math.cos(a)+s*.55*Math.sin(a))} ${f(y-s*Math.sin(a)-s*.55*Math.cos(a))}L${f(x-s*Math.cos(a)-s*.55*Math.sin(a))} ${f(y-s*Math.sin(a)+s*.55*Math.cos(a))}Z" fill="${col}"/>`;
const hash=i=>{const s=Math.sin(i*12.9898+78.233)*43758.5453;return s-Math.floor(s);};
/* temperature colour: 20 °C cool blue-grey → yellow → orange → red */
const heatCol=(t,lo=20,hi=320)=>{const k=clamp((t-lo)/(hi-lo),0,1),stops=[[0,[70,130,200]],[.25,[90,190,170]],[.5,[245,205,60]],[.75,[240,130,40]],[1,[205,40,30]]];let i=0;while(i<stops.length-2&&k>stops[i+1][0])i++;const [a,ca]=stops[i],[b,cb]=stops[i+1],u=(k-a)/(b-a);return`rgb(${ca.map((c,j)=>r0(c+(cb[j]-c)*u)).join(',')})`;};
/* a lit Bunsen burner standing on the bench, flame tip at (x, tipY) */
const bunsen=(x,baseY,tipY,ph,power=1,flame=70)=>{let g=shadow(x,baseY+4,46,7,.25)+`<rect x="${x-40}" y="${baseY-12}" width="80" height="12" rx="4" fill="#3b4148"/><rect x="${x-40}" y="${baseY-12}" width="80" height="3" rx="2" fill="#6b737b"/>`;
 const top=tipY+flame;g+=`<rect x="${x-9}" y="${top}" width="18" height="${baseY-12-top}" fill="#9aa3ad" stroke="#5b6670"/><rect x="${x-11}" y="${baseY-50}" width="22" height="14" rx="2" fill="#6b737b"/><path d="M${x-40} ${baseY-6}H${x-70}" stroke="#d98c2b" stroke-width="7" stroke-linecap="round"/>`;
 if(power>0){const fl=1+.06*Math.sin(ph*23)+.04*Math.sin(ph*37),h=(top-tipY)*fl*(.55+.45*power/3*3/3);
  g+=`<path d="M${x-10} ${top}C${x-14} ${top-h*.45} ${x-4} ${top-h*.8} ${x} ${top-h}C${x+4} ${top-h*.8} ${x+14} ${top-h*.45} ${x+10} ${top}Z" fill="#7fb8ff" opacity=".55"/><path d="M${x-6} ${top}C${x-7} ${top-h*.3} ${x-2} ${top-h*.5} ${x} ${top-h*.62}C${x+2} ${top-h*.5} ${x+7} ${top-h*.3} ${x+6} ${top}Z" fill="#2f6fd0" opacity=".8"/>`;}
 return g;};
const card=(x,y,w,h,title)=>`<rect x="${x+2}" y="${y+3}" width="${w}" height="${h}" rx="8" fill="#000" opacity=".12"/><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" fill="#fbfaf5" stroke="#b9b29d"/>`+(title?T(x+12,y+20,title,{size:13,weight:700,fill:'#4a5560'}):'');

const defs={
 conduction:{title:'Conduction along a rod',params:[['a','Top rod: 1 copper, 2 aluminium, 3 iron, 4 glass',1,4,1,1],['b','Bottom rod: 1 copper, 2 aluminium, 3 iron, 4 glass',1,4,1,3],['zoom','Zoom-in point along the rods / %',5,95,5,40]],note:'Press Play to light the Bunsen burner. The colour of each rod shows how hot it is. Drawing pins are stuck on with wax; a pin drops when the wax under it melts. The zoom shows particles vibrating more as they get hotter and passing energy to their neighbours. Metals also have free electrons, which carry energy quickly, so metals conduct better than glass. The rods are the same length and thickness, so the test is fair. Time is speeded up.',animate:'phase'},
 convection:{title:'Convection currents',params:[['scene','Scene: 1 beaker of water, 2 room with a radiator',1,2,1,1],['heat','Heating: 0 off, 1 low, 2 medium, 3 high',0,3,1,2],['pos','Heat source: 1 left, 2 middle, 3 right',1,3,1,1]],note:'Press Play. Water or air near the heat source warms up, expands and becomes less dense, so it rises. Cooler, denser fluid sinks to take its place. This loop is a convection current, and it carries energy around. Convection only happens in liquids and gases, because their particles can move from place to place. Turn the heating off to compare: the dye then spreads only slowly.',animate:'phase'},
 radiation:{title:'Infrared radiation',params:[['left','Left can: 1 matt black, 2 shiny silver',1,2,1,1],['right','Right can: 1 matt black, 2 shiny silver',1,2,1,2],['vac','Inside the jar: 0 air, 1 vacuum',0,1,1,0]],note:'Press Play to switch on the heater. It gives out infrared radiation in all directions. The two cans are the same distance away, so they receive the same radiation. Matt black surfaces absorb most of it; shiny surfaces reflect most of it. Pump the air out: radiation still crosses the vacuum, which is how energy from the Sun reaches Earth. Time is speeded up.',animate:'phase'}
};
Object.assign(M.defs,defs);
const X={};

/* ================= conduction ================= */
const MAT={1:{n:'copper',D:1,base:'#b87333',hi:'#e2a26a',lo:'#7a4a22',metal:1},2:{n:'aluminium',D:.86,base:'#c3c9cf',hi:'#eef1f4',lo:'#8a9299',metal:1},3:{n:'iron',D:.2,base:'#6d7277',hi:'#a3a8ad',lo:'#3f4347',metal:1},4:{n:'glass',D:.006,base:'#cfe6ec',hi:'#f4fbfd',lo:'#9bbcc6',metal:0}};
const RX0=172,RX1=740,RLEN=RX1-RX0,RY=[188,262],PINS=[.22,.36,.5,.64,.78],NODES=40,MELT=55,DMAX=.0085;
function condSim(p,t){const key=p.a+'|'+p.b;let s=p._cond;
 if(!s||s.key!==key||t<s.t-1e-6){s=p._cond={key,t:0,T:[Array(NODES+1).fill(20),Array(NODES+1).fill(20)],melt:[PINS.map(()=>null),PINS.map(()=>null)]};}
 const dx=1/NODES,dt=.02;
 while(s.t<t){const h=Math.min(dt,t-s.t);if(h<1e-9)break;
  const hot=20+300*(1-Math.exp(-s.t/1.2));
  [p.a,p.b].forEach((m,k)=>{const D=DMAX*MAT[m].D,A=s.T[k],B=A.slice();B[0]=hot;
   for(let i=1;i<NODES;i++)B[i]=A[i]+h*(D*(A[i+1]-2*A[i]+A[i-1])/(dx*dx)-.004*(A[i]-20));
   B[NODES]=B[NODES-1];s.T[k]=B;
   PINS.forEach((x,j)=>{if(s.melt[k][j]==null&&tAt(B,x)>=MELT)s.melt[k][j]=s.t;});});
  s.t+=h;}
 return s;}
const rodCol=t=>{const k=clamp((t-20)/280,0,1),a=[255,214,90],b=[240,120,35],c=[200,35,25],m=k<.5?a.map((v,i)=>v+(b[i]-v)*k*2):b.map((v,i)=>v+(c[i]-v)*(k-.5)*2);return`rgb(${m.map(r0).join(',')})`;};
const tAt=(A,x)=>{const u=clamp(x,0,1)*NODES,i=Math.min(NODES-1,Math.floor(u)),w=u-i;return A[i]*(1-w)+A[i+1]*w;};
X.conduction=(p,ph)=>{const run=ph>0,s=condSim(p,ph);let g='',dfs='';
 /* stand and clamps holding the far ends */
 const c=C();
 g+=c?c.stand(800,412,150,-1):`<rect x="796" y="110" width="9" height="300" fill="#8a9299"/>`;
 RY.forEach(y=>{g+=`<rect x="${RX1-8}" y="${y-11}" width="64" height="22" rx="4" fill="#5b6670"/><rect x="${RX1-14}" y="${y-13}" width="16" height="26" rx="3" fill="#3f4347"/>`;});
 /* Bunsen under the heated ends */
 /* a metal heating block holds the left ends of both rods; the Bunsen heats the block */
 const hot=20+300*(1-Math.exp(-s.t/1.2))*(run?1:0);
 g+=bunsen(146,412,286,ph,run?3:0,84)+`<rect x="120" y="160" width="54" height="134" rx="4" fill="#8f5a2e" stroke="#5a3519"/><rect x="120" y="160" width="54" height="134" rx="4" fill="${rodCol(hot)}" opacity="${f(clamp((hot-20)/300,0,.6))}"/>`+T(147,150,'hot block',{anchor:'middle',size:15,weight:700,fill:'#33404c'})+(run?'':T(146,460,'Press Play to light',{anchor:'middle',size:15,fill:'#e8ecf5'}));
 /* rods with temperature colour and wax pins */
 [p.a,p.b].forEach((m,k)=>{const mt=MAT[m],y=RY[k],A=s.T[k],gid='cg'+k+(p.clip||'');
  dfs+=`<linearGradient id="${gid}m" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${mt.hi}"/><stop offset=".45" stop-color="${mt.base}"/><stop offset="1" stop-color="${mt.lo}"/></linearGradient>`;
  let stops='';for(let i=0;i<=20;i++){const x=i/20,t=tAt(A,x);stops+=`<stop offset="${x}" stop-color="${rodCol(t)}" stop-opacity="${f(clamp((t-20)/90,0,.9))}"/>`;}
  dfs+=`<linearGradient id="${gid}h" x1="0" y1="0" x2="1" y2="0">${stops}</linearGradient>`;
  g+=`<rect x="${RX0}" y="${y-8}" width="${RLEN}" height="16" rx="3" fill="url(#${gid}m)"${mt.metal?'':' opacity=".85" stroke="#7fa6b1"'}/><rect x="${RX0}" y="${y-8}" width="${RLEN}" height="16" rx="3" fill="url(#${gid}h)"/>`;
  PINS.forEach((x,j)=>{const px=RX0+x*RLEN,mtm=s.melt[k][j];
   if(mtm==null){g+=`<ellipse cx="${f(px)}" cy="${y+11}" rx="7" ry="5" fill="#f3e3a6" stroke="#c9b26a"/><path d="M${f(px)} ${y+14}V${y+42}" stroke="#8a9299" stroke-width="2.5"/><circle cx="${f(px)}" cy="${y+44}" r="6" fill="#d0342c" stroke="#8e1f19"/>`;}
   else{const el=ph-mtm,fall=Math.min(1,el/.45),yy=y+44+(400-(y+44))*fall*fall,rot=fall<1?0:(k?-1:1)*(25+hash(j+k*7)*50);
    g+=`<ellipse cx="${f(px)}" cy="${y+10}" rx="5" ry="2.5" fill="#f3e3a6" opacity=".7"/><g transform="rotate(${f(rot)} ${f(px)} ${f(yy)})"><path d="M${f(px)} ${f(yy-30)}V${f(yy-2)}" stroke="#8a9299" stroke-width="2.5"/><circle cx="${f(px)}" cy="${f(yy)}" r="6" fill="#d0342c" stroke="#8e1f19"/></g>`;}
  });
  const far=tAt(A,1),dropped=s.melt[k].filter(v=>v!=null).length;
  g+=T(RX0+8,y-15,`${mt.n}`,{size:18,weight:700})+T(RX1-10,y-15,`far end ${r0(far)} °C · ${dropped} of 5 pins dropped`,{anchor:'end',size:16,fill:'#1d2733'});
 });
 /* zoom marker and zoomed-in particles */
 const zx=RX0+p.zoom/100*RLEN;
 RY.forEach(y=>g+=`<rect x="${f(zx-12)}" y="${y-13}" width="24" height="26" rx="4" fill="none" stroke="#1f6fd1" stroke-width="2.5"/>`);
 const ix=440,iy=8,iw=450,ih=150;g+=card(ix,iy,iw,ih,'')+T(ix+12,iy+22,'Zoomed in at the blue boxes',{size:15,weight:700,fill:'#1d2733'});
 
 [p.a,p.b].forEach((m,k)=>{const mt=MAT[m],t=tAt(s.T[k],p.zoom/100),amp=1+7*clamp((t-20)/250,0,1),y0=iy+34+k*48,x0=ix+138;
  g+=T(ix+12,y0+15,mt.n,{size:15,weight:700})+T(ix+12,y0+34,`${r0(t)} °C`,{size:15,fill:'#b03a2e',weight:700});
  g+=`<rect x="${x0-14}" y="${y0-4}" width="${iw-150}" height="40" rx="4" fill="${mt.metal?'#e9ecef':'#eef7fa'}" stroke="#c9ced3"/>`;
  for(let r=0;r<2;r++)for(let i=0;i<11&&x0+i*25<ix+iw-24;i++){const n=k*100+r*20+i,ox=amp*Math.sin(ph*14+n*1.7),oy=amp*Math.cos(ph*16+n*2.3);
   g+=`<circle cx="${f(x0+i*25+ox)}" cy="${f(y0+8+r*18+oy*.7)}" r="7.5" fill="${heatCol(t)}" stroke="#2c3e50" stroke-width=".8"/>`;}
  if(mt.metal)for(let e=0;e<6;e++){const sp=run?18+30*clamp((t-20)/200,0,1):6,xx=((hash(e+k*13)*270+ph*sp*(e%2?1:-1))%270+270)%270;g+=`<circle cx="${f(x0-8+xx)}" cy="${f(y0+17+6*Math.sin(ph*5+e))}" r="2.6" fill="#1f6fd1"/>`;}
 });
 g+=T(ix+iw-12,iy+ih-9,'small blue dots: free electrons (metals only)',{anchor:'end',size:13,fill:'#1f6fd1',weight:700});
 const A=s.T[0],B=s.T[1],na=MAT[p.a].n,nb=MAT[p.b].n,da=s.melt[0].filter(v=>v!=null).length,db=s.melt[1].filter(v=>v!=null).length;
 const cap=!run?`Press Play to light the Bunsen burner under the ends of the ${na} and ${nb} rods.`:
  `After ${r0(ph)} s (speeded up): ${da} of 5 pins have dropped from the ${na} rod and ${db} of 5 from the ${nb} rod. `+(p.a===p.b?'The rods are the same, so they conduct equally well.':(MAT[p.a].D>MAT[p.b].D?`The ${na} rod`:`The ${nb} rod`)+' is the better thermal conductor: energy passes along it faster.');
 return {svg:room(g,`Two rods, ${na} and ${nb}, heated at one end by a Bunsen burner, with wax and pins along them`,dfs),caption:cap};};

/* ================= convection ================= */
/* velocity field of the convection cells in a box (u across, v up), in box units per second */
const HXS=[.22,.5,.78],HXR=[.07,.5,.93];/* heat source positions: beaker (Bunsen) and room (radiator against the wall) */
/* Two divergence-free cells that share a rising column above the heater (x = hx) and sink by the walls. */
function vel(X,Y,pos,k,hx){const S=Math.sin,Co=Math.cos,P=Math.PI;
 if(X<hx){const xi=(hx-X)/hx;return[k*hx*S(P*xi)*Co(P*Y),k*Co(P*xi)*S(P*Y)];}
 const xi=(X-hx)/(1-hx);return[-k*(1-hx)*S(P*xi)*Co(P*Y),k*Co(P*xi)*S(P*Y)];}
function convSim(p,t){const key=p.scene+'|'+p.heat+'|'+p.pos;let s=p._conv;
 if(!s||s.key!==key||t<s.t-1e-6){const room=p.scene===2,n=room?90:0,pts=[];
  for(let i=0;i<n;i++)pts.push([.04+.92*hash(i*3+1),.04+.92*hash(i*3+2),i,19]);
  s=p._conv={key,t:0,pts,rel:0};}
 const room=p.scene===2,k=(room?.12:.11)*p.heat,dt=.03,hx=(room?HXR:HXS)[p.pos-1];
 while(s.t<t){const h=Math.min(dt,t-s.t);if(h<1e-9)break;
  if(!room){/* release dye from the crystal at the bottom above the flame */const want=Math.min(260,Math.floor((s.t+h)*8));while(s.rel<want){const i=s.rel++;s.pts.push([hx+(hash(i*5+3)-.5)*.05,.03+hash(i*5+4)*.02,i]);}}
  const sd=(room?.02:.035)*Math.sqrt(h);/* random spreading (diffusion) */
  s.pts.forEach(q=>{const a=vel(q[0],q[1],p.pos,k,hx),m=[q[0]+a[0]*h/2,q[1]+a[1]*h/2],b=vel(m[0],m[1],p.pos,k,hx);
   q[0]=clamp(q[0]+b[0]*h+(Math.random()-.5)*2*sd,.015,.985);q[1]=clamp(q[1]+b[1]*h+(Math.random()-.5)*2*sd,.015,.985);
   if(room){/* each air parcel warms beside the radiator and cools by the cold window(s) */const near=Math.abs(q[0]-hx)<.1&&q[1]<.45,cold=p.pos===2?(q[0]<.08||q[0]>.92):(p.pos===1?q[0]>.9:q[0]<.1);
    q[3]+=h*((near?.6*p.heat*(30-q[3]):0)-(cold?1.2*(q[3]-12):0)-.01*(q[3]-19));}});
  s.t+=h;}
 return s;}
const flowArrows=(bx,by,bw,bh,pos,col,hx)=>{/* loop arrows for the cells: up at xu, down at xd (fractions of the width) */const P=[];
 const cell=(xu,xd)=>{const xa=bx+bw*xu,xb=bx+bw*xd,yt=by+bh*.16,yb=by+bh*.84;
  return `<path d="M${f(xa)} ${f(yb)}V${f(yt+25)}Q${f(xa)} ${f(yt)} ${f(xa+(xb-xa)*.2)} ${f(yt)}H${f(xb-(xb-xa)*.2)}Q${f(xb)} ${f(yt)} ${f(xb)} ${f(yt+25)}V${f(yb-25)}Q${f(xb)} ${f(yb)} ${f(xb-(xb-xa)*.2)} ${f(yb)}H${f(xa+(xb-xa)*.2)}" fill="none" stroke="${col}" stroke-width="4" stroke-dasharray="14 9" opacity=".55"/>`+arrowHead(xa,yt+28,-Math.PI/2,13,'#d0342c')+arrowHead(xb,yb-28,Math.PI/2,13,'#2f6fd0');};
 if(hx>.3)P.push(cell(hx+(hx>.6?-.05:0),.07));if(hx<.7)P.push(cell(hx+(hx<.4?.05:0),.93));
 return P.join('');};
X.convection=(p,ph)=>{const run=ph>0,inRoom=p.scene===2,heat=run?p.heat:0,s=convSim(p,run?ph:0),hx=HXS[p.pos-1];let g='',dfs='';
 const side=['left','middle','right'][p.pos-1];
 if(!inRoom){
  const bx=290,by=80,bw=320,bh=200,flx=bx+hx*bw;
  /* tripod, gauze, Bunsen */
  g+=shadow(450,414,150,8,.18)+`<path d="M300 304L272 412M600 304L628 412" stroke="#4a5058" stroke-width="7" stroke-linecap="round"/><rect x="270" y="294" width="360" height="10" rx="3" fill="#7b8189"/><path d="M285 299H615" stroke="#c9ced3" stroke-width="2" stroke-dasharray="3 3"/>`;
  g+=bunsen(flx,414,304,ph,heat,62);
  /* beaker and water */
  dfs+=`<linearGradient id="cv-w${p.clip}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#cfe6f7"/><stop offset="1" stop-color="#b6d8f0"/></linearGradient><radialGradient id="cv-hot${p.clip}" cx="${hx}" cy="1" r=".55"><stop offset="0" stop-color="#ff8a3d" stop-opacity="${f(.12*heat)}"/><stop offset="1" stop-color="#ff8a3d" stop-opacity="0"/></radialGradient>`;
  g+=`<rect x="${bx}" y="${by}" width="${bw}" height="${bh}" fill="url(#cv-w${p.clip})"/><rect x="${bx}" y="${by}" width="${bw}" height="${bh}" fill="url(#cv-hot${p.clip})"/><path d="M${bx-8} ${by-46}V${by+bh+4}Q${bx-8} ${by+bh+12} ${bx} ${by+bh+12}H${bx+bw}Q${bx+bw+8} ${by+bh+12} ${bx+bw+8} ${by+bh+4}V${by-46}" fill="none" stroke="#8fb3c4" stroke-width="5"/><path d="M${bx-8} ${by-46}l-10 -6" stroke="#8fb3c4" stroke-width="5"/>`;
  for(let i=1;i<=4;i++)g+=`<path d="M${bx+bw-30} ${by+bh-i*45}h22" stroke="#8fb3c4" stroke-width="2"/>`;
  if(heat)g+=flowArrows(bx,by,bw,bh,p.pos,'#5b6670',hx);
  /* crystal and dye */
  g+=`<rect x="${f(flx-6)}" y="${by+bh-9}" width="12" height="9" fill="#4a1259" transform="rotate(18 ${f(flx)} ${by+bh-4})"/>`;
  s.pts.forEach(q=>{g+=`<circle cx="${f(bx+q[0]*bw)}" cy="${f(by+bh-q[1]*bh)}" r="3.4" fill="#7b1fa2" opacity=".55"/>`;});
  g+=T(bx+bw/2,by-54,'Water with a crystal of purple dye',{anchor:'middle',size:18,weight:700});
  if(heat){const ux=bx+hx*bw+(p.pos===3?-14:14),an=p.pos===3?'end':'start';g+=T(ux,by+bh*.28,'warm water rises',{anchor:an,size:17,weight:700,fill:'#b03a2e'});
   const dx=p.pos===2?[.27,.73]:[p.pos===1?.62:.38];dx.forEach(u=>{const x=bx+bw*u;g+=T(x,by+bh*.62,'cooler water',{anchor:'middle',size:16,weight:700,fill:'#2f5fa8'})+T(x,by+bh*.62+20,'sinks at the sides',{anchor:'middle',size:16,weight:700,fill:'#2f5fa8'});});}
 }else{
  const bx=110,by=40,bw=520,bh=360;
  /* room box: wall, floor, ceiling */
  g+=`<rect x="${bx-14}" y="${by-14}" width="${bw+28}" height="${bh+28}" fill="#d8d2c4"/><rect x="${bx}" y="${by}" width="${bw}" height="${bh}" fill="#f3efe6"/><rect x="${bx}" y="${by+bh-14}" width="${bw}" height="14" fill="#b08458"/>`;
  /* cold window on the far side, radiator on the heater side */
  const winRight=p.pos!==3,wx=winRight?bx+bw-8:bx-6;
  g+=`<rect x="${wx}" y="${by+70}" width="14" height="150" fill="#bfe3f5" stroke="#7aa6bd" stroke-width="2"/>`+T(winRight?wx-8:wx+22,by+62,'cold window',{anchor:winRight?'end':'start',size:13,fill:'#2f5fa8',weight:700});
  if(p.pos===2){/* freestanding heater in the middle, windows both sides */g+=`<rect x="${bx-6}" y="${by+70}" width="14" height="150" fill="#bfe3f5" stroke="#7aa6bd" stroke-width="2"/>`;}
  const rx=bx+HXR[p.pos-1]*bw,rw=p.pos===2?70:40;
  g+=`<rect x="${f(rx-rw/2)}" y="${by+bh-110}" width="${rw}" height="90" rx="4" fill="${heat?'#f2e6dc':'#eceff1'}" stroke="#9aa3ad" stroke-width="2"/>`;
  for(let i=1;i<6;i++)g+=`<path d="M${f(rx-rw/2+i*rw/6)} ${by+bh-104}V${by+bh-26}" stroke="#c4c9ce" stroke-width="2"/>`;
  if(heat)g+=`<rect x="${f(rx-rw/2-6)}" y="${by+bh-116}" width="${rw+12}" height="100" rx="6" fill="#ff8a3d" opacity="${f(.08+.06*heat)}"/>`;
  g+=T(rx,by+bh+36,heat?'radiator on':'radiator off',{anchor:'middle',size:16,weight:700,fill:'#1d2733'});
  if(heat)g+=flowArrows(bx,by,bw,bh-14,p.pos,'#5b6670',HXR[p.pos-1]);
  /* air parcels coloured by whether they are rising (warm) or sinking (cool) */
  s.pts.forEach(q=>{const w=clamp((q[3]-15)/10,0,1),col=`rgb(${r0(60+180*w)},${r0(110-30*w)},${r0(210-170*w)})`;
   g+=`<circle cx="${f(bx+q[0]*bw)}" cy="${f(by+(bh-14)-q[1]*(bh-14))}" r="5" fill="${col}" opacity=".8"/>`;});
  /* thermometers near the ceiling and the floor */
  const avg=f=>{const a=s.pts.filter(f);return a.length?a.reduce((t,q)=>t+q[3],0)/a.length:19;},top=avg(q=>q[1]>.75),bot=avg(q=>q[1]<.25);
  g+=card(650,70,240,190,'')+T(664,96,'Air temperature',{size:16,weight:700})+T(664,132,'near the ceiling',{size:16})+T(878,132,`${top.toFixed(1)} °C`,{anchor:'end',size:20,weight:700,fill:'#b03a2e'})+T(664,172,'near the floor',{size:16})+T(878,172,`${bot.toFixed(1)} °C`,{anchor:'end',size:20,weight:700,fill:'#2f5fa8'})+T(664,212,'dots: air, coloured by',{size:14,fill:'#33404c'})+T(664,232,'temperature: blue cool,',{size:14,fill:'#33404c'})+T(664,250,'red warm',{size:14,fill:'#33404c'});
 }
 /* why warm fluid rises: particle spacing */
 if(!inRoom){const ix=636,iy=96,iw=254,ih=214;g+=card(ix,iy,iw,ih,'')+T(ix+12,iy+24,'Why does warm water rise?',{size:16,weight:700,fill:'#1d2733'});
  const box=(x,y,sp,col,lab,lab2)=>{let q=`<rect x="${x}" y="${y}" width="104" height="96" rx="5" fill="#e8f2f9" stroke="#9fbccc"/>`;for(let r=0;r<4;r++)for(let c=0;c<4;c++){const n=r*4+c,j=(sp-1)*6;const cx=x+52+(c-1.5)*20*sp+j*.5*Math.sin(ph*9+n),cy=y+48+(r-1.5)*20*sp+j*.5*Math.cos(ph*8+n*1.3);if(cx>x+6&&cx<x+98&&cy>y+6&&cy<y+90)q+=`<circle cx="${f(cx)}" cy="${f(cy)}" r="7" fill="${col}" stroke="#2c3e50" stroke-width=".8"/>`;}return q+T(x+52,y+118,lab,{anchor:'middle',size:16,weight:700})+T(x+52,y+138,lab2[0],{anchor:'middle',size:14,fill:'#33404c'})+T(x+52,y+156,lab2[1],{anchor:'middle',size:14,fill:'#33404c'});};
  g+=box(ix+14,iy+38,1,'#5b8fd6','cooler',['close together','more dense'])+box(ix+136,iy+38,1.28,'#f08a3c','warmer',['spread out','less dense']);}
 const cap=inRoom?(heat?`The air next to the radiator warms, expands and rises to the ceiling. It cools as it moves across the room and by the ${p.pos===2?'windows':'window'}, becomes denser and sinks, then flows back along the floor. The ceiling ends up warmer than the floor.`:(run?'The radiator is off, so the air hardly moves and the room is the same temperature everywhere.':'Press Play to start the model.')):
  (heat?`The flame heats the water on the ${side}. That water warms, expands and becomes less dense, so it rises, carrying the purple dye with it. Cooler, denser water sinks to take its place: a convection current.`:(run?'No heating: the dye only spreads slowly from the crystal, by diffusion. There is no convection current.':'Press Play to drop in the crystal and start heating.'));
 return {svg:room(g,inRoom?'A room with a radiator and a cold window, showing air moving in a convection current':'A beaker of water heated by a Bunsen burner, with purple dye showing a convection current',dfs),caption:cap};};

/* ================= radiation ================= */
const SURF={1:{n:'matt black',a:.92,body:'#1e2226',hi:'#3a4046',ring:'#0d0f11'},2:{n:'shiny silver',a:.12,body:'#c9cfd5',hi:'#ffffff',ring:'#8a9299'}};
const HX=450,CANS=[160,740],CY0=236,CY1=402,CW=96;
X.radiation=(p,ph)=>{const run=ph>0,vac=p.vac===1;let g='',dfs='';
 /* bell jar on a plate */
 g+=shadow(450,420,370,10,.2)+`<rect x="64" y="404" width="772" height="14" rx="4" fill="#9aa3ad"/><rect x="64" y="404" width="772" height="3" fill="#d5dade"/>`;
 g+=`<path d="M78 404V160Q78 40 450 40Q822 40 822 160V404" fill="${vac?'#eef3f6':'#e8f1f6'}" fill-opacity=".35" stroke="#9fbccc" stroke-width="4"/><path d="M110 380V170Q112 70 300 58" fill="none" stroke="#fff" stroke-width="6" opacity=".5"/>`;
 g+=`<path d="M836 412H874V450" stroke="#5b6670" stroke-width="8" fill="none"/>`+T(868,466,vac?'pump on: air removed':'to vacuum pump',{anchor:'end',size:13,fill:'#e8ecf5'});
 /* air particles */
 if(!vac)for(let i=0;i<70;i++){const x=110+hash(i)*680,y=70+hash(i+99)*320,j=3;const xx=x+j*Math.sin(ph*11+i),yy=y+j*Math.cos(ph*13+i*2);if(Math.abs(xx-HX)<44&&yy>200)continue;if(CANS.some(c=>Math.abs(xx-c)<CW/2+6&&yy>CY0-30))continue;g+=`<circle cx="${f(xx)}" cy="${f(yy)}" r="3" fill="#7f8c99" opacity=".5"/>`;}
 /* heater: a glowing element */
 const glow=run?1:0;
 dfs+=`<radialGradient id="rd-g${p.clip}" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ffcf6a" stop-opacity="${.55*glow}"/><stop offset="1" stop-color="#ff7a2e" stop-opacity="0"/></radialGradient>`;
 g+=`<circle cx="${HX}" cy="300" r="120" fill="url(#rd-g${p.clip})"/><rect x="${HX-30}" y="388" width="60" height="16" rx="3" fill="#3b4148"/><rect x="${HX-7}" y="230" width="14" height="160" fill="#6b737b"/><rect x="${HX-22}" y="226" width="44" height="150" rx="10" fill="#d5dade" opacity=".55" stroke="#9aa3ad"/>`;
 for(let i=0;i<9;i++)g+=`<ellipse cx="${HX}" cy="${246+i*15}" rx="16" ry="5" fill="none" stroke="${run?`rgb(255,${r0(90+40*Math.sin(ph*6+i))},40)`:'#7b8189'}" stroke-width="3.5"/>`;
 g+=T(HX,212,run?'heater on':'heater off',{anchor:'middle',size:18,weight:700,fill:run?'#b03a2e':'#4a5560'});
 /* infrared wave packets: emitted every 0.12 s alternately left and right at different heights */
 const temps=[p.left,p.right].map(m=>SURF[m]);
 if(run){const N=Math.floor(ph/.12),speed=260;
  /* radiation going upwards, away from the cans, also shows it spreads in all directions */
  const M2=Math.floor(ph/.3);for(let i=Math.max(0,M2-12);i<=M2;i++){const el=ph-i*.3;if(el<0)continue;const d=el*speed;if(d>230)continue;const an=-Math.PI/2+(hash(i*11+5)-.5)*2.2,cx0=HX+Math.cos(an)*30,cy0=290+Math.sin(an)*40,al=1-d/230,ux=Math.cos(an),uy=Math.sin(an),len=48;let path='';
   for(let k=0;k<=16;k++){const u=k/16,s0=d-len*(1-u),w=7*Math.sin(u*Math.PI*4-ph*30);path+=(k?'L':'M')+f(cx0+ux*s0-uy*w)+' '+f(cy0+uy*s0+ux*w);}
   g+=`<path d="${path}" fill="none" stroke="#d7301f" stroke-width="3" stroke-linecap="round" opacity="${f(.8*al)}"/>`;}
  for(let i=Math.max(0,N-60);i<=N;i++){const t0=i*.12,el=ph-t0;if(el<0)continue;const dir=i%2?1:-1,can=dir<0?0:1,yy=CY0+14+hash(i)*(CY1-CY0-40),x0=HX+dir*26,xEdge=CANS[can]-dir*(CW/2),dist=Math.abs(xEdge-x0);
   let d=el*speed,x,refl=false,alpha=1;const absorbed=hash(i*7+3)<temps[can].a;
   if(d<dist)x=x0+dir*d;else if(absorbed){if(d-dist<18){g+=`<circle cx="${f(xEdge)}" cy="${f(yy)}" r="${f(4+(d-dist)/2)}" fill="#ff7a2e" opacity="${f(.7-(d-dist)/30)}"/>`;}continue;}
   else{refl=true;const back=d-dist;if(back>200)continue;x=xEdge-dir*back;alpha=1-back/200;}
   const dd=refl?-dir:dir,len=48;let path='';for(let k=0;k<=16;k++){const u=k/16,px=x-dd*len*(1-u),py=yy+7*Math.sin(u*Math.PI*4-ph*30);path+=(k?'L':'M')+f(px)+' '+f(py);}
   g+=`<path d="${path}" fill="none" stroke="#d7301f" stroke-width="3.4" stroke-linecap="round" opacity="${f(.95*alpha)}"/>`+arrowHead(x+dd*4,yy+7*Math.sin(Math.PI*4-ph*30),dd>0?0:Math.PI,11,`rgba(215,48,31,${f(.95*alpha)})`);}
 }
 /* cans with thermometers */
 [p.left,p.right].forEach((m,k)=>{const sf=SURF[m],cx=CANS[k],x=cx-CW/2,P=1,kk=.035,tC=20+(run?(sf.a*P*42)*(1-Math.exp(-kk*ph)):0);
  dfs+=`<linearGradient id="rd-c${k}${p.clip}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${sf.ring}"/><stop offset=".3" stop-color="${sf.hi}"/><stop offset=".55" stop-color="${sf.body}"/><stop offset="1" stop-color="${sf.ring}"/></linearGradient>`;
  g+=`<rect x="${x}" y="${CY0}" width="${CW}" height="${CY1-CY0}" rx="6" fill="url(#rd-c${k}${p.clip})" stroke="${sf.ring}"/><ellipse cx="${cx}" cy="${CY0}" rx="${CW/2}" ry="8" fill="${sf.ring}"/>`;
  if(m===2)g+=`<rect x="${x+16}" y="${CY0+10}" width="8" height="${CY1-CY0-20}" rx="4" fill="#fff" opacity=".7"/>`;
  /* thermometer */
  const ty=CY0-112,frac=clamp((tC-0)/100,0,1);
  g+=`<rect x="${cx-6}" y="${ty}" width="12" height="140" rx="6" fill="#f6fbfd" stroke="#8fa1ad"/><circle cx="${cx}" cy="${ty+136}" r="9" fill="#d0342c"/><rect x="${cx-2.5}" y="${f(ty+128-frac*118)}" width="5" height="${f(frac*118+4)}" fill="#d0342c"/>`;
  g+=card(cx-80,ty-70,160,62)+T(cx,ty-49,sf.n+' can',{anchor:'middle',size:16,weight:700,fill:'#1d2733'})+T(cx,ty-21,`${tC.toFixed(1)} °C`,{anchor:'middle',size:22,weight:700,fill:'#b03a2e'});
 });
 g+=T(450,26,vac?'Vacuum: no particles, but the radiation still gets through':'Air inside the jar',{anchor:'middle',size:18,weight:700,fill:'#1d2733'});
 const t=[p.left,p.right].map(m=>20+(run?SURF[m].a*42*(1-Math.exp(-.035*ph)):0)),nl=SURF[p.left].n,nr=SURF[p.right].n;
 const cap=!run?'Press Play to switch on the heater.':(p.left===p.right?`Both cans are ${nl}, so they warm at the same rate (${t[0].toFixed(1)} °C).`:`After ${r0(ph)} s (speeded up): the ${p.left===1?nl:nr} can is at ${Math.max(...t).toFixed(1)} °C and the ${p.left===1?nr:nl} can is at ${Math.min(...t).toFixed(1)} °C. The matt black surface absorbs most of the infrared; the shiny surface reflects most of it.`)+(vac?' The jar is a vacuum, yet the cans still warm: radiation does not need particles.':'');
 return {svg:room(g,`A heater between two cans, ${nl} and ${nr}, inside a bell jar, giving out infrared radiation`,dfs),caption:cap};};

root.KSModelsExtra=Object.assign(root.KSModelsExtra||{},X);
})(typeof window==='undefined'?globalThis:window);
