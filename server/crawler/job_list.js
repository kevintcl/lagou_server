const puppeteer = require('puppeteer')

const sleep = time => new Promise(resolve => {
    setTimeout(resolve, time)
})

async function fetchJobList(page, curPage) {
    const url = `https://www.lagou.com/zhaopin/${curPage}/`

    await page.goto(url, {
        waitUtil: 'networkidle2'
    })

    return await page.evaluate(() => {
        var $ = window.$
        var items = $('.default_list')

        var objItem = []

        if (items.length >= 1) {
            items.each((index, item) => {
                let it = $(item)
                let id = it.attr('data-positionid')
                let title = it.attr('data-positionname')
                let salary = it.attr('data-salary')
                let company = it.attr('data-company')
                let info = it.find('.industry').text().trim()

                let category = it.find('.list_item_bot').find('.li_b_l span:first').text()

                let head = 'https:' + it.find('.com_logo img').attr('src')
                let publish = it.find('.format-time').text()
                let link = it.find('.position_link').attr('href')

                
                objItem.push((
                    {
                        id,
                        title,
                        salary,
                        company,
                        info,
                        category,
                        head,
                        publish,
                        link
                }))
            })
        }
        return objItem
    })
}

;(async () => {
    console.log('正在抓取职位列表页面')

    let result = []

    const browser = await puppeteer.launch({
        args: ['--no-sandbox'],
        dumpio: false,
        headless: false
    })

    const page = await browser.newPage()

    for (let i = 1; i <= 3; i++) {
        let tmp = await fetchJobList(page, i)
        console.log(tmp)
        result = [...result, ...tmp]
    }


   
    process.send({result})
    await sleep(5000)
    browser.close()
    process.exit(0)

})()