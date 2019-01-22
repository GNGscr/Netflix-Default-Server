
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const MainSchema = new Schema({
    title    : { type: String, require: false},
    poster   : { type: String, require: false },
    details  : { type: String, require: false },
    description: { type: String, require: false },
    trailer  : { type: String,require: false}
   
})

module.exports = mongoose.model('DATA', MainSchema);
