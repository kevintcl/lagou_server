const Koa = require('koa')


const app = new Koa()


app.use()
app.use(async (ctx) => {
    console.log("1111")
    ctx.body = 'hello KOA'
})

app.listen(12345)

console.log('koa damo is starting at port 12345');