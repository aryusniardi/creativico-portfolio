"""Direct-video fixture without changing portfolio data or the CMS database.
Run after build, with dist served at http://127.0.0.1:4323.
Requires /private/tmp/creativico-test-video.mp4 (a short H.264 test clip).
"""
from html.parser import HTMLParser
from html import escape
from pathlib import Path
import json
import re
from playwright.sync_api import sync_playwright

class IslandParser(HTMLParser):
 def handle_starttag(self,tag,attrs):
  if tag=='astro-island': self.props=json.loads(dict(attrs)['props'])

source=Path('dist/index.html').read_text()
parser=IslandParser();parser.feed(source)
media=parser.props['content'][1]['works'][1]
work=next(item[1] for item in media if item[1]['id'][1]=='work-max-still')
work['kind']=[0,'video'];work['videoUrl']=[0,'/__test-video.mp4']
source=re.sub(r'props="[^"]*"',lambda match:'props="'+escape(json.dumps(parser.props),quote=True)+'"',source,count=1)
with sync_playwright() as p:
 browser=p.chromium.launch()
 page=browser.new_page(viewport={'width':390,'height':844})
 errors=[];page.on('pageerror',lambda error:errors.append(str(error)))
 page.route('http://127.0.0.1:4323/',lambda route:route.fulfill(status=200,content_type='text/html',body=source))
 def video_response(route):
  data=Path('/private/tmp/creativico-test-video.mp4').read_bytes()
  requested=route.request.headers.get('range','bytes=0-').replace('bytes=','').split('-')
  start=int(requested[0] or 0);end=int(requested[1]) if requested[1] else len(data)-1
  route.fulfill(status=206,content_type='video/mp4',headers={'Accept-Ranges':'bytes','Content-Range':f'bytes {start}-{end}/{len(data)}'},body=data[start:end+1])
 page.route('**/__test-video.mp4',video_response)
 page.goto('http://127.0.0.1:4323/',wait_until='networkidle')
 page.get_by_role('navigation').get_by_role('tab',name='Campaigns',exact=True).click()
 page.get_by_role('button',name='KITE Talent Reveal Project').click()
 opener=page.get_by_role('main').get_by_role('button',name='Max Huang — Portfolio Still')
 opener.click()
 dialog=page.get_by_role('dialog');video=dialog.locator('video')
 video.wait_for();page.wait_for_function('document.querySelector("video").currentTime > 0')
 dialog.get_by_role('button',name='Pause',exact=True).click()
 assert video.evaluate('(video) => video.paused')
 slider=dialog.get_by_role('slider',name='Playback position')
 slider.fill('3')
 page.wait_for_function('document.querySelector("video").currentTime >= 2.9')
 dialog.get_by_role('button',name='Play',exact=True).click()
 dialog.get_by_role('button',name='Close media viewer').click()
 assert not page.get_by_role('dialog').count()
 assert opener.evaluate('(element) => element === document.activeElement')
 mini=page.get_by_role('complementary',name='Current media')
 mini.get_by_role('button',name='Pause',exact=True).click()
 assert page.locator('video').evaluate('(video) => video.paused')
 mini.get_by_role('button',name='Open Max Huang — Portfolio Still').click()
 assert page.get_by_role('dialog').get_by_role('slider',name='Playback position').input_value() != '0'
 page.get_by_role('dialog').get_by_role('button',name='Previous media').click()
 page.get_by_role('dialog').locator('.viewer-stage > img').wait_for(state='visible')
 assert not page.locator('video').count()
 page.get_by_role('dialog').get_by_role('button',name='Next media').click()
 page.route('**/harry-still.webp',lambda route:route.abort())
 page.get_by_role('dialog').get_by_role('button',name='Previous media').click()
 page.get_by_role('dialog').get_by_text('This media could not be loaded.').wait_for()
 assert page.get_by_role('dialog').locator('.viewer-stage img').count()==0
 page.keyboard.press('Escape')
 assert not page.get_by_role('dialog').count()
 assert not errors,errors
 print('Direct video: play/pause, seek, persistent mini controls, focus restoration, image transition and unavailable-media fallback passed')
 browser.close()
