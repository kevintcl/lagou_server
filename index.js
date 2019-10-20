

const http = require("http");
const puppeteer = require("puppeteer");
(async () => {
    console.log("1111");

    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto("https://www.lagou.com/gongsi/",
        { waitUntil: 'networkidle0' });
    // await page.click('#company_list > ul > li:nth-child(1) > div.top > p > a');

    // await page.goto("file:///Users/tangchunlin/study/nodejs/lagou1/test.html");

    const link = await page.$('#company_list > ul > li:nth-child(1) > div.top > p > a');

    const newPagePromise =
        new Promise((x) => {
            browser.once('targetcreated', (target) => {
                x(target.page())
            })
        }
        ); // 声明变量

    await link.click(); // 点击跳转
    const newPage = await newPagePromise; // newPage就是a链接打开窗口的Page对象

    
    const result = await newPage.evaluate(() => {
        //  let t =  document.getElementsByClassName("intro")[1].innerHTML;
        let t = document.getElementsByClassName("hovertips")[0].innerHTML.trim();
        let t1 = document.getElementsByClassName('company_word')[0].innerHTML.trim();
        console.log("222222222");
        //  console.log("t=" + t);
        return { t , t1}
    });


    console.log("3333==r=" + result.t + "," + result.t1);
    browser.close();
})();