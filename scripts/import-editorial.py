"""Import cached public THREE pages and sanitize their article markup. See docs/CONTENT.md."""
from pathlib import Path
from html import escape
from urllib.parse import urljoin,urlsplit,unquote,quote,urlunsplit
import json,re,unicodedata
from source_html import Document, Element
assets={}; origin='https://www.threeinternational.com'
def slugify(s):
 return re.sub(r'[^a-z0-9]+','-',unicodedata.normalize('NFKD',s).encode('ascii','ignore').decode().lower()).strip('-')
def asset(url,name):
 assets['/images/editorial/'+name]=urljoin(origin,url); return '/images/editorial/'+name
posts=json.loads(Path('/tmp/three-post-list.json').read_text())
post_map={unquote(urlsplit(p['url']).path).rsplit('/',1)[-1]:slugify(unquote(urlsplit(p['url']).path).rsplit('/',1)[-1]) for p in posts}
products=json.loads(Path('src/lib/catalog.json').read_text()); product_map={p['id']:p['slug'] for p in products}
page_map={'aboutus':'our-story','thescience':'science','donate':'love-three','our-team':'our-team','scientific-advisory-board':'scientific-advisory-board','three-farm':'three-farm','opportunity':'opportunity','shopping':'shop'}
def link(url,label=""):
 u=urlsplit(urljoin(origin,url)); path=unquote(u.path); base=path.strip('/').split('/')[-1]
 if 'blog.threeinternational.com'==u.netloc:
  return '/journal/'+post_map[base] if base in post_map else '/journal'
 if u.netloc in ['www.threeinternational.com','threeinternational.com','iii.earth','www.iii.earth']:
  if base in post_map:return '/journal/'+post_map[base]
  if '/shopproducts' in path.lower():return '/shop'
  if path.rstrip('/')=='/en/explore':return '/opportunity'
  if base.lower() in page_map:return '/'+page_map[base.lower()]
  m=re.search(r'/productdetail/\d+/(\d+)',path,re.I)
  if m and m[1] in product_map:return '/products/'+product_map[m[1]]
  if m and m[1]=='3198':return '/products/kynetik'
  if m and m[1]=='3094':
   target='visage-collection'
   for term,slug in [('cleanse','pure-cleanse'),('toner','radiant-toner'),('serum','visage-super-serum')]:
    if term in label.lower():target=slug
   return '/products/'+target
  if path.rstrip('/') in ['/en','']: return '/'
 return urljoin(origin,url) if u.scheme in ['http','https','mailto','tel'] else ''
allowed={'p','h2','h3','h4','h5','h6','ul','ol','li','strong','b','em','i','blockquote','br','sup','sub','a','table','thead','tbody','tr','th','td','figure','figcaption','img','hr'}
def render(e):
 if isinstance(e,str):return escape(e.replace('—',', '))
 if e.tag in ['script','style','form','input','button','iframe']:return ''
 inner=''.join(render(c) for c in e.children)
 if e.tag not in allowed:return inner
 if e.tag=='img':
  url=e.attrs.get('src','');
  if not url:return ''
  image_count[0] += 1
  if image_count[0] == 1 and Path(unquote(urlsplit(url).path)).name == Path(unquote(urlsplit(lead_image[0]).path)).name:return ''
  src=asset(url,'article-'+current_slug[0]+'-'+str(image_count[0])+'.webp')
  return '<img src="'+src+'" alt="'+escape(e.attrs.get('alt',''),quote=True)+'" loading="lazy" />'
 attrs=''
 if e.tag=='a':
  href=link(e.attrs.get('href',''),e.text())
  if not href:return inner
  attrs=' href="'+escape(href,quote=True)+'"'
 return '<'+e.tag+attrs+'>'+inner+('</'+e.tag+'>' if e.tag not in ['br','hr','img'] else '')
journal=[]
image_count=[0]; current_slug=['']; lead_image=['']
for p in posts:
 base=unquote(urlsplit(p['url']).path).rsplit('/',1)[-1]; slug=post_map[base]
 image_count[0]=0; current_slug[0]=slug; lead_image[0]=p['image']
 d=Document(Path('/tmp/three-journal-source',base+'.html').read_text())
 bodies=d.root.find(lambda e:'blog-post__body' in e.attrs.get('class','').split()); assert bodies,slug
 desc=d.root.find(lambda e:e.tag=='meta' and e.attrs.get('name')=='description')
 dates=d.root.find(lambda e:e.tag=='time'); authors=d.root.find(lambda e:'blog-post__author' in e.attrs.get('class','').split())
 tags=d.root.find(lambda e:'blog-post__tag-link' in e.attrs.get('class','').split())
 title=p['title'].replace('—',', ')
 if any(x in title.lower() for x in ['visage','skin','beauty','collag','cleanse','serum','toner']):category='Skin & Beauty'
 elif any(x in title.lower() for x in ['dr.','doctor','science','scientific','clinical','study','bioavail','absorp','testing','phytonutr','formula']):category='The Science'
 elif any(x in title.lower() for x in ['business','work with','ambassador','three ceo','gratitude','team','event','convention']):category='Our Community'
 else:category='Everyday Wellness'
 image=asset(p['image'], 'journal-'+slug+'.webp')
 journal.append({'slug':slug,'title':title,'description':desc[0].attrs['content'] if desc else bodies[0].text()[:180], 'image':image,'date':dates[0].attrs.get('datetime','')[:10] if dates else '', 'author':authors[0].text().replace('By ','').split(' · ')[0].strip() if authors else 'THREE International','category':category,'readTime':max(1,round(len(bodies[0].text().split())/220)),'html':render(bodies[0]),'sourceUrl':p['url']})
Path('src/lib/journal.json').write_text(json.dumps(journal,ensure_ascii=False,indent=2))
team_urls=['2024/11/Picou-2024.jpg','2024/11/Gubler-2024.jpg','2024/11/Mohr-2024.jpg','2024/11/Larson-2024.jpg','2024/11/Janke-2024.jpg','2025/09/Keith-2025.jpg','2025/09/Tommy-2025.jpg']
board_urls=['/Assets/images/board/lg2/'+x+'.jpg' for x in ['drgubler','drbaker','drbordon','drgalicia','drgreene-new','drputri-new','drsabo','dryoshimura']]+['https://threemedia.earth/wp-content/uploads/2025/08/Dierdre-Leake.jpg']
people={}
for name,urls in [('team',['https://threemedia.earth/wp-content/uploads/'+u for u in team_urls]),('board',board_urls)]:
 d=Document(Path('/tmp/three-'+name+'.html').read_text()); result=[]
 def walk(e):
  headings=[c for c in e.children if isinstance(c,Element) and c.tag=='h2']; roles=[c for c in e.children if isinstance(c,Element) and c.tag=='h6']
  if headings and roles:
   heading=headings[0].text(); divs=[c for c in e.children if isinstance(c,Element) and c.tag=='div']
   pars=divs[0].find(lambda e:e.tag=='p') if divs else []
   bio=[p.text().replace('—',', ').replace('proventrack','proven track') for p in pars if p.text()]
   if not bio:bio=[divs[0].text().replace('—',', ')]
   result.append({'name':heading,'role':roles[0].text(),'slug':slugify(heading),'bio':bio,'image':asset(urls[len(result)],name+'-'+slugify(heading)+'.webp')})
  for c in e.children:
   if isinstance(c,Element):walk(c)
 walk(d.root); people[name]=result
Path('src/lib/people.json').write_text(json.dumps(people,ensure_ascii=False,indent=2))
for name,url in {
 'love-hands':'https://threemedia.earth/wp-content/uploads/2025/07/hands-heart.jpg',
 'love-vision':'https://threemedia.earth/wp-content/uploads/2025/07/crw_365h_365.jpg',
 'love-values':'https://threemedia.earth/wp-content/uploads/2025/07/crw_365h_3651.jpg',
 'love-team':'https://threemedia.earth/wp-content/uploads/2025/07/crw_365h_3652.jpg',
 'love-mission':'https://threemedia.earth/wp-content/uploads/2025/07/rsw_600h_451cg_true.jpg',
 'love-giving':'https://threemedia.earth/wp-content/uploads/2025/07/rsw_600h_451cg_true1.jpg',
 'love-community':'https://threemedia.earth/wp-content/uploads/2025/07/rsw_600h_451cg_true2.jpg',
 'farm-hero':'/Assets/images/science/three-farm-header.jpg',
 'farm-research':'/Assets/images/science/three-farm-what-we-use-for.webp',
 'farm-thailand':'/Assets/images/science/three-farm-why-thailand.webp',
 'farm-benefits':'/Assets/images/science/three-farm-benefits.webp',
 'opportunity-hero':'/Assets/images/opportunity/opportunity-header2.jpg',
 'opportunity-community':'/Assets/images/opportunity/banner-opportunity-bottom.jpg',
 'story-purpose':'/Assets/images/about/about1.webp',
 'story-people':'/Assets/images/about/about3.webp',
}.items():asset(url,name+'.webp')
Path('/tmp/three-editorial-assets.json').write_text(json.dumps(assets,indent=2))
Path('docs/source-assets.json').write_text(json.dumps(assets,indent=2))
print('Imported',len(journal),'articles and', {k:len(v) for k,v in people.items()},'people. Assets:',len(assets))
