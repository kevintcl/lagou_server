
const mongoose = require('mongoose')

const db = 'mongodb://localhost/test_lagou'

const glob = require('glob')

const { resolve } = require('path')

exports.initSchemas = () => {
    glob.sync(resolve(__dirname, './schema', '**/*.js')).forEach(require)
}

exports.connect = () => {
    let maxConnectTimes = 0

    return new Promise((resolve, reject) => {
        console.log('process.env.NODE_ENV='+process.env.NODE_ENV)
        if (process.env.NODE_ENV != 'production') {
            mongoose.set('debug', true)
        }
        //链接数据库
        mongoose.set('useCreateIndex', true) //加上这个
        mongoose.connect(db ,{ useNewUrlParser: true , useUnifiedTopology: true})

        mongoose.connection.on('disconnected', () => {
            maxConnectTimes++

            if (maxConnectTimes < 5) {
                mongoose.connect(db ,{ useNewUrlParser: true , useUnifiedTopology: true})
            } else {
                throw new Error('数据库挂了！！！')
            }
        })

        mongoose.connection.on('error', err => {
            console.log(err)

            maxConnectTimes++

            if (maxConnectTimes < 5) {
                mongoose.connect(db ,{ useNewUrlParser: true , useUnifiedTopology: true})
            } else {
                throw new Error('数据库挂了！！！error')
            }


        })

        mongoose.connection.once('open', () => {
            resolve()

            console.log('MongoDB Connected successfully!!!')
        })
    })
}

