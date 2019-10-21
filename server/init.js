
const {connect, initSchemas} = require('./database/init')

const router = require('./routes')

const Koa = require('koa')


const app = new Koa()

async function start() {
    await connect()

    initSchemas()


    // require('./tasks/company_list_task')
    // require('./tasks/job_list_task')

    // require('./tasks/company_detail_task')
}

app.use(router.routes())
app.listen(3000)

start()