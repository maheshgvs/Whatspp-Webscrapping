
const { ConsoleMessage } = require('playwright');
const playwright = require('playwright');

async function scrape(url) {
    // Invoke the chromium browser and hot the desired web page
    const browser = await playwright["chromium"].launch({ headless: false, args: ['--start-maximized'] });
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto(url);
    // Wait for the page to load and selcts the group name from whatsapp
    await page.waitForSelector("#side > div.SgIJV > div > label > div > div._2_1wd.copyable-text.selectable-text");
    const input = await page.$("#side > div.SgIJV > div > label > div > div._2_1wd.copyable-text.selectable-text")
    const groupname = 'CAW_Assignment_Mahesh';
    await input.type(groupname);
    await page.waitForSelector("span[title='" + groupname + "']");
    const target = await page.$("span[title='" + groupname + "']");
    await target.click();

    await page.waitForSelector("._1bR5a");

    // Scraping the new message from the whatsapp group
    const reuse = async function () {
        const results = await page.evaluate(() => {

            const searchResult = document.querySelectorAll("._1bR5a");
            const temp = [];

            searchResult.forEach((searchItem) => {

                let str;
                const x = searchItem.querySelector("._1bR5a > div").getAttribute("data-pre-plain-text");
                
                if (searchItem.querySelector("._1Lc2C.eHxwV._3-8er") !== null) {
                    str = searchItem.querySelector("._1Lc2C.eHxwV._3-8er").innerHTML;
                    console.log(str);
                }
                else {

                    str = x;
                }
                let item = {

                    contact: str,
                    Message: searchItem.querySelector("._3-8er.selectable-text.copyable-text>span").innerHTML,
                    Time: searchItem.querySelector("div._2zWo9 > div > span").innerHTML
                };
                temp.push(item);
            });

            return temp;
        });

        require("fs").writeFile("result.json", JSON.stringify(results, null, ' '), () => { });
        console.log("New message being searched for every 10 Secounds.");
    }


    reuse();
    try {
        setInterval(reuse, 10000);
    } catch (error) { console.log(error) };
}

scrape("https://web.whatsapp.com/");


