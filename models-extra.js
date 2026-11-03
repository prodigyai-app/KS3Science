/* Extra KS3 interactive models (rendered as 900×470 scenes). Registered into KSModels.defs; models.js render() calls window.KSModelsExtra[id]. */
(root=>{'use strict';
const M=root.KSModels;if(!M)return;
const f=v=>(+v).toFixed(1),fmt=v=>String(+(+v).toFixed(2));
const T=(x,y,s,o={})=>`<text x="${f(x)}" y="${f(y)}" font-family="Arial" font-size="${o.size||13}" text-anchor="${o.anchor||'start'}" fill="${o.fill||'#26313a'}"${o.weight?` font-weight="${o.weight}"`:''}>${s}</text>`;
const card=(t,v,x=636,dark)=>`<rect x="${x+2}" y="29" width="242" height="60" rx="6" fill="#000" opacity=".12"/><rect x="${x}" y="26" width="242" height="60" rx="6" fill="${dark?'#121a2e':'#fbfaf5'}" stroke="${dark?'#2a3550':'#c9c4b5'}"/>${T(x+12,48,t,{size:11,fill:dark?'#9aa6bd':'#5b6670'})}${T(x+12,74,v,{size:18,weight:700,fill:dark?'#e8ecf5':'#1d2a33'})}`;
const C=()=>root.LAB&&root.LAB.C;
const svg=(label,body)=>`<svg class="ks-real" viewBox="0 0 900 470" role="img" aria-label="${label}">${body}</svg>`;
const room=(g,label)=>{const c=C();return svg(label,(c?c.room(330)+c.benchFront(440):'<rect width="900" height="470" fill="#eef1f4"/>')+g);};
const shadow=(x,y,rx,ry=6)=>`<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="#000" opacity=".18"/>`;
const arrow=(x1,y1,x2,y2,c='#26313a',w=3)=>{const a=Math.atan2(y2-y1,x2-x1),h=11,hx=x2-h*Math.cos(a),hy=y2-h*Math.sin(a);return `<path d="M${f(x1)} ${f(y1)}L${f(hx)} ${f(hy)}" stroke="${c}" stroke-width="${w}"/><path d="M${f(x2)} ${f(y2)}L${f(hx-5*Math.sin(a))} ${f(hy+5*Math.cos(a))}L${f(hx+5*Math.sin(a))} ${f(hy-5*Math.cos(a))}Z" fill="${c}"/>`;};
const rg=(id,a,b)=>`<radialGradient id="${id}" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></radialGradient>`;
const lg=(id,a,b,h)=>`<linearGradient id="${id}" x1="0" y1="0" x2="${h?1:0}" y2="${h?0:1}"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient>`;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));

const defs={
 race:{title:'Speed race',params:[['d','Race distance / m',20,200,10,100],['t','Your time / s',5,40,1,16]],note:'Average speed = total distance ÷ total time. The runner speeds up and slows down in real life; the model shows a steady average speed. The cyclist travels at a steady 8 m/s for comparison.',animate:'phase'},
 shoes:{title:'Pressure under your feet',params:[['F','Your weight / N',200,900,50,600],['shoe','Shoe: 1 stiletto heel, 2 trainer, 3 snowshoe',1,3,1,2]],note:'Pressure = force ÷ area. The same weight spread over a bigger area gives a smaller pressure, so you sink less. Areas are rough values for standing on one foot.'},
 populations:{title:'Predators and prey',params:[['foxes','Foxes at the start',0,12,1,4],['grass','Grass growth',1,3,1,2]],note:'A simple model of a food chain: grass → rabbits → foxes. More rabbits means more food for foxes; more foxes means more rabbits are eaten. Real ecosystems have many more links, diseases and weather.',animate:'phase'},
 rate:{title:'Reaction rate',params:[['temp','Temperature / °C',10,60,5,20],['conc','Acid concentration: 1 low, 2 medium, 3 high',1,3,1,2],['cat','Catalyst: 0 no, 1 yes',0,1,1,0]],note:'Particles must collide with enough energy to react. Hotter particles move faster and collide harder; more concentrated acid has more particles; a catalyst helps collisions succeed. Gas collected in the syringe shows the rate.',animate:'phase'},
 ph:{title:'pH and universal indicator',params:[['pH','pH',1,14,1,7]],note:'Universal indicator shows a colour for each pH. Below 7 is acidic, 7 is neutral and above 7 is alkaline. Each step down the scale is ten times more acidic.'},
 seasons:{title:'Why we have seasons',params:[['month','Month (1 = January)',1,12,1,6]],note:'Earth’s axis is tilted and always points the same way in space. When the northern half tilts towards the Sun, the UK has long days and high Sun: summer. Distance from the Sun changes very little.',animate:'month'},
 electromagnet:{title:'Electromagnet strength',params:[['coils','Number of coils',10,50,10,20],['I','Current / A',0.5,3,0.5,1.5],['core','Iron core: 0 no, 1 yes',0,1,1,1]],note:'A current in a coil makes a magnetic field. More coils, a bigger current or an iron core make the electromagnet stronger, so it picks up more paperclips. Too much current can make the wire hot.'},
 rockcycle:{title:'The rock cycle',params:[['step','Stage',1,6,1,1]],note:'Rocks change slowly over millions of years. This is one route around the cycle; rocks can take many other routes.',animate:'step'},
 breathing:{title:'Bell-jar model of breathing',params:[['rate','Breaths per minute',8,30,1,14]],note:'Pulling the rubber sheet (diaphragm) down makes the space inside bigger, so pressure falls and air flows in. The model does not show ribs moving, and the balloons are not alveoli.',animate:'phase'},
 bill:{title:'Electricity bill calculator',params:[['P','Power / kW',0.1,3,0.1,2],['h','Time used / hours',0.5,8,0.5,1],['price','Price / pence per kWh',10,40,1,25]],note:'Energy in kWh = power in kW × time in hours. Cost = energy × price per kWh. A kilowatt-hour is the energy used by a 1 kW device in one hour.'}
};
Object.assign(M.defs,defs);

const X={};
/* ---------- speed race ---------- */
X.race=(p,ph)=>{const v=p.d/p.t,total=Math.max(p.t,p.d/8)+2,te=(ph*2.5)%total,run=Math.min(te,p.t),x0=90,x1=820,sx=d=>x0+(x1-x0)*d/p.d;
 const rx=sx(Math.min(p.d,v*run)),cx=sx(Math.min(p.d,8*Math.min(te,p.d/8)));
 let g=`<defs>${lg('rc-tr','#c8553a','#9a3a24')}${lg('rc-gr','#7fc06a','#4f8f3f')}</defs><rect width="900" height="470" fill="#cfe8f7"/><rect y="150" width="900" height="320" fill="url(#rc-gr)"/>`;
 g+=`<path d="M0 210H900V420H0Z" fill="url(#rc-tr)"/>`+[260,315,370].map(y=>`<path d="M0 ${y}H900" stroke="#fff" stroke-width="3" stroke-dasharray="0" opacity=".85"/>`).join('');
 g+=`<path d="M${x0} 210V420" stroke="#fff" stroke-width="6"/><path d="M${x1} 210V420" stroke="#111" stroke-width="6" stroke-dasharray="10 10"/><path d="M${x1} 210V420" stroke="#fff" stroke-width="6" stroke-dasharray="10 10" stroke-dashoffset="10"/>`;
 for(let d=0;d<=p.d;d+=p.d/5)g+=T(sx(d),440,Math.round(d)+' m',{anchor:'middle',size:12,fill:'#fff'});
 const leg=Math.sin(ph*14)*12*(run<p.t?1:0);
 g+=shadow(rx,300,22,4)+`<g transform="translate(${f(rx)} 222) scale(1.5)"><circle cx="0" cy="-8" r="9" fill="#f2c9a8"/><path d="M0 0V30" stroke="#1d4f9a" stroke-width="9" stroke-linecap="round"/><path d="M0 8L${12-leg/2} 20M0 8L${-12+leg/2} 18" stroke="#f2c9a8" stroke-width="5" stroke-linecap="round"/><path d="M0 30L${leg} 56M0 30L${-leg} 56" stroke="#26313a" stroke-width="6" stroke-linecap="round"/></g>`;
 g+=shadow(cx,372,40,4)+`<g transform="translate(${f(cx)} 330) scale(1.4)"><circle cx="-18" cy="22" r="13" fill="none" stroke="#26313a" stroke-width="3"/><circle cx="18" cy="22" r="13" fill="none" stroke="#26313a" stroke-width="3"/><path d="M-18 22L-2 4H14L18 22M-2 4L4 -6" stroke="#d6533c" stroke-width="3.5" fill="none"/><circle cx="4" cy="-16" r="7" fill="#f2c9a8"/><path d="M4 -10L0 6" stroke="#2f8f5a" stroke-width="7" stroke-linecap="round"/></g>`;
 g+=T(20,250,'You',{size:13,weight:700,fill:'#fff'})+T(20,350,'Cyclist 8 m/s',{size:12,weight:700,fill:'#fff'});
 g+=card('Your average speed',fmt(v)+' m/s')+card('Time running',fmt(run)+' s',380);
 return {svg:svg('A runner and a cyclist racing along a track',g),caption:`Speed = ${p.d} m ÷ ${p.t} s = ${fmt(v)} m/s. ${v>8?'You beat the cyclist.':v<8?'The cyclist is faster.':'You tie with the cyclist.'}`};};

/* ---------- pressure and shoes ---------- */
X.shoes=(p)=>{const A=[0,10,150,1000][p.shoe],P=p.F/A,depth=clamp(14*Math.log10(P*4+1),2,60),name=['','stiletto heel','trainer','snowshoe'][p.shoe];
 let g=`<defs>${lg('sh-snow','#ffffff','#cfdbe6')}${lg('sh-sky','#bfe0f5','#eaf5fb')}</defs><rect width="900" height="470" fill="url(#sh-sky)"/><path d="M0 330Q450 300 900 330V470H0Z" fill="url(#sh-snow)"/>`;
 const cx=330,top=330+depth;
 g+=`<path d="M${cx-140} 330Q${cx} ${top+12} ${cx+140} 330" fill="#b9c8d6" opacity=".6"/>`;
 g+=`<rect x="${cx-24}" y="${top-210}" width="48" height="150" rx="18" fill="#3f6fb8"/><rect x="${cx-26}" y="${top-90}" width="52" height="40" rx="8" fill="#f2c9a8"/>`;
 if(p.shoe===1)g+=`<path d="M${cx-30} ${top-60}H${cx+70}Q${cx+90} ${top-40} ${cx+80} ${top-8}H${cx+60}L${cx+20} ${top-40}H${cx-10}L${cx-22} ${top}H${cx-28}L${cx-36} ${top-40}Z" fill="#b8302a"/>`;
 if(p.shoe===2)g+=`<path d="M${cx-38} ${top-60}H${cx+50}Q${cx+96} ${top-48} ${cx+96} ${top-14}H${cx-40}Z" fill="#f4f7f9" stroke="#5b6670" stroke-width="2"/><rect x="${cx-42}" y="${top-14}" width="140" height="14" rx="5" fill="#26313a"/>`;
 if(p.shoe===3)g+=`<path d="M${cx-30} ${top-60}H${cx+50}Q${cx+80} ${top-44} ${cx+70} ${top-20}H${cx-30}Z" fill="#7a5a3a"/><ellipse cx="${cx+20}" cy="${top-6}" rx="150" ry="16" fill="#3d4654"/><ellipse cx="${cx+20}" cy="${top-6}" rx="140" ry="10" fill="none" stroke="#9aa3ad" stroke-width="2" stroke-dasharray="6 5"/>`;
 g+=arrow(cx+180,top-200,cx+180,top-120,'#d0342c',4)+T(cx+196,top-160,'weight '+p.F+' N',{size:14,weight:700,fill:'#d0342c'});
 g+=`<path d="M${cx-160} 330V${f(top)}" stroke="#26313a" stroke-width="1.5"/>`+T(cx-168,(330+top)/2+5,'sinks '+Math.round(depth/2)+' cm',{anchor:'end',size:12});
 g+=card('Pressure = force ÷ area',fmt(P)+' N/cm²')+card('Contact area',A+' cm² ('+name+')',380);
 return {svg:svg('A foot in a '+name+' standing on snow',g),caption:`Pressure = ${p.F} N ÷ ${A} cm² = ${fmt(P)} N/cm². ${p.shoe===1?'The tiny area gives a huge pressure, so the heel sinks.':p.shoe===3?'The large area spreads the weight, so you hardly sink.':'A medium area gives a medium pressure.'}`};};

/* ---------- predators and prey ---------- */
const popCache={};
function simulate(foxes,grass){const key=foxes+':'+grass;if(popCache[key])return popCache[key];let r=40,fx=foxes;const K=[0,60,90,120][grass],out=[];
 for(let i=0;i<240;i++){out.push([r,fx]);const nr=r+0.08*r*(1-r/K)-0.012*r*fx,nf=fx+0.0024*r*fx-0.05*fx;r=Math.max(0.5,nr);fx=foxes?Math.max(0.2,nf):0;}return popCache[key]=out;}
X.populations=(p,ph)=>{const s=simulate(p.foxes,p.grass),n=Math.floor((ph*12)%s.length),[r,fx]=s[n],x0=90,y0=420,W=520,H=250,mx=Math.max(...s.map(v=>Math.max(v[0],v[1]*6)))*1.1||1;
 const path=k=>'M'+s.map((v,i)=>f(x0+W*i/(s.length-1))+' '+f(y0-H*v[k]/mx*(k?6:1))).join('L');
 let g=`<rect width="900" height="470" fill="#f4f8ef"/><rect x="${x0}" y="${y0-H}" width="${W}" height="${H}" fill="#fff" stroke="#c9d2c0"/>`;
 g+=`<path d="${path(0)}" stroke="#a0784e" stroke-width="3" fill="none"/>`+(p.foxes?`<path d="${path(1)}" stroke="#e8792a" stroke-width="3" fill="none"/>`:'');
 g+=`<path d="M${f(x0+W*n/(s.length-1))} ${y0-H}V${y0}" stroke="#26313a" stroke-dasharray="4 4"/>`+T(x0+W/2,y0+30,'time (generations)',{anchor:'middle'})+T(x0-10,y0-H-12,'population',{size:12})+T(x0+10,y0-H+20,'rabbits',{fill:'#a0784e',weight:700})+(p.foxes?T(x0+80,y0-H+20,'foxes (×6 scale)',{fill:'#e8792a',weight:700}):'');
 const icons=(cnt,col,y,lab)=>{let s2=T(650,y-6,lab+': '+Math.round(cnt),{weight:700,fill:col});for(let i=0;i<Math.min(30,Math.round(cnt/(col==='#a0784e'?4:1)));i++)s2+=`<circle cx="${660+(i%10)*20}" cy="${y+12+Math.floor(i/10)*20}" r="7" fill="${col}"/>`;return s2;};
 g+=icons(r,'#a0784e',190,'Rabbits')+icons(fx,'#e8792a',320,'Foxes')+T(650,180+90,'(each dot = 4 rabbits)',{size:11,fill:'#5b6670'})+T(650,420,'(each dot = 1 fox)',{size:11,fill:'#5b6670'});
 g+=T(40,50,'grass → rabbits → foxes',{size:18,weight:700});
 return {svg:svg('Graph of rabbit and fox populations over time',g),caption:p.foxes?`Rabbits ${Math.round(r)}, foxes ${Math.round(fx)}. When rabbits increase, foxes increase soon after; then rabbits fall.`:`With no foxes, rabbits grow until grass limits them at about ${Math.round(s.at(-1)[0])}.`};};

/* ---------- reaction rate ---------- */
X.rate=(p,ph)=>{const k=p.conc/2*Math.pow(2,(p.temp-20)/10)*(p.cat?2.5:1),t=(ph*3)%60,V=100*(1-Math.exp(-k*t/40)),sp=0.6+p.temp/30;
 let g=`<defs>${rg('rt-a','#ffd2cc','#c8372a')}${rg('rt-b','#d6e6ff','#2f6ab8')}${lg('rt-gl','#e8f6ff','#b9d6e6',1)}</defs>`;
 const bx=200,by=260;g+=shadow(bx,402,90,7)+`<path d="M${bx-80} 250V390Q${bx-80} 400 ${bx-70} 400H${bx+70}Q${bx+80} 400 ${bx+80} 390V250" fill="url(#rt-gl)" stroke="#8fb3c4" stroke-width="3"/><rect x="${bx-77}" y="300" width="154" height="98" fill="#bfe3f2" opacity=".6"/>`;
 for(let i=0;i<10+p.conc*8;i++){const x=bx-70+((i*53+ph*60*sp*(i%2?1:-1))%140+140)%140,y=305+((i*37+ph*40*sp*(i%3?1:-1))%88+88)%88;g+=`<circle cx="${f(x)}" cy="${f(y)}" r="4.5" fill="url(#rt-a)"/>`;}
 for(let i=0;i<8;i++){const x=bx-64+i*18,y=388;g+=`<rect x="${x}" y="${y}" width="12" height="9" rx="2" fill="#9aa3ad" stroke="#5b6670"/>`;}
 const bub=Math.round(k*3);for(let i=0;i<bub;i++){const y=390-((ph*80*(1+i%3)+i*29)%90);g+=`<circle cx="${bx-60+(i*31)%120}" cy="${f(y)}" r="3" fill="none" stroke="#fff" stroke-width="1.5"/>`;}
 if(p.cat)g+=T(bx,420,'catalyst added',{anchor:'middle',size:12,weight:700,fill:'#2f8f5a'});
 g+=`<path d="M${bx} 250V120H420" stroke="#8fb3c4" stroke-width="6" fill="none"/><rect x="${bx-14}" y="240" width="28" height="14" rx="3" fill="#3d4654"/>`;
 const sx=420,sy=120;g+=`<rect x="${sx}" y="${sy-22}" width="240" height="44" rx="6" fill="url(#rt-gl)" stroke="#8fb3c4" stroke-width="2"/>`+Array.from({length:11},(_,i)=>`<path d="M${sx+20+i*20} ${sy-22}v10" stroke="#5b6670"/>`).join('')+`<rect x="${f(sx+20+2*V)}" y="${sy-18}" width="10" height="36" fill="#9aa3ad"/><rect x="${f(sx+30+2*V)}" y="${sy-4}" width="${f(240-2*V)}" height="8" fill="#9aa3ad"/>`+T(sx,sy+42,'gas syringe: '+Math.round(V)+' cm³',{size:13,weight:700});
 const gx=470,gy=310,GW=380,GH=120;g+=`<path d="M${gx} ${gy-GH}V${gy}H${gx+GW}" stroke="#26313a" fill="none" stroke-width="2"/><path d="M${Array.from({length:61},(_,i)=>f(gx+GW*i/60)+' '+f(gy-GH*(1-Math.exp(-k*i/40)))).join('L')}" stroke="#d0342c" stroke-width="2.5" fill="none" stroke-dasharray="${f(GW*t/60*1.6)} 2000"/>`+T(gx+GW/2,gy+18,'time',{anchor:'middle',size:12})+T(gx-6,gy-GH-6,'gas volume',{size:12});
 g+=card('Relative rate',fmt(k));
 return {svg:room(g,'Acid reacting with metal in a flask, with gas collected in a syringe'),caption:`Rate is about ${fmt(k)} times the 20 °C, medium-concentration rate${p.cat?' with a catalyst':''}. Faster particles and more particles mean more successful collisions.`};};

/* ---------- pH ---------- */
const PHC=['','#d7191c','#e8412c','#f46d2c','#fb9a2c','#fdc12c','#f2e033','#86c540','#2fa84f','#1b9e77','#1f8fb4','#2b6bb8','#3a4fa8','#4b3a96','#5a2a86'];
const EX={1:'battery acid',2:'lemon juice',3:'vinegar',4:'tomato juice',5:'black coffee',6:'milk',7:'pure water',8:'sea water',9:'baking soda',10:'soap',11:'ammonia cleaner',12:'soapy bleach',13:'oven cleaner',14:'drain cleaner'};
X.ph=(p)=>{const c=PHC[p.pH],kind=p.pH<7?'acid':p.pH>7?'alkali':'neutral';
 let g=`<defs>${lg('ph-gl','#e8f6ff','#b9d6e6',1)}</defs>`;
 g+=shadow(220,402,90,7)+`<path d="M140 220V390Q140 400 150 400H290Q300 400 300 390V220" fill="url(#ph-gl)" stroke="#8fb3c4" stroke-width="3"/><path d="M143 280V388Q143 397 152 397H288Q297 397 297 388V280Z" fill="${c}" opacity=".88"/><ellipse cx="220" cy="280" rx="77" ry="6" fill="${c}"/><rect x="150" y="226" width="8" height="160" rx="4" fill="#fff" opacity=".5"/>`;
 g+=`<path d="M270 120V250" stroke="#8fb3c4" stroke-width="8" stroke-linecap="round"/><ellipse cx="270" cy="110" rx="12" ry="18" fill="#3d4654"/>`+T(255,96,'universal indicator',{size:12,anchor:'end'});
 const x0=380,w=34;for(let i=1;i<=14;i++)g+=`<rect x="${x0+(i-1)*w}" y="200" width="${w}" height="50" fill="${PHC[i]}"/>`+T(x0+(i-0.5)*w,272,i,{anchor:'middle',size:13,weight:i===p.pH?700:400});
 g+=`<path d="M${x0+(p.pH-0.5)*w} 192l-9 -16h18z" fill="#26313a"/><rect x="${x0+(p.pH-1)*w}" y="200" width="${w}" height="50" fill="none" stroke="#26313a" stroke-width="3"/>`;
 g+=T(x0,300,'acids',{size:13,weight:700,fill:'#d7191c'})+T(x0+6*w+w/2,300,'neutral',{anchor:'middle',size:13,weight:700,fill:'#2fa84f'})+T(x0+14*w,300,'alkalis',{anchor:'end',size:13,weight:700,fill:'#4b3a96'});
 g+=T(x0,120,'Example at pH '+p.pH+': '+EX[p.pH],{size:15,weight:700})+T(x0,146,p.pH<7?'Lower pH = more strongly acidic.':p.pH>7?'Higher pH = more strongly alkaline.':'Neither acidic nor alkaline.',{size:13});
 g+=card('Solution is',kind[0].toUpperCase()+kind.slice(1)+' · pH '+p.pH);
 return {svg:room(g,'A beaker of solution coloured by universal indicator next to the pH scale'),caption:`pH ${p.pH}: ${kind}. Example: ${EX[p.pH]}.`};};

/* ---------- seasons ---------- */
const MON=['','January','February','March','April','May','June','July','August','September','October','November','December'];
X.seasons=(p)=>{const m=p.month,a=Math.PI+(m-6)*Math.PI/6,cx=300,cy=235,ex=cx+230*Math.cos(a),ey=cy+95*Math.sin(a),c=Math.cos((m-6.3)*Math.PI/6),day=12+4.4*c,alt=38+23.4*c,season=m>=3&&m<=5?'spring':m>=6&&m<=8?'summer':m>=9&&m<=11?'autumn':'winter';
 let st='';for(let i=0;i<60;i++)st+=`<circle cx="${(i*137)%900}" cy="${(i*89)%470}" r="${i%7?0.8:1.5}" fill="#fff" opacity="${.3+(i%5)*.12}"/>`;
 let g=`<defs>${rg('ss-sun','#fff6c8','#ff9a2a')}${rg('ss-e','#9fd8ff','#0b2350')}<radialGradient id="ss-glow"><stop offset="0" stop-color="#ffd27a" stop-opacity=".7"/><stop offset="1" stop-color="#ffd27a" stop-opacity="0"/></radialGradient></defs><rect width="900" height="470" fill="#070b18"/>${st}`;
 g+=`<ellipse cx="${cx}" cy="${cy}" rx="230" ry="95" fill="none" stroke="#7d8aa3" stroke-dasharray="5 6"/><circle cx="${cx}" cy="${cy}" r="70" fill="url(#ss-glow)"/><circle cx="${cx}" cy="${cy}" r="34" fill="url(#ss-sun)"/>`+T(cx,cy+56,'Sun',{anchor:'middle',fill:'#ffd27a'});
 for(const mm of [3,6,9,12]){const aa=Math.PI+(mm-6)*Math.PI/6;g+=T(cx+262*Math.cos(aa),cy+122*Math.sin(aa)+4,MON[mm].slice(0,3),{anchor:'middle',size:11,fill:'#9aa6bd'});}
 const tilt=23.4*Math.PI/180,L=36;g+=`<circle cx="${f(ex)}" cy="${f(ey)}" r="22" fill="url(#ss-e)"/>`;
 const sunSide=Math.atan2(cy-ey,cx-ex);g+=`<path d="M${f(ex)} ${f(ey-22)}A22 22 0 0 ${Math.cos(sunSide)>0?0:1} ${f(ex)} ${f(ey+22)}Z" fill="#000" opacity=".5" transform="rotate(${f(sunSide*180/Math.PI-180+90)} ${f(ex)} ${f(ey)})"/>`;
 g+=`<path d="M${f(ex-L*Math.sin(tilt))} ${f(ey+L*Math.cos(tilt))}L${f(ex+L*Math.sin(tilt))} ${f(ey-L*Math.cos(tilt))}" stroke="#fff" stroke-width="2.5"/>`+T(ex+L*Math.sin(tilt)+4,ey-L*Math.cos(tilt)-4,'N',{size:12,weight:700,fill:'#fff'});
 const ix=620,iy=150;g+=`<rect x="${ix}" y="${iy}" width="260" height="270" rx="12" fill="#0e1424" stroke="#2a3550"/>`+T(ix+130,iy+24,'Noon Sun in the UK',{anchor:'middle',fill:'#e8ecf5',weight:700})+`<path d="M${ix+20} ${iy+200}H${ix+240}" stroke="#4fa356" stroke-width="4"/>`;
 const ar=alt*Math.PI/180,R=150;g+=`<path d="M${ix+40} ${iy+200}L${f(ix+40+R*Math.cos(ar))} ${f(iy+200-R*Math.sin(ar))}" stroke="#ffd27a" stroke-dasharray="4 4"/><circle cx="${f(ix+40+R*Math.cos(ar))}" cy="${f(iy+200-R*Math.sin(ar))}" r="12" fill="url(#ss-sun)"/>`+T(ix+70,iy+192,Math.round(alt)+'°',{fill:'#ffd27a',size:12});
 g+=T(ix+20,iy+232,'Day length: '+fmt(day.toFixed(1))+' hours',{fill:'#e8ecf5',size:13})+T(ix+20,iy+254,'Season in the UK: '+season,{fill:'#e8ecf5',size:13,weight:700});
 g+=card('Month',MON[m],636,true);
 return {svg:svg('Earth orbiting the Sun with its axis tilted, and the noon Sun height in the UK',g),caption:`${MON[m]}: the northern half is tilted ${c>0.3?'towards':c<-0.3?'away from':'neither towards nor away from'} the Sun. UK day length about ${day.toFixed(1)} h; it is ${season}.`};};

/* ---------- electromagnet ---------- */
X.electromagnet=(p)=>{const s=p.coils*p.I*(p.core?1:0.12),clips=Math.min(14,Math.floor(s/6)),hot=p.I>=2.5;
 let g=`<defs>${lg('em-n','#d9dee4','#7d858f',1)}${lg('em-cu','#f0a77a','#8a4a26')}${lg('em-b','#3d4654','#1d2733')}</defs>`;
 const c=root.LAB&&root.LAB.C;if(c&&c.stand)g+=c.stand(200,402,60)+c.clamp(200,100,330,26);
 g+=p.core?`<rect x="322" y="110" width="16" height="200" rx="3" fill="url(#em-n)"/><path d="M318 110h24l-12 -14z" fill="#9aa3ad"/>`:`<rect x="322" y="110" width="16" height="200" rx="3" fill="#e8f6ff" opacity=".4" stroke="#9fb4c2"/>`;
 const n=Math.round(p.coils/2.5);for(let i=0;i<n;i++)g+=`<ellipse cx="330" cy="${f(140+i*150/n)}" rx="16" ry="4" fill="none" stroke="url(#em-cu)" stroke-width="3.5"/>`;
 g+=`<path d="M314 140C260 140 240 200 520 230M346 290C420 300 470 300 520 260" stroke="${hot?'#e8412c':'#d0342c'}" stroke-width="3" fill="none"/>`;
 g+=shadow(560,402,60,6)+`<rect x="500" y="200" width="120" height="200" rx="10" fill="url(#em-b)"/>`+T(560,232,'POWER',{anchor:'middle',size:11,fill:'#e8ecf5'})+`<rect x="515" y="245" width="90" height="32" rx="4" fill="#a8dcb0"/>`+T(560,268,fmt(p.I)+' A',{anchor:'middle',size:18,weight:700,fill:'#163a22'});
 for(let i=0;i<clips;i++){const x=322+(i%3)*8,y=316+Math.floor(i/3)*16;g+=`<rect x="${x}" y="${y}" width="7" height="18" rx="3" fill="none" stroke="#9aa3ad" stroke-width="2"/>`;}
 for(let i=0;i<14-clips;i++)g+=`<rect x="${380+(i%7)*14}" y="${392+Math.floor(i/7)*8}" width="12" height="5" rx="2.5" fill="none" stroke="#9aa3ad" stroke-width="1.6"/>`;
 if(hot)g+=T(330,90,'wire getting hot!',{anchor:'middle',size:13,weight:700,fill:'#e8412c'});
 g+=card('Paperclips picked up',String(clips));
 return {svg:room(g,'An electromagnet made from a coil of wire on a stand, connected to a power supply, picking up paperclips'),caption:`${p.coils} coils, ${p.I} A, ${p.core?'iron core':'no core'}: picks up ${clips} paperclip${clips===1?'':'s'}. ${p.core?'':'Adding an iron core makes it much stronger.'}`};};

/* ---------- rock cycle ---------- */
const RC=[null,['Weathering and erosion','Rain, ice and wind break rocks into pieces. Rivers carry them away.'],['Deposition','Rivers drop sediment in layers on the sea bed.'],['Sedimentary rock','Layers are buried and squashed. Minerals cement the grains together.'],['Metamorphic rock','Deep underground, heat and pressure change the rock without melting it.'],['Melting to magma','Even deeper, rock melts to form magma.'],['Igneous rock','Magma cools and becomes solid. Lava from volcanoes cools quickly with small crystals.']];
X.rockcycle=(p)=>{const s=Math.round(p.step),hl=k=>s===k?1:0.35;
 let g=`<defs>${lg('rk-sky','#bfe0f5','#eaf5fb')}${lg('rk-sea','#5aa9e0','#1f5fa0')}${lg('rk-mag','#ff9a2a','#b8301a')}</defs><rect width="900" height="470" fill="url(#rk-sky)"/>`;
 g+=`<path d="M0 200L120 120L200 160L260 90L330 200Z" fill="#8a8f98"/><path d="M220 110l20 -14 18 18" fill="#fff"/>`;
 g+=`<path d="M560 200L680 70L800 200Z" fill="#6a5a4a"/><path d="M670 80Q680 40 700 70" stroke="#e8412c" stroke-width="6" fill="none" opacity="${hl(6)}"/>`;
 g+=`<path d="M330 200Q400 190 460 205H900V230H0V200Z" fill="#7fc06a"/><path d="M300 200Q360 214 440 206" stroke="#3f8fd0" stroke-width="6" fill="none" opacity="${hl(1)}"/>`;
 g+=`<path d="M420 212H560V240H420Z" fill="url(#rk-sea)"/>`;
 const lay=['#e6c98a','#d9b06a','#c99a5a','#b8864a'];lay.forEach((c,i)=>g+=`<path d="M0 ${240+i*22}H900V${262+i*22}H0Z" fill="${c}" opacity="${s===2||s===3?1:.75}"/>`);
 g+=`<path d="M0 328H900V378H0Z" fill="#8a6aa0" opacity="${s===4?1:.6}"/>`+`<path d="M0 378H900V470H0Z" fill="url(#rk-mag)" opacity="${s===5?1:.55}"/>`;
 g+=`<path d="M680 378V200" stroke="url(#rk-mag)" stroke-width="16" opacity="${hl(6)}"/>`;
 const lab=(x,y,t,k)=>T(x,y,t,{size:13,weight:700,fill:s===k?'#1d2733':'#5b6670'});
 g+=lab(130,190,'1 weathering',1)+lab(440,260,'2 deposition',2)+lab(30,300,'3 sedimentary',3)+lab(30,358,'4 metamorphic',4)+lab(30,430,'5 magma',5)+lab(760,120,'6 igneous',6);
 const [t,d]=RC[s];g+=`<rect x="560" y="390" width="320" height="64" rx="10" fill="#fbfaf5" stroke="#c9c4b5"/>`+T(572,414,s+'. '+t,{size:14,weight:700})+(()=>{const w=d.split(' '),ls=[''];for(const x of w){if((ls.at(-1)+' '+x).length>52)ls.push(x);else ls[ls.length-1]=(ls.at(-1)+' '+x).trim();}return ls.slice(0,2).map((l,i)=>T(572,434+i*14,l,{size:11})).join('');})();
 return {svg:svg('Cross-section of land and sea showing stages of the rock cycle',g),caption:`Stage ${s}: ${t}. ${d}`};};

/* ---------- breathing bell jar ---------- */
X.breathing=(p,ph)=>{const w=Math.sin(ph*Math.PI*2*p.rate/60*3),inh=w>0,d=24*w,b=40+14*w;
 let g=`<defs>${lg('br-g','#e8f6ff','#b9d6e6',1)}${rg('br-l','#ffd2d8','#d06a7a')}</defs>`;
 const cx=320;g+=shadow(cx,402,140,7)+`<path d="M${cx-130} 320V140Q${cx-130} 50 ${cx} 50Q${cx+130} 50 ${cx+130} 140V320" fill="url(#br-g)" stroke="#8fb3c4" stroke-width="3" opacity=".9"/>`;
 g+=`<rect x="${cx-10}" y="20" width="20" height="40" fill="#9aa3ad"/><path d="M${cx} 60V120M${cx} 120L${cx-40} 160M${cx} 120L${cx+40} 160" stroke="#9aa3ad" stroke-width="7" fill="none"/>`;
 g+=`<ellipse cx="${cx-46}" cy="${f(200+b*0.3)}" rx="${f(b*0.7)}" ry="${f(b)}" fill="url(#br-l)" stroke="#a84a5a"/><ellipse cx="${cx+46}" cy="${f(200+b*0.3)}" rx="${f(b*0.7)}" ry="${f(b)}" fill="url(#br-l)" stroke="#a84a5a"/>`;
 g+=`<path d="M${cx-130} 320Q${cx} ${f(320+d)} ${cx+130} 320" fill="#d9a07c" opacity=".5" stroke="#8a4a26" stroke-width="5"/><path d="M${cx} ${f(320+d/2)}V${f(360+d/2)}" stroke="#3d4654" stroke-width="4"/><circle cx="${cx}" cy="${f(364+d/2)}" r="9" fill="#3d4654"/>`;
 g+=inh?arrow(cx-40,0,cx-40,40,'#2f6fd0',4):arrow(cx-40,40,cx-40,2,'#d0342c',4);g+=T(cx-30,30,inh?'air flows in':'air flows out',{size:13,weight:700,fill:inh?'#2f6fd0':'#d0342c'});
 g+=T(cx+150,210,'balloons = lungs',{size:13})+T(cx+150,300,'rubber sheet = diaphragm',{size:13})+T(cx+150,110,'bell jar = chest',{size:13});
 g+=card(inh?'Breathing in':'Breathing out',inh?'pressure inside falls':'pressure inside rises');
 return {svg:room(g,'Bell-jar model of the lungs: balloons in a jar with a rubber sheet at the bottom'),caption:inh?'Diaphragm pulled down → volume up → pressure down → air flows in.':'Diaphragm moves up → volume down → pressure up → air flows out.'};};

/* ---------- electricity bill ---------- */
X.bill=(p)=>{const E=p.P*p.h,cost=E*p.price,dev=p.P<0.3?'TV':p.P<1.2?'microwave':'kettle';
 let g=`<defs>${lg('bl-m','#f4f7f9','#9aa3ad',1)}</defs>`;
 const ax=230;g+=shadow(ax,402,90,7);
 if(dev==='kettle')g+=`<path d="M${ax-60} 400L${ax-50} 260H${ax+50}L${ax+60} 400Z" fill="url(#g-kettle)" stroke="#8a8f98"/><path d="M${ax+55} 290Q${ax+100} 300 ${ax+58} 370" stroke="#3d4654" stroke-width="10" fill="none"/><path d="M${ax-50} 270L${ax-90} 250" stroke="#8a8f98" stroke-width="10"/>`;
 else if(dev==='TV')g+=`<rect x="${ax-110}" y="240" width="220" height="130" rx="6" fill="#1d2733"/><rect x="${ax-100}" y="250" width="200" height="110" fill="#2f6fd0" opacity=".7"/><rect x="${ax-20}" y="370" width="40" height="30" fill="#3d4654"/>`;
 else if(dev==='microwave')g+=`<rect x="${ax-110}" y="280" width="220" height="120" rx="8" fill="url(#bl-m)" stroke="#5b6670"/><rect x="${ax-95}" y="295" width="140" height="90" rx="4" fill="#26313a"/><rect x="${ax+60}" y="300" width="36" height="16" fill="#a8dcb0"/>`;
 else g+=`<path d="M${ax-80} 300Q${ax-80} 260 ${ax-30} 260H${ax+40}Q${ax+80} 260 ${ax+80} 300Q${ax+80} 340 ${ax+40} 340H${ax-30}Q${ax-80} 340 ${ax-80} 300Z" fill="#d0342c"/><path d="M${ax-10} 340V400" stroke="#d0342c" stroke-width="22" stroke-linecap="round"/>`;
 g+=T(ax,430,dev+' · '+fmt(p.P)+' kW',{anchor:'middle',size:13,weight:700,fill:'#e8ecf5'});
 const mx=520,my=170;g+=`<rect x="${mx}" y="${my}" width="230" height="160" rx="10" fill="#e8ecf0" stroke="#5b6670" stroke-width="2"/><rect x="${mx+20}" y="${my+40}" width="190" height="44" rx="4" fill="#1d2733"/>`+T(mx+115,my+72,E.toFixed(2).padStart(7,'0')+' kWh',{anchor:'middle',size:22,weight:700,fill:'#a8dcb0'})+T(mx+115,my+28,'ELECTRICITY METER',{anchor:'middle',size:11,fill:'#5b6670'})+T(mx+20,my+120,fmt(p.P)+' kW × '+fmt(p.h)+' h = '+fmt(E)+' kWh',{size:14})+T(mx+20,my+144,fmt(E)+' kWh × '+p.price+'p = '+fmt(cost)+'p',{size:14});
 g+=card('Cost of this use',cost>=100?'£'+(cost/100).toFixed(2):fmt(cost)+'p');
 return {svg:room(g,'An appliance and an electricity meter showing the energy used'),caption:`Energy = ${fmt(p.P)} kW × ${fmt(p.h)} h = ${fmt(E)} kWh. Cost = ${fmt(E)} × ${p.price}p = ${fmt(cost)}p.`};};

root.KSModelsExtra=X;
})(typeof window==='undefined'?globalThis:window);
