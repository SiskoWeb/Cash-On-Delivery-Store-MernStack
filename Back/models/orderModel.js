const mongoose = require('mongoose')

// eslint-disable-next-line import/no-extraneous-dependencies
// const AutoIncrementFactory = require('mongoose-sequence');

// const connection = mongoose.createConnection('mongodb+srv://siskodb:sisko007SP@cluster0.2pdvdr6.mongodb.net/ecom_local?retryWrites=true&w=majority');

// const AutoIncrement = AutoIncrementFactory(connection);

const orderSchema = mongoose.Schema({

    cartItems: [
        {
            productID: {
                type: mongoose.Schema.ObjectId,
                ref: 'Product',
            },
            quantity: Number,
            price: Number,
        },
    ],
    shippingAddress: {
        name: String,
        address: String,
        phone: String,
        city: String,

    },
    isDelivered: {
        type: Boolean,
        default: false,
    },
    totalOrderPrice: {
        type: Number,
    },
}
    ,
    {
        timestamps: {
            createdAt: 'created_at', // Use `created_at` to store the created date
            updatedAt: 'updated_at' // and `updated_at` to store the last updated date
        }
    }
)

// orderSchema.plugin(AutoIncrement, { inc_field: 'ido' });


module.exports = mongoose.model('Orders', orderSchema);