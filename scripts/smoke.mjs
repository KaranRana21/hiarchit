import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';

const origin = process.env.SMOKE_BASE_URL || 'http://127.0.0.1:3000';
const widths = [320, 360, 390, 430, 768, 1024, 1440, 1920];
const output = 'smoke-artifacts';
await fs.mkdir(output, { recursive: true });
const browser = await chromium.launch({ headless: true, args: ['--disable-dev-shm-usage', '--enable-unsafe-swiftshader'] });
const failures = [];
let checks = 0;

async function inspect(width) {
  const context = await browser.newContext({
    viewport: { width, height: width < 500 ? 800 : 900 },
    deviceScaleFactor: 1,
    reducedMotion: width === 320 ? 'reduce' : 'no-preference'
  });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));

  async function check(label, fn) {
    checks++;
    try {
      await fn();
      console.log('PASS ' + width + 'px ' + label);
    } catch (error) {
      failures.push(width + 'px ' + label + ': ' + error.message);
      console.error('FAIL ' + width + 'px ' + label + ': ' + error.message);
      await page.screenshot({ path: output + '/failure-' + width + '-' + label.replace(/[^a-z]+/gi, '-') + '.png', fullPage: false }).catch(() => {});
    }
  }

  try {
    await page.goto(origin, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.locator('h1').first().waitFor({ state: 'visible' });
    await page.waitForTimeout(450);

    await check('identity', async () => {
      assert.equal(await page.locator('h1').count(), 1);
      assert.match(await page.locator('body').innerText(), /ARCHIT JAIN/i);
      assert.match(await page.title(), /Archit Jain/i);
      assert.equal(await page.locator('img[alt*="Archit Jain"]').count(), 1);
    });
    await check('overflow', async () => {
      const sizes = await page.evaluate(() => ({
        viewport: window.innerWidth,
        doc: document.documentElement.scrollWidth,
        body: document.body.scrollWidth
      }));
      assert.ok(Math.max(sizes.doc, sizes.body) <= sizes.viewport + 2, JSON.stringify(sizes));
    });
    await check('primary links', async () => {
      assert.equal(await page.locator('a[href="/work"]').count() > 0, true);
      assert.equal(await page.locator('a[href="/journal"]').count() > 0, true);
      assert.equal(await page.locator('a[href*="drive.google.com"]').count() > 0, true);
      assert.equal(await page.locator('a[href="mailto:architjain808@gmail.com"]').count() > 0, true);
    });
    if (width === 1440) await check('portrait loaded', async () => {
      await page.locator('img[alt*="Archit Jain"]').first().scrollIntoViewIfNeeded();
      await page.waitForFunction(() => {
        const image = document.querySelector('img[alt*="Archit Jain"]');
        return image?.complete;
      }, null, { timeout: 8000 });
      const photo = await page.locator('img[alt*="Archit Jain"]').first().evaluate(img => ({
        complete: img.complete, width: img.naturalWidth, src: img.currentSrc
      }));
      assert.ok(photo.width > 0, JSON.stringify(photo));
    });
    await check('3D fallback', async () => {
      const fallback = page.locator('.sculpture-fallback');
      assert.equal(await fallback.count(), 1);
      assert.ok((await fallback.boundingBox())?.width > 30);
      if (width === 320) {
        assert.equal(await page.locator('.sculpture-canvas.canvas-ready').count(), 0, 'reduced-motion canvas should remain disabled');
      }
    });

    if (width <= 768) {
      await page.goto(origin, { waitUntil: 'domcontentloaded' });
      await check('mobile menu', async () => {
        const menu = page.locator('button.menu-toggle');
        assert.equal(await menu.isVisible(), true);
        await menu.click();
        assert.equal(await menu.getAttribute('aria-expanded'), 'true');
        await page.locator('nav.nav-links a[href="/work"]').click();
        await page.waitForURL('**/work');
        assert.equal(await menu.getAttribute('aria-expanded'), 'false');
      });
    } else if (width === 1440) {
      await check('work route', async () => {
        await page.goto(origin + '/work');
        assert.equal(await page.locator('article.case').count(), 4);
        assert.match(await page.locator('body').innerText(), /UMANG Web/);
      });
      await check('journal route', async () => {
        await page.goto(origin + '/journal');
        assert.equal(await page.locator('a.article-row').count(), 6);
      });
      await check('404 route', async () => {
        const response = await page.goto(origin + '/nonexistent-smoke-path');
        assert.equal(response?.status(), 404);
      });
    }

    await check('runtime', async () => {
      assert.deepEqual(errors, [], 'uncaught browser exceptions: ' + errors.join(' | '));
    });
    if ([390, 1440].includes(width)) {
      await page.goto(origin);
      await page.waitForTimeout(2300);
      await page.evaluate(async () => {
        for (let y = 0; y < document.body.scrollHeight; y += 720) {
          window.scrollTo(0, y);
          await new Promise(resolve => setTimeout(resolve, 130));
        }
        window.scrollTo(0, 0);
      });
      await page.waitForTimeout(1500);
      await page.screenshot({ path: output + '/home-' + width + '.png', fullPage: true });
    }
  } finally {
    await context.close();
  }
}
try {
  for (const width of widths) await inspect(width);
  console.log('SMOKE RESULT: ' + (checks - failures.length) + '/' + checks + ' checks passed');
  if (failures.length) {
    console.error('FAILURES:\n' + failures.join('\n'));
    process.exitCode = 1;
  }
} finally {
  await browser.close();
}