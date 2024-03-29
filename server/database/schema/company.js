
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const companySchema = new Schema({
    id: {
        unique: true,
        type: String
    },
    
    company: String,
    logo: String,
    info: String,
    hot: String,

    meta: {
        createdAt: {
            type: Date,
            default: Date.now()
        },
        updatedAt: {
            type: Date,
            default: Date.now()
        }
    }
})

companySchema.pre('save', function(next){
    if(this.isNew) {
        this.meta.createdAt = this.meta.updatedAt = Date.now()
    } else {
        this.meta.updatedAt = Data.now()
    }
    next()
})

mongoose.model('Company', companySchema)