const mongoose = require('mongoose')
const AddUrl = require('../middlewares/addUrlImg')

const categoriesShema = mongoose.Schema({
    name: {
        type: String,
        required: [true, ' category required'],
        unique: [true, "category name must be unique"],
        minlength: [3, 'category too short'],
        maxlength: [32, 'category too long']
    },
    slug: {
        type: String,
        lowercase: true
    },
    image: String,
}, 
{ timestamps: true })





const postUrl = new AddUrl(categoriesShema)

postUrl.post('categories')
postUrl.save('categories')
// postUrl.update('categories')

const categoriesModel = mongoose.model('Categories', categoriesShema)

module.exports = categoriesModel