const mongoose = require("mongoose")

const BannerSchema = new mongoose.Schema({
  photo_url:{
    type: String,
    required: true
  },
});
const Banner = mongoose.model('Banner', BannerSchema);

module.exports = Banner