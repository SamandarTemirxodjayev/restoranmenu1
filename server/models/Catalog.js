const mongoose = require("mongoose")

const CatalogSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true
  },
});
const Catalog = mongoose.model('Catalog', CatalogSchema);

module.exports = Catalog