import * as puppeteer from 'puppeteer';

let browser;
let page;

export async function getBrowser() {
    if (!browser) {
        browser = await puppeteer.launch({
            headless: true,
            executablePath: process.env.CHROME_BIN || '/usr/bin/chromium-browser',
            args: ['--start-maximized']
        });
    }
    return browser;
}

export async function getPage(urlLogin: string) {
    if (!page) {
        const browserInstance = await getBrowser();
        page = await browserInstance.newPage();
        await page.setViewport({ width: 1500, height: 1000 });
        await page.goto(urlLogin);
        await page.waitForTimeout(1000);
    }
    return page
}

export async function reloadPage() {
    await page.reload()
    await page.waitForTimeout(1000);
}

export async function restBrowser() {
    if (browser) {
        await browser.close();
        browser = null;
        page = null;
    }
}
