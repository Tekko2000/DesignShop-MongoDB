const mongoose = require('mongoose')

const Schema = mongoose.Schema

const designItemSchema = new Schema({
    product_pic_link: String,
    link_shop: String,
    product: {
        type: String,
        required: true,
    },
    company: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    }

})

const DesignItem = mongoose.model('DesignDb', designItemSchema)

module.exports = DesignItem