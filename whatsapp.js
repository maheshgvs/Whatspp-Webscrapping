
const puppeteer = require("puppeteer");

async function scrape (url){

    const browser = await puppeteer.launch({ headless: false ,
        defaultViewport: null,
        args: ['--start-maximized']});
        const page = await browser.newPage();
        await page.goto(url);
        await page.waitForSelector("#side > div.SgIJV > div > label > div > div._2_1wd.copyable-text.selectable-text");
        const input = await page.$("#side > div.SgIJV > div > label > div > div._2_1wd.copyable-text.selectable-text")
        await input.type('test group');
        await page.waitForSelector("span[title='Test Group']");
        const target =await page.$("span[title='Test Group']");
        await target.click(); 
        await page.waitForSelector("._1bR5a");
        await page.waitForSelector("._24wtQ._2kR4B");
        const results = await page.evaluate(()=> {
        const searchResult = document.querySelectorAll("._1bR5a");
        
        const temp=[];        
        searchResult.forEach((searchItem)=> {
        let str;
        if (searchItem.querySelector("._1Lc2C.eHxwV._3-8er") !== null) {
        str = searchItem.querySelector("._1Lc2C.eHxwV._3-8er").innerHTML;
        console.log(str);
        }
        else if(searchItem.querySelector(".ZJv7X") !== null)
        {
            str = searchItem.querySelector(".ZJv7X").innerHTML;
            console.log(str);
        }
        else {
        str = "Me"; 
        
        }
        let item={
                
            contact : str,
            Message: searchItem.querySelector("._3-8er.selectable-text.copyable-text>span").innerHTML,
            Time: searchItem.querySelector("div._2zWo9 > div > span").innerHTML
        };
        temp.push(item);
    });
    return temp;
    });
    require("fs").writeFile("result.json",JSON.stringify(results,null,' '),() => {});
    browser.close();
}
    scrape("https://web.whatsapp.com/");


