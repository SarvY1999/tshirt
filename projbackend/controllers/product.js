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
                    error: "Filed to save in database"
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