"""Rebuild public course data using only original, checked source files in this repository."""
from pathlib import Path
import json,copy,re,hashlib
from content import K,UNITS
from papers import P
from revision import R
from labs import LABS
ROOT=Path(__file__).resolve().parents[1]
subject='Maths' if ROOT.name=='KS3Maths' else 'Science'
site='ks3-'+subject.lower()
units=[];lessons=[];numbers={7:0,8:0,9:0}
for year,title,keys in UNITS:
 numbers[year]+=1;uid=f'y{year}-unit-{numbers[year]:02}'
 units.append(dict(id=uid,year=year,number=numbers[year],title=title,skills=keys.split()))
 for n,key in enumerate(keys.split(),1):
  l=copy.deepcopy(K[key]);l.update(id=uid+'-'+key,unit=uid,year=year,number=n)
  l['marks']=len(l['scheme'])
  revision=copy.deepcopy(R[key]);shift=int(hashlib.sha256(l['id'].encode()).hexdigest()[:8],16)%3
  quiz=revision['quiz'];quiz['opts']=quiz['opts'][shift:]+quiz['opts'][:shift];quiz['a']=(-shift)%3
  l['cards']=revision['cards'];l['quiz']=quiz
  l['misconception']=dict(q='In this lesson on '+l['title'].lower()+', Sam says: “'+R[key]['quiz']['opts'][1]+'” Explain the mistake.',m=2,ms=[R[key]['quiz']['opts'][0],R[key]['quiz']['why']])
  lessons.append(l)
papers=[]
for (year,letter),questions in P.items():
 paper=dict(id=f'y{year}-paper-{letter.lower()}',year=year,paper=letter,title=f'Year {year} · Practice paper {letter}',minutes=35,marks=sum(q['m'] for q in questions),coverage=[u['title'] for u in units if u['year']==year],questions=[dict(title=q['title'],stem='',parts=[q]) for q in questions])
 papers.append(paper)
sources=[dict(title='Department 2026–27 teaching sequence',kind='curriculum',detail='Adapted from the lesson folders and planning workbooks supplied by the department. Revision pages consolidate related teaching periods; original slides, staff allocations and school tests are not reproduced.'),dict(title='National curriculum: '+subject.lower(),url='https://www.gov.uk/government/publications/national-curriculum-in-england-'+('mathematics' if subject=='Maths' else 'science')+'-programmes-of-study')]
if subject=='Science':sources += [dict(title='NHS: young people and vaping',url='https://www.nhs.uk/better-health/quit-smoking/help-others-quit/young-people-and-vaping/'),dict(title='Met Office: causes of climate change',url='https://weather.metoffice.gov.uk/climate-change/causes-of-climate-change')]
assert set(K)==set(R), 'Each scientific concept needs retrieval cards and a checked question.'
course=dict(title='KS3 '+subject,site=site,reviewed='2026-10-24',units=units,lessons=lessons,sources=sources)
(ROOT/'course.json').write_text(json.dumps(course,ensure_ascii=False,indent=2),encoding='utf-8')
(ROOT/'paper-bank.json').write_text(json.dumps(papers,ensure_ascii=False,indent=2),encoding='utf-8')
(ROOT/'course-data.js').write_text('window.KS_COURSE='+json.dumps(course,ensure_ascii=False)+';\nwindow.KS_PAPERS='+json.dumps(papers,ensure_ascii=False)+';\n',encoding='utf-8')
(ROOT/'coverage.json').write_text(json.dumps(dict(course=course['title'],reviewed=course['reviewed'],learning=dict(format='Swipeable short slides, definition cards, then practice',lessons=len(lessons),questions_per_lesson=4,unit_checks=len(units),definition_cards=sum(len(l['cards']) for l in lessons),unique_terms=len({c['term'] for l in lessons for c in l['cards']})),labs=[dict(title=lab['title'],subject=lab['subject'],extension=lab['extension']) for lab in LABS],years=[dict(year=y,units=[dict(title=u['title'],lessons=[l['title'] for l in lessons if l['unit']==u['id']]) for u in units if u['year']==y]) for y in [7,8,9]],note='Revision lessons consolidate related teaching periods from the supplied sequence. Selected GCSE apparatus includes KS3 instructions; harder calculations are optional extensions.'),ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps(dict(site=site,units=len(units),lessons=len(lessons),papers=len(papers),marks=[p['marks'] for p in papers])))
