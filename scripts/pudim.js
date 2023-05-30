const puppeteer = require('puppeteer');

async function run() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://pudim.com.br/');
  console.log(await page.content());
  await page.screenshot({ path: 'pudim.jpg' });
  await browser.close();
}

run();
