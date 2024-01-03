const mongoose = require('mongoose')

const productSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        age: {
            type: Number,
            required: true
        }
    },
)


const Product = mongoose.model('Product', productSchema);

module.exports = Product;
