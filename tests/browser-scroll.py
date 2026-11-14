"""Checks mouse drag, native touch scrolling, hidden scrollbars and viewer flow."""
from playwright.sync_api import sync_playwright

URL='http://127.0.0.1:4322'
def drag(page, element, dx=0, dy=-160):
 box=element.bounding_box()
 x=box['x']+box['width']*.7
 y=box['y']+min(box['height']*.4,100)
 page.mouse.move(x,y);page.mouse.down();page.mouse.move(x+dx,y+dy,steps=20);page.mouse.up()
 page.wait_for_timeout(300)

def swipe(page, element, dx=0, dy=-180):
 box=element.bounding_box();x=box['x']+box['width']*.75;y=box['y']+min(box['height']*.5,240)
 session=page.context.new_cdp_session(page)
 session.send('Input.dispatchTouchEvent',{'type':'touchStart','touchPoints':[{'x':x,'y':y}]})
 for i in range(1,16):
  session.send('Input.dispatchTouchEvent',{'type':'touchMove','touchPoints':[{'x':x+dx*i/15,'y':y+dy*i/15}]})
 session.send('Input.dispatchTouchEvent',{'type':'touchEnd','touchPoints':[]})
 page.wait_for_timeout(400);session.detach()

with sync_playwright() as p:
 browser=p.chromium.launch()
 page=browser.new_page(viewport={'width':1440,'height':760})
 errors=[];page.on('pageerror',lambda error:errors.append(str(error)))
 page.goto(URL,wait_until='networkidle')
 main=page.get_by_role('main');rail=page.locator('.featured-rail')
 assert page.locator('.phone-status,.dynamic-island').count()==0
 assert main.evaluate('(e)=>getComputedStyle(e).scrollbarWidth')=='none'
 assert rail.evaluate('(e)=>getComputedStyle(e,"::-webkit-scrollbar").display')=='none'
 drag(page,rail,dx=-180,dy=0)
 assert rail.evaluate('(e)=>e.scrollLeft')>30
 assert page.get_by_role('heading',name='Home',exact=True).is_visible(), 'Drag opened a card'
 # A vertical drag starting on a clickable card scrolls its parent without opening it.
 rail.evaluate('(e)=>{e.scrollLeft=0}')
 drag(page,rail,dx=0,dy=-180)
 assert main.evaluate('(e)=>e.scrollTop')>50
 assert page.locator('.detail-toolbar').count()==0
 # Reset to the header and verify ordinary clicks still activate cards.
 main.evaluate('(e)=>{e.scrollTop=0}')
 page.locator('.featured-rail .project-card').first.click()
 page.get_by_role('button',name='View project',exact=True).click()
 dialog=page.get_by_role('dialog');layout=dialog.locator('.viewer-layout')
 assert dialog.get_by_role('heading',name='Creative Notes',exact=True).count()==1
 assert dialog.get_by_role('button',name='Notes',exact=True).count()==0
 header=dialog.locator('.viewer-header').bounding_box()
 stage=dialog.locator('.viewer-stage').bounding_box()
 footer=dialog.locator('.viewer-footer').bounding_box()
 assert header['y']+header['height']<=stage['y']+1
 assert stage['y']+stage['height']<=footer['y']+1
 page.screenshot(path='/private/tmp/creativico-notes-fixed.png')
 assert layout.evaluate('(e)=>getComputedStyle(e).scrollbarWidth')=='none'
 assert layout.evaluate('(e)=>e.scrollHeight>e.clientHeight')
 drag(page,dialog.locator('.external-preview > img'),dy=-180)
 assert layout.evaluate('(e)=>e.scrollTop')>20, 'Viewer mouse drag failed'
 dialog.get_by_role('button',name='Next media').click()
 page.wait_for_function('document.querySelector(".viewer-layout").scrollTop === 0')
 assert dialog.get_by_role('heading',name='Creative Notes',exact=True).count()==1
 page.keyboard.press('Escape')
 print('Mouse: horizontal/vertical drag, click suppression, normal clicks, permanent notes, viewer flow and scrolling passed')
 touch=browser.new_page(viewport={'width':390,'height':700},has_touch=True,is_mobile=True)
 touch.goto(URL,wait_until='networkidle')
 rail=touch.locator('.featured-rail')
 swipe(touch,rail,dx=-160,dy=0)
 assert rail.evaluate('(e)=>e.scrollLeft')>20
 swipe(touch,touch.get_by_role('main'),dy=-220)
 assert touch.get_by_role('main').evaluate('(e)=>e.scrollTop')>40
 assert touch.get_by_role('heading',name='Home',exact=True).count()==1
 assert not errors,errors
 print('Touch: native horizontal and vertical swipes passed')
 page.screenshot(path='/private/tmp/creativico-scroll-verified.png')
 browser.close()
