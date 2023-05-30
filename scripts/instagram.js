const puppeteer = require('puppeteer');

const scrapeImages = async (username) => {
    const browser = await puppeteer.launch( {headless: true} );
    const page = await browser.newPage();

    await page.goto(`https://www.instagram.com/${username}/login/`);

    // Login form
    await page.screenshot({ path: '1.png' });

    await page.type('[name=username]', 'username');

    await page.type('[name=password]', 'password');

    await page.screenshot({ path: '2.png'});

    await page.click('[type=submit]');

    // Social Page
    await page.waitFor(5000); // why not just await page.waitForNavigation()?

    await page.goto(`https://www.instagram.com/`);

    await page.waitForSelector('img', { visible: true });

    await page.screenshot({ path: '3.png' });

    // Execute code in the DOM
    const data = await page.evaluate( () => {
        const images = document.querySelectorAll('img'); // This will get all the images on the page
        const urls = Array.from(images).map(v => v.src);
        return urls;
    });

    await browser.close();

}       