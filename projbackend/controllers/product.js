const Product = require("../models/product")
const formidable = require("formidable")
const _ = require("lodash")
const fs = require("fs")


exports.getProductById = (req, res, next, id) =>{
    Product.findById(id)
        .populate("category")
        .exec((err, product) => {
            if(err){
                return res.status(400).json({
                    error: "product not found"
                })
            }
            req.product = product;
            next()
        })
}

exports.createProduct = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, file) =>{
        if(err){
            return res.status(400).json({
                error: "Problem with image"
            });
        }

        //destructure the field
        const {name, price, description, category, stock} = fields

        //Restrictions on fields
        if(!name || !price || !description || !category || !stock){
            return res.status(400).json({
                error: "Please include all fields"
            })
        }
        
        //creating new product
        let product = new Product(fields)

        //handle file here
        if(file.photo){
            if(file.photo.size > 3000000){
                return res.status(400).json({
                    error: "File is too big"
                })
            }
            product.photo.data = fs.readFileSync(file.photo.path)
            product.photo.contentType = file.photo.type
        }
        //save to the DB
        product.save((err, product) => {
            if(err){
                return res.status(400).json({
                    error: "Failed to save in database"
                })
            }
            res.json(product)
        })

    })
}

exports.getProduct = (req, res) => {
    req.product.photo = undefined
    return res.json(req.product)
}

exports.photo = (req, res, next) => {
    if(req.product.photo.data){
        res.set("Content-Type", req.product.photo.contentType)
        return res.send(req.product.photo.data)
    }
}

//delete controller
exports.deleteProduct = (req, res) => {
    let product = req.product
    product.remove((err, deletedProduct)=> {
        if(err){
            return res.status(400).json({
                error: "Failed to delete product"
            })
        }res.json({
            message: `Product deleted successfully ${deletedProduct}`
        })
    })

}

//update controller
exports.updateProduct = (req, res) => {
    
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, file) =>{
        if(err){
            return res.status(400).json({
                error: "Problem with image"
            });
        }
        
        //updating product
        let product = req.product
        product = _.extend(product, fields)


        //handle file here
        if(file.photo){
            if(file.photo.size > 3000000){
                return res.status(400).json({
                    error: "File is too big"
                })
            }
            product.photo.data = fs.readFileSync(file.photo.path)
            product.photo.contentType = file.photo.type
        }
        //save to the DB
        product.save((err, product) => {
            if(err){
                return res.status(400).json({
                    error: "Failed to save in database"
                })
            }
            res.json(product)
        })

    })
    
}

// refer to video 09.Get all products in the section 10 
exports.getAllProducts =(req, res) => {
    let limit = req.query.limit ? parseInt(req.query.limit) : 8
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
    Product.find()
    .select("-photo")
    .populate("category")
    .sort([[sortBy, "asc"]])
    .limit(limit) 
    .exec((err, products) =>{
        if(err){
            return res.status(400).json({
                error: "No Product Found"
            })
        }res.json(products)
    })
}

exports.updateStock = (req, res, next) => {
    let myOperations = req.body.order.product.map(prod => {
        return {
            updateOne: {
                filter: {_id: prod._id},
                update: {$inc: {stock: -prod.count, sold: +prod.count}}
            }
        }
    })
    Product.bulkWrite(myOperations, {}, (err, products) => {
        if(err){
            return res.status(400).json({
                error: "Bulkwrite failed"
            })
        }next()
    })
}

// for more explaination on getAllUniqueCategories refer to video no.11 from section 10
exports.getAllUniqueCategories = (req, res) => {
    Product.distinct("catrgory", {}, (err, category) => {
        if(err){
            return res.status(400).json({
                error: "No Category found"
            });
        }
        res.json(category)
    })
}