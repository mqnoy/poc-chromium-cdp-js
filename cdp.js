const { chromium } = require("playwright-core");
const { default: Plimit } = require('p-limit');

/**
 * 
 * @param {import("playwright-core").Browser} browser 
 * @param {Number} element 
 */
const openTheExample = async (browser, task) => {
    console.debug(`run task number: ${task}`)
    const context = browser.contexts()[0] || await browser.newContext();
    const page = await context.newPage();
    await page.goto("http://localhost:9224/nginx_status?task=" + task);
    console.log(await page.title());
    // await page.screenshot({ fullPage: true, path: `./output/shot${task}.png`, animations: "disabled" })

    await page.screenshot({ fullPage: true, animations: "disabled" })

    await page.close()
}

(async () => {
    const browser = await chromium.connectOverCDP("http://localhost:9224");
    const limit = Plimit(100);
    const tasks = Array.from({ length: 1000 }, (_, i) => i)
    await Promise.all(
        tasks.map((task) => limit(() => Promise.all([
            openTheExample(browser, task)
        ])))
    );
    await browser.close();
})();
