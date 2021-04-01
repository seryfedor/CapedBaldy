var mongoose = require('mongoose')
const Schema = mongoose.Schema;

const urlSchema = new Schema({
  site: String,
  urlRedirect: String
})

var doc = mongoose.model("url", urlSchema);

module.exports = doc;