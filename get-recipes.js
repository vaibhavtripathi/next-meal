const puppeteer = require('puppeteer-core');
const fs = require('fs');
const recipes = '/Users/vaibhavt/cook-suggest/recipes.log';
(async function main() {
    const browser = await puppeteer.launch({
        executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
        defaultViewport: {
            width: 1024,
            height: 768
        }
    });
    const page = await browser.newPage();
    await page.goto('https://hebbarskitchen.com/recipes/indian-curry-recipes/');
    const recipes = await page.$$('.td-module-title');
    for(let elem of recipes){
        const innerHtml = await page.evaluate(el => el.innerHTML, elem); 
        console.log(innerHtml)
    } 
    for (let i = 2; i <= 14; i++) {
        await page.goto('https://hebbarskitchen.com/recipes/indian-curry-recipes/page/' + i);
        const recipes = await page.$$('.td-module-title');
        for(let elem of recipes){
            const innerHtml = await page.evaluate(el => el.innerHTML, elem); 
            console.log(innerHtml)
        }
    }
    await browser.close();
})();