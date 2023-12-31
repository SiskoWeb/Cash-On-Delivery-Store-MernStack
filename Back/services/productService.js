const Prodcuts = require('../models/productModel');
const { uploadMultImage } = require('../middlewares/uploadImageMiddleWar');


const asyncHandler = require('express-async-handler');


const factory = require('./handlersFactory')

const sharp = require('sharp');



// @desc Resize Image That user input
exports.resizeImage = asyncHandler(async (req, res, next) => {

    if (req.files?.imageCover) {

        const coverfileName = `PRODUCT-${Date.now()}-${Math.round(Math.random() * 1E9)}-cover.png`

        await sharp(req.files.imageCover[0].buffer)
            .resize(500, 500)
            .toFormat('png')
            .png({ quality: 90 })
            .toFile(`uploads/products/${coverfileName}`)

        req.body.imageCover = coverfileName


    }
    if (req.files?.images) {
        req.body.images = []
        await Promise.all(
            req.files.images.map(async (img) => {
                const imageName = `PRODUCT-${Date.now()}-${Math.round(Math.random() * 1E9)}.png`

                await sharp(img.buffer)
                    .resize(600, 600)
                    .toFormat('jpeg')
                    .jpeg({ quality: 90 })
                    .toFile(`uploads/products/${imageName}`)


                req.body.images.push(imageName)

            })
        )

    }
    next()
})



//@Desc MiddleWare using multer to upload image to server
exports.imageUploaderProduct = uploadMultImage([

    { name: 'imageCover', maxCount: 1 },
    { name: 'images', maxCount: 5 }
])


// @desc    Create  category
// @route   PUT /api/v1/Prodcuts/:id
// @access    Protected/Admin
exports.createProduct = factory.createCategory(Prodcuts)


// @desc    Get All category
// @route   GET /api/v1/Prodcuts/:id
// @access    Protected/Admin
// exports.getAllProdcuts = factory.getAll(Prodcuts)
exports.getAllProdcuts = factory.getAll(Prodcuts, 'Product');
// @desc    update specific category
// @route   UPUT /api/v1/Prodcuts/:id
// @access    Protected/Admin
exports.updateProduct = factory.updateOne(Prodcuts)

// @desc    Delete specific category
// @route   DELETE /api/v1/Prodcuts/:id
// @access    Protected/Admin
exports.deleteProduct = factory.deleteOne(Prodcuts)

// @desc    Get specific category
// @route   GET /api/v1/Prodcuts/:id
// @access    Protected/Admin
exports.getOne = factory.getOne(Prodcuts)