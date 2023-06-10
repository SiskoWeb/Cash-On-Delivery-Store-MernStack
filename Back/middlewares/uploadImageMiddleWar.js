
// // eslint-disable-next-line import/no-extraneous-dependencies
// const multer = require('multer')
// // eslint-disable-next-line import/no-unresolved, node/no-missing-require
// const ApiError = require('../utils/apiError')

// exports.uploadSingleImage = (fieldName) => {
//     // MemoryStorage engine   buffer
//     const storage = multer.memoryStorage()

//     // validator if user upload image
//     const multerFilter = function (req, file, cb) {
//         if (file.mimetype.startsWith('image')) {
//             cb(null, true)
//         }
//         else {
//             cb(new ApiError('only image allow', 400), false)
//         }
//     }
//     const upload = multer({ storage: storage, fileFilter: multerFilter })

//     return upload.single(fieldName)
// }

// exports.uploadMultImage = (fieldName) => {
//     // MemoryStorage engine   buffer
//     const storage = multer.memoryStorage()

//     // validator if user upload image
//     const multerFilter = function (req, file, cb) {
//         if (file.mimetype.startsWith('image')) {
//             cb(null, true)
//         }
//         else {
//             cb(new ApiError('only image allow', 400), false)
//         }
//     }
//     const upload = multer({ storage: storage, fileFilter: multerFilter })

//     return upload.fields(fieldName)
// }


const multer = require('multer');
// eslint-disable-next-line import/no-unresolved, node/no-missing-require
const ApiError = require('../utils/apiError')

const multerOptions = () => {

    const multerStorage = multer.memoryStorage();

    const multerFilter = function (req, file, cb) {
        if (file.mimetype.startsWith('image')) {
            cb(null, true);
        } else {
            cb(new ApiError('Only Images allowed', 400), false);
        }
    };

    const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

    return upload;
};

exports.uploadSingleImage = (fieldName) => multerOptions().single(fieldName);

exports.uploadMultImage = (arrayOfFields) =>
    multerOptions().fields(arrayOfFields);