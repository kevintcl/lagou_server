
const cp = require('child_process')

const { resolve } = require('path')

const mongoose = require('mongoose')

const Job = mongoose.model('Job')

; (async () => {

    const script = resolve(__dirname, '../crawler/job_list')
    console.log(script)

    const child = cp.fork(script, [])

    child.on('message', data => {
        let result = data.result

        result.forEach(async item => {
          
            let job = await Job.findOne({
                id: item.id
            })
            console.log("=======id=" + item.id + ",job=" + job)
            if (!job) {
                console.log("====save========id="+ item.id )
                job = new Job(item)
                await job.save()
            }
        });
    })
})();