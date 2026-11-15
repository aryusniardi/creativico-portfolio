from playwright.sync_api import sync_playwright
import argparse
import json
parser = argparse.ArgumentParser()
parser.add_argument("--url", default="http://localhost:4321")
args = parser.parse_args()
with sync_playwright() as p:
 browser=p.chromium.launch()
 page=browser.new_page()
 errors=[]
 page.on('pageerror',lambda error:errors.append(str(error)))
 for width,height in [(390,844),(768,1024),(1440,1000)]:
  page.set_viewport_size({'width':width,'height':height})
  page.goto(args.url,wait_until='networkidle')
  assert page.title().endswith(' | Creative Portfolio') and 'ON REPEAT' not in page.title()
  schema=json.loads(page.locator('script[type="application/ld+json"]').text_content())
  assert schema['@type']=='ProfilePage' and schema['mainEntity']['@type']=='Person'
  art=page.locator('.cover-art').first
  box=art.bounding_box()
  assert abs(box['width']-box['height'])<1
  assert art.evaluate('(img)=>getComputedStyle(img).objectPosition')=='50% 50%'
  page.get_by_role('heading',name='Portfolio',exact=True).wait_for()
  nav=page.get_by_role('navigation',name='Main navigation')
  assert page.evaluate('document.documentElement.scrollWidth <= innerWidth')
  frame=page.locator('.music-app').bounding_box()
  assert frame['width'] <= 430
  if width >= 768:
   assert frame['width']==414
   assert abs(frame['x']+frame['width']/2-width/2)<1
  assert page.locator('.music-app').get_attribute('data-theme')=='dark'
  assert page.locator('.phone-status,.dynamic-island').count()==0
  glass=page.locator('.tab-bar .lg-track__glass')
  assert glass.count()>=1
  assert glass.first.evaluate('(element) => getComputedStyle(element).backdropFilter')!='none'

  assert page.locator('.animate-pulse,.animate-ping').count()==0
  page.screenshot(path=f'/private/tmp/creativico-home-{width}.png')
  for tab,title in [('Talents','Talent Roster'),('Campaigns','Creative Library'),('About','About & Profile')]:
   nav.get_by_role('tab',name=tab,exact=True).click()
   page.get_by_role('heading',name=title,exact=True).wait_for()
   assert page.evaluate('document.documentElement.scrollWidth <= innerWidth')
   page.screenshot(path=f'/private/tmp/creativico-{tab.lower()}-{width}.png')
  assert page.get_by_text('Storytelling',exact=True).count()==1
  nav.get_by_role('tab',name='Talents',exact=True).click()
  assert page.locator('.talent-row').count()==8
  page.get_by_role('button',name='Theo Supple').click()
  page.get_by_role('heading',name='Theo Supple',exact=True).wait_for()
  page.screenshot(path=f'/private/tmp/creativico-talent-{width}.png')
  page.locator('.project-row').click()
  page.get_by_role('heading',name='KITE Talent Reveal Project',exact=True).wait_for()
  album=page.locator('.album-art')
  album_box=album.bounding_box()
  assert abs(album_box['width']-album_box['height'])<1
  assert album.evaluate('(img)=>getComputedStyle(img).objectFit')=='cover'
  page.screenshot(path=f'/private/tmp/creativico-project-{width}.png')
  page.get_by_role('button',name='Back',exact=True).click()
  page.get_by_role('heading',name='Theo Supple',exact=True).wait_for()
  page.get_by_role('button',name='Back',exact=True).click()
  page.get_by_role('heading',name='Talent Roster',exact=True).wait_for()
  nav.get_by_role('tab',name='Home',exact=True).click()
  page.locator('.featured-rail .project-card').first.click()
  page.get_by_role('heading',name='HITAM : Official Music Video',exact=True).wait_for()
  page.get_by_role('button',name='View project',exact=True).click()
  dialog=page.get_by_role('dialog')
  assert dialog.is_visible()
  bounds=dialog.bounding_box()
  assert abs(bounds['x']-(frame['x']+4 if width >= 768 else frame['x']))<2
  assert bounds['width']<=frame['width']
  assert bounds['height']<=frame['height']

  embedded=dialog.locator('iframe[title$="— YouTube video"]')
  assert '/embed/0ERR5BCTcYo?' in embedded.get_attribute('src')
  assert 'autoplay=1' in embedded.get_attribute('src')
  assert dialog.get_by_role('link',name='Open original on YouTube').get_attribute('href')=='https://youtu.be/0ERR5BCTcYo'
  assert dialog.get_by_role('button',name='Previous media').is_disabled()
  dialog.get_by_role('button',name='Next media').click()
  dialog.locator('.viewer-stage > img').wait_for(state='visible')
  assert dialog.locator('.media-position').inner_text()=='2 of 5'
  page.screenshot(path=f'/private/tmp/creativico-image-{width}.png')
  assert dialog.get_by_role('heading',name='Creative Notes',exact=True).is_visible()
  page.keyboard.press('Escape')
  assert not page.get_by_role('dialog').count()
  assert page.locator('.mini-player').is_visible()
  nav.get_by_role('tab',name='Campaigns',exact=True).click()
  page.get_by_role('searchbox').fill('Blok M Night')
  assert page.locator('.media-row').count()==1
  page.get_by_role('searchbox').fill('does not exist')
  assert page.get_by_role('heading',name='No matching projects').is_visible()
  page.get_by_role('button',name='Reset filters').click()
  assert page.locator('.project-card').count()==3
  print(f'{width}: all screens, nested back, original release, image queue, notes, Escape, mini player, search, empty/reset passed')
 page.goto(args.url,wait_until='networkidle')
 if page.locator('.cover-art').first.get_attribute('src').startswith('/_image?'):
  page.route('**/_image?**',lambda route:route.fulfill(status=500,body='Forced transform failure'))
  page.reload(wait_until='networkidle')
  page.wait_for_function('document.querySelector(".cover-art").naturalWidth > 0')
  assert page.locator('.cover-art').first.get_attribute('src').startswith('/_emdash/api/media/file/')
  print('WebP transform failure before hydration: original-image fallback passed')
 assert not errors,errors
 browser.close()
