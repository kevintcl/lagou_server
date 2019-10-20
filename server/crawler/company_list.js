const puppeteer = require('puppeteer')

const sleep = time => new Promise(resolve => {
    setTimeout(resolve, time)
})

async function fetchCompanyList(page) {
    const url = `https://www.lagou.com/gongsi/`

    await page.goto(url, {
        waitUntil: 'networkidle2'
    })

    await page.screenshot({
        path: `site/screenshot/company.png`,
        fullPage: true
    })

    return await page.evaluate(() => {
        var $ = window.$
        var items = $('.company-item')
        var objItem = []
       
        if (items.length >= 1) {
            items.each((index, item) => {
                let it = $(item)
                let id = it.attr('data-companyid');
                let company = it.find('.company-name a').text()
                let logo = "https:" + it.find('.top img').attr('src')
                let info = it.find('.indus-stage').text()
                let hot = it.find('.advantage').text()

                objItem.push({
                    id,
                    company,
                    logo,
                    info,
                    hot
                })
            })
        }
        return objItem
    })
}

; (async () => {
    console.log('正在抓取公司列表页面')

    const browser = await puppeteer.launch({
        args: ['--no-sandbox'],
        headless: false,
        dumpio: false
    })

    const page = await browser.newPage()

    await sleep(2000)
    let result = await fetchCompanyList(page)
     
    // result.forEach(element => {
    //     console.log("result=" + element.id +
    //         ",company=" + element.company +
    //         ",info=" + element.info +
    //         ",hot=" + element.hot +
    //         ",logo=" + element.logo);
    // });

    process.send({result})
    
    await sleep(5000)
    browser.close()
    process.exit(0)
})()