const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

const Product = require("../../models/product");

// @route GET api/products
// @desc Test route
// @access Public

http://localhost:8070/product/add

router.route("/add").post((req,res)=>{
    const name = req.body.name;
    const brand = req.body.brand;
    const model = req.body.model;
    const description = req.body.description;
    const price = Number(req.body.price);
    const stock = Number(req.body.stock);


    const newProduct = new Product({
        name,
        brand,
        model,
        description,
        price,
        stock
    })
    newStudent.save().then(()=>{
        res.json("Product Added Successfully !")
    }).catch((err)=>{
        console.log(err);
    })
})


router.get('/', (req, res) => res.send('Products route'));
[
    check("name", "Product name is required!").not().isEmpty(),
    check("brand", "Product brand is required!").not().isEmpty(),
    check("model","Product model is required!").not().isEmpty(),
    check("description","Product description is required!").not().isEmpty(),
    check("price","Product price is required!").not().isEmpty(),
],


module.exports = router;