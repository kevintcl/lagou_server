
const puppeteer = require('puppeteer')

const sleep = (time) => {
    return new Promise((resolve) => {
        setTimeout(resolve, time)
    })
}


async function fetchCompany(page, compnayId) {

    const url = `https://www.lagou.com/gongsi/${compnayId}.html`

    const id = compnayId

    await page.goto(url, {
        waitUntil: 'networkidle2'
    })

    return await page.evaluate(() => {
        let $ = window.$
        let inc = $('.company_content p').text()  // 公司简介
        let tags = $('.item_con_ul .con_ul_li')  // 公司福利
        let tagsResult = []
        let companyImgs = $('.company_img .rotate_item img')   // 公司图片
        let companyImgsResult = []

        if (tags.length >= 1) {
            tags.each((index, item) => {
                let tag = $(item).text().trim()
                tagsResult.push(tag)
            })
        }

        if (companyImgs.length >= 1) {
            companyImgs.each((index, item) => {
                let img = $(item).attr('src')
                companyImgsResult.push(img)
            })
        }

        return { inc, tagsResult, companyImgsResult }
    })
}
;

(async () => {
    let compnayIds = process.argv[2].split(',') //[95651]//

    console.log("compnayIds=" + compnayIds)

    let result = []

    const browser = await puppeteer.launch({
        args: ['--no-sandbox'],
        dumpio: false,
        headless: false
    })

    const page = await browser.newPage()
    await sleep(2000)

    while (compnayIds.length > 0) {
        let tmp = await fetchCompany(page, compnayIds[0])
        console.log(tmp)

        const data = {
            id: compnayIds[0],
            inc: tmp.inc,
            tagsResult: tmp.tagsResult,
            companyImgsResult: tmp.companyImgsResult
        }
        result.push(data)
        compnayIds.shift()
    }

    console.log(result)

    process.send({ result })

    await sleep(5000)

    browser.close()

    process.exit(0)
})()