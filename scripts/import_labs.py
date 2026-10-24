"""Refresh selected owned GCSE lab source into lazy factories; source sites are unchanged."""
from pathlib import Path
import re,json,subprocess,hashlib
from labs import LABS
ROOT=Path(__file__).resolve().parents[1];REVIEWS=ROOT.parent
combined=REVIEWS/'GCSECombinedScience'
blocks={};prefixes=[];origins={}
for name in ['practical-labs.js','biology-labs.js']:
 text=(combined/name).read_text(encoding='utf-8');chunks=re.split(r'(?m)^(?=\(\(\)=>\{)',text)
 prefixes.append(chunks[0])
 for chunk in chunks[1:]:
  ids=re.findall(r'register\(\{id:"([^"]+)"',chunk)
  assert len(ids)==1,(name,ids)
  blocks[ids[0]]=chunk;origins[ids[0]]=dict(repo='GCSECombinedScience',file=name)
physics=(REVIEWS/'GCSEPhysics'/'index.html').read_text(encoding='utf-8')
for code in re.findall(r'<script[^>]*>([\s\S]*?)</script>',physics):
 for id in ['lt','insulation']:
  if re.search(r'register\(\{id:"'+id+'"',code):blocks[id]=code;origins[id]=dict(repo='GCSEPhysics',file='index.html')
clock="""/* The extracted chemistry apparatus only needs the visible-lab animation clock. */
window.CH={loop(id,step){let last=null;function tick(now){const sec=document.getElementById('lab-'+id);if(sec&&!sec.hidden&&!document.hidden){if(last!==null)step(Math.min(.05,(now-last)/1000));last=now;}else last=null;requestAnimationFrame(tick);}requestAnimationFrame(tick);}};
"""
out=['/* Adapted from existing Prodigy GCSE labs. Factory bodies run only when their lab is opened. */',*prefixes,clock,'window.KS3LabFactories={'];provenance=[]
for lab in LABS:
 code=blocks[lab['id']]
 original=code
 code=code.replace('"pl-shc-runs"','"learn-ks3-science-shc-runs"').replace('"pl-ins-runs"','"learn-ks3-science-insulation-runs"')
 if lab['id']=='insulation':
  static=re.search(r'<section\b[^>]*id="lab-insulation"[\s\S]*?</section>',physics)
  assert static,'Static insulation apparatus not found'
  code='LAB.prepareStatic("insulation",'+json.dumps(static[0],ensure_ascii=False)+');\n'+code
 out.append(json.dumps(lab['id'])+':function(LAB){\n'+code+'\n},')
 origin=origins[lab['id']];ref=subprocess.run(['git','rev-parse','HEAD'],cwd=REVIEWS/origin['repo'],capture_output=True,text=True,check=True).stdout.strip()
 provenance.append(dict(id=lab['id'],title=lab['title'],source=origin,ref=ref,sha256=hashlib.sha256(original.encode()).hexdigest(),adaptation='KS3 instructions, topic links, course-scoped saved readings and review questions; original apparatus model retained. GCSE calculation detail is optional.'))
out.append('};\nwindow.KS3_LABS='+json.dumps(LABS,ensure_ascii=False)+';\n')
(ROOT/'gcse-lab-factories.js').write_text('\n'.join(out),encoding='utf-8')
(ROOT/'lab-provenance.json').write_text(json.dumps(provenance,indent=2),encoding='utf-8')
assert (ROOT/'lab-notebook.js').exists(), 'Keep the adapted KS3 notebook alongside the apparatus.'
print('Prepared',len(LABS),'GCSE lab factories; nothing executes until the lab is opened.')
