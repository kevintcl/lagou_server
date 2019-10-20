
const cp = require('child_process')

const { resolve } = require('path')

const mongoose = require('mongoose')

const Company = mongoose.model('Company')

; (async () => {

    const script = resolve(__dirname, '../crawler/company_list')
    console.log(script)

    const child = cp.fork(script, [])

    child.on('message', data => {
        let result = data.result

        result.forEach(async item => {
          
            let company = await Company.findOne({
                id: item.id
            })
            console.log("=======id=" + item.id + ",company=" + company)
            if (!company) {
                console.log("====save========id="+ item.id )
                company = new Company(item)
                await company.save()
            }
        });
    })
})();