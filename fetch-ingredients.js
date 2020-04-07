const puppeteer = require('puppeteer-core');
const fs = require('fs');
const delay = require('delay');
const ingredientsFile = '/Users/vaibhavt/cook-suggest/recipe-ingredients.log';
const recipeLinks = '/Users/vaibhavt/cook-suggest/recipe-links.txt';

(async function main() {
    const browser = await puppeteer.launch({
        executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
        defaultViewport: {
            width: 1024,
            height: 768
        }
    });
    tempList = []
    const page = await browser.newPage();
    fs.readFile(recipeLinks, 'utf-8', (err, links) => {
        if (err) throw err;
        links = links.split('\n');
        links.forEach(link => {
            tempList.push(link)
        });
    });
    await delay(1000);
    for (let i = 0; i < tempList.length; i++) {
        link = tempList[i];
        await page.goto(link);
        const ingredients = await page.$$('.wprm-recipe-ingredient-name');
        ingredientList = [];
        for(let target of ingredients) {
            const innerHtml = await page.evaluate(el => el.innerHTML, target);
            if (innerHtml.charAt(0) != '<') {
                if (innerHtml.indexOf('/') > -1) {
                    ipair = innerHtml.split(' / ');
                    ingredientList.push(ipair[0]);
                    ingredientList.push(ipair[1]);
                } else {
                    ingredientList.push(innerHtml);
                }
            }
        }
        fs.appendFile(ingredientsFile, 
            JSON.stringify({'recipeURL': link, 'ingredients': ingredientList}) + '\n', 
            'utf-8', 
            function(err) {
                if (err) throw err;
        });
    }
    await browser.close();
})();