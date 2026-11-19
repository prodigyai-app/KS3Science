/* Build one self-contained HTML file for each of the named KS3 models (default: the heat transfer models),
   so they open offline, from a USB stick or inside an iframe on a slide.
   Usage (from the repo root): node scripts/export_models.cjs [outDir] [id,id,...]
   Default outDir: ../GCSEPhysics/diagram-library/animations/ks3 */
'use strict';
const fs=require('fs'),path=require('path');
const ROOT=path.join(__dirname,'..');
const OUT=path.resolve(process.argv[2]||path.join(ROOT,'..','GCSEPhysics','diagram-library','animations','ks3'));
const IDS=(process.argv[3]||'conduction,convection,radiation').split(',');
const html=fs.readFileSync(path.join(ROOT,'index.html'),'utf8');
const styles=[...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)].map(m=>m[1]).join('\n');
/* model layout rules live in course.js (injected at run time) and lesson-decks.css */
const courseCss=(fs.readFileSync(path.join(ROOT,'course.js'),'utf8').match(/style\.textContent='([^']*)'/)||[])[1]||'';
const deckCss=fs.readFileSync(path.join(ROOT,'lesson-decks.css'),'utf8').split('\n').filter(l=>/ks-model|ks-controls|ks-caption/.test(l)&&!/ks-slide/.test(l)).join('\n');
const lab=[...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m=>m[1]).find(c=>c.includes('window.LAB=(()=>{'));
if(!lab)throw new Error('LAB engine not found in index.html');
const js=f=>fs.readFileSync(path.join(ROOT,f),'utf8').replace(/<\/script/gi,'<\\/script');
global.window=global;require(path.join(ROOT,'models.js'));require(path.join(ROOT,'models-extra.js'));require(path.join(ROOT,'models-heat.js'));
const defs=global.KSModels.defs;
const slug=s=>s.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
fs.mkdirSync(OUT,{recursive:true});
const list=[];
for(const id of IDS){const d=defs[id];if(!d)throw new Error('No model '+id);
 const file=`ks3-${slug(d.title)}.html`;
 const page=`<!doctype html><html lang="en" data-theme="light"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${d.title}</title>
<style>${styles}
${courseCss}
${deckCss}
body{margin:0}.ks-standalone{max-width:1180px;margin:0 auto;padding:16px}.ks-standalone h1{font-size:1.5rem;margin:4px 0 12px}</style></head>
<body><main class="ks-standalone"><h1>${d.title}</h1><section class="lcard"><div id="host"></div></section><p class="muted" style="font-size:.85rem">From the Prodigy KS3 Science site (Year 9 · Heating and cooling). Works offline.</p></main>
<script>${lab.replace(/<\/script/gi,'<\\/script')}</script>
<script>${js('models.js')}</script>
<script>${js('models-heat.js')}</script>
<script>document.getElementById('host').innerHTML=KSModels.html(${JSON.stringify(id)});KSModels.mount();</script>
</body></html>
`;
 fs.writeFileSync(path.join(OUT,file),page);list.push({id,title:d.title,file});}
console.log(list.map(x=>x.file).join('\n'));
