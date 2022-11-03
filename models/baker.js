const mongoose = require('mongoose')
const Bread = require('./bread')
const {Schema} = mongoose

const bakerSchema = new Schema({
    name:{
        type:String,
        required:true,
        enum: ['Christopher','David','Matt','Peter','Jodie','Ncuti']
    },
    startDate:{
        type: Date,
        required: true
    },
    bio: String
},
{toJSON: {virtuals:true}})

//Virtuals:
bakerSchema.virtual('breads',{
    ref: 'Bread',
    localField: '_id',
    foreignField: 'baker'
})


const Baker = mongoose.model('Baker',bakerSchema)
module.exports = Baker