const moongoose = require('mongoose');

const productSchema = new moongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: moongoose.ObjectId,
        ref: 'categories',
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    photo: {
        data: Buffer,
        ContentType: String,
    },
    shipping: {
        type: Boolean,
    }
}, { timestamps: true });

module.exports = moongoose.model('products', productSchema)