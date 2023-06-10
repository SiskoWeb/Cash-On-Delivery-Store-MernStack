// const productModele = require('../models/productModel');
// const brandModel = require('../models/brandModel')
// const categoryModle = require('../models/categoryModel')
// const subCategoryModele = require('../models/subCategoryModel');
// const userModel = require('../models/userModel');
// const reviewsModel = require('../models/reviewsModel');

class ApiFeatures {
    constructor(mongooseQuery, queryString) {
        this.mongooseQuery = mongooseQuery;
        this.queryString = queryString;
    }

    filter() {
        // eslint-disable-next-line node/no-unsupported-features/es-syntax
        const queryStringObj = { ...this.queryString }; //@desc Destructuring all query comes from user
 
        const excludesFields = ['page', 'sort', 'limit', 'fields'];
        excludesFields.forEach((field) => delete queryStringObj[field]);//@desc filter  querys 
        
        // Apply filtration using [gte, gt, lte, lt]
        let queryStr = JSON.stringify(queryStringObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

        this.mongooseQuery = this.mongooseQuery.find(JSON.parse(queryStr));

        return this;
    }

    sort() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ');
            this.mongooseQuery = this.mongooseQuery.sort(sortBy);
        } else {
            this.mongooseQuery = this.mongooseQuery.sort('-createAt');
        }
        return this;
    }

    limitFields() {
        if (this.queryString.fields) {
            const fields = this.queryString.fields.split(',').join(' ');
            this.mongooseQuery = this.mongooseQuery.select(fields);
        } else {
            this.mongooseQuery = this.mongooseQuery.select('-__v');
        }
        return this;
    }

    // search(modelName) {
    //     if (this.queryString.keyword) {
    //         let query = {};
    //         if (modelName === 'Products') {
    //             query.$or = [
    //                 { title: { $regex: this.queryString.keyword, $options: 'i' } },
    //                 { description: { $regex: this.queryString.keyword, $options: 'i' } },
    //             ];
    //             this.mongooseQuery = productModele.find(query);
    //         }

    //         else if (modelName === 'brand') {
    //             query = { name: { $regex: this.queryString.keyword, $options: 'i' } };
    //             this.mongooseQuery = brandModel.find(query);
    //         }
    //         else if (modelName === 'category') {
    //             query = { name: { $regex: this.queryString.keyword, $options: 'i' } };
    //             this.mongooseQuery = categoryModle.find(query);
    //         }
    //         else if (modelName === 'subCategory') {
    //             query = { name: { $regex: this.queryString.keyword, $options: 'i' } };
    //             this.mongooseQuery = subCategoryModele.find(query);
    //         }
    //         else if (modelName === 'user') {
    //             query = { name: { $regex: this.queryString.keyword, $options: 'i' } };
    //             this.mongooseQuery = userModel.find(query);
    //         }
    //         else if (modelName === 'review') {
    //             query = { name: { $regex: this.queryString.keyword, $options: 'i' } };
    //             this.mongooseQuery = reviewsModel.find(query);
    //         }

    //         else {
    //             query = { name: { $regex: this.queryString.keyword, $options: 'i' } };
    //             this.mongooseQuery = this.mongooseQuery.find(query);
    //         }


    //     }
    //     return this;
    // }



    paginate(countDocuments) {
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 50;
        const skip = (page - 1) * limit;
        const endIndex = page * limit;

        // Pagination result
        const pagination = {};
        pagination.currentPage = page;
        pagination.limit = limit;
        pagination.numberOfPages = Math.ceil(countDocuments / limit);

        // next page
        if (endIndex < countDocuments) {
            pagination.next = page + 1;
        }
        if (skip > 0) {
            pagination.prev = page - 1;
        }
        this.mongooseQuery = this.mongooseQuery.skip(skip).limit(limit);

        this.paginationResult = pagination;
        return this;
    }
}

module.exports = ApiFeatures;



