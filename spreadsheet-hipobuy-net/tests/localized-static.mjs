const { chromium } = await import(process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES ? `${process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES}/playwright/index.mjs` : 'playwright');
import assert from 'node:assert/strict';
const browser=await chromium.launch({headless:true,...(process.env.CHROME_EXECUTABLE?{executablePath:process.env.CHROME_EXECUTABLE,args:['--no-sandbox','--disable-dev-shm-usage']}: {})});
const page=await browser.newPage({viewport:{width:1440,height:1000}});
const errors=[];page.on('pageerror',e=>errors.push(e.message));
await page.route('https://www.googletagmanager.com/**',r=>r.fulfill({status:200,body:''}));
await page.goto('http://127.0.0.1:8765/');
assert.equal(await page.locator('.product-card:visible').count(),4);
await page.locator('[data-filter="Shoes"]').click();assert.equal(await page.locator('.product-card:visible').count(),2);
await page.locator('[data-filter="Hoodies"]').click();assert.equal(await page.locator('.product-card:visible').count(),1);
await page.locator('[data-filter="All"]').click();
await page.evaluate(()=>window.scrollTo(0,0));
await page.screenshot({path:'/tmp/hipobuy-home-desktop.png',fullPage:true});
await page.goto('http://127.0.0.1:8765/fr/articles/hipobuy-jersey-size-guide/');
assert.equal(await page.locator('html').getAttribute('lang'),'fr');
await page.locator('.language-select select').selectOption('zh');await page.waitForURL('**/zh/articles/hipobuy-jersey-size-guide/');
assert.equal(await page.locator('h1').textContent(),'Hipobuy 球衣尺码：球员版、球迷版与质检指南');
assert.equal(await page.locator('.article-copy section').count(),8);
await page.goto('http://127.0.0.1:8765/articles/hipobuy-hoodie-size-guide/?lang=de');await page.waitForURL('**/de/articles/hipobuy-hoodie-size-guide/');
assert.equal(await page.locator('.article-copy section').count(),8);
await page.goto('http://127.0.0.1:8765/zh/spreadsheet/');
assert.equal(await page.locator('.data-row:visible').count(),60);
await page.locator('.sheet-controls select').selectOption('jerseys');assert.equal(await page.locator('.data-row:visible').count(),10);
await page.locator('.sheet-controls select').selectOption('All');await page.locator('.sheet-controls input').fill('6045');assert.equal(await page.locator('.data-row:visible').count(),1);
await page.goto('http://127.0.0.1:8765/shipping/');
for(const [key,value] of Object.entries({weight:'2',length:'40',width:'30',height:'20',divisor:'6000'}))await page.locator(`#weight-planner input[name="${key}"]`).fill(value);
assert.equal(await page.locator('#volume-result').textContent(),'4.000');assert.equal(await page.locator('#chargeable-result').textContent(),'4.000');
await page.locator('#budget-planner input[name="items"]').fill('50');await page.locator('#budget-planner input[name="freight"]').fill('25.50');
assert.equal(await page.locator('#budget-result').textContent(),'75.50');assert.equal(await page.locator('#budget-missing').textContent(),'4');
await page.locator('#weight-planner input[name="divisor"]').fill('0');assert.equal(await page.locator('#volume-result').textContent(),'—');
// Instrument GA without transmitting data, preserving live native click handling.
await page.goto('http://127.0.0.1:8765/');
await page.evaluate(()=>{window.events=[];window.gtag=(...args)=>window.events.push(args);document.querySelectorAll('a[target="_blank"]').forEach(a=>a.addEventListener('click',e=>e.preventDefault()));});
await page.locator('.product-card .product-image').first().click();
await page.locator('.header-cta').click();
const events=await page.evaluate(()=>window.events);assert(events.some(x=>x[1]==='outbound_product_click'&&x[2].product_id==='5974'));assert(events.some(x=>x[1]==='outbound_catalog_click'));
const langs=['en','de','es','fr','it','pl','pt','zh'];
await page.setViewportSize({width:390,height:844});
for(const lang of langs){const prefix=lang==='en'?'':`/${lang}`;
 for(const route of ['/', '/articles/', '/articles/hipobuy-jersey-size-guide/','/shipping/','/spreadsheet/']){
  await page.goto(`http://127.0.0.1:8765${prefix}${route}`);
  const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>window.innerWidth+1);
  assert(!overflow,`Horizontal overflow: ${lang} ${route}`);
  if(route==='/articles/')assert.equal(await page.locator('.article-index>a').count(),15);
 }
}
await page.goto('http://127.0.0.1:8765/zh/articles/hipobuy-jersey-size-guide/');await page.screenshot({path:'/tmp/hipobuy-zh-mobile.png',fullPage:true});
await page.goto('http://127.0.0.1:8765/de/shipping/');await page.screenshot({path:'/tmp/hipobuy-de-shipping-mobile.png',fullPage:true});
assert.deepEqual(errors,[]);await browser.close();console.log('PASS: language routes, legacy links, all article indexes, filters, calculator, event types and mobile overflow in 8 languages.');
