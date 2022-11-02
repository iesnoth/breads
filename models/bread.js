const mongoose = require('mongoose')
//shorthand for Schema constructor
const {Schema} = mongoose
//the schema
const breadSchema = new Schema({
  name: { type: String, required: true },
  hasGluten: Boolean,
  image: { type: String, default: 'http://placehold.it/500x500/png' },
  baker: {
    type: Schema.Types.ObjectId,
    ref: 'Baker'
  }
})

//Adds the baker to the bottom
breadSchema.methods.getBakedBy = function(){
  return `${this.name} was baked with love by ${this.baker}`
}

//BONUS get all the breads made by a certain baker
breadSchema.statics.listBreadByBaker = function(bakerName){
  return this.find({baker : bakerName})
}

//making a model and export
const Bread = mongoose.model('Bread',breadSchema)
module.exports =  Bread
