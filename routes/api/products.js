const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const Product = require("../../models/product");
const product = require("../../models/product");

// @route   POST api/products/add
// @desc    Add a new product
// @access  Public
router.post(
  "/add",
  [
    check("name", "Product name is required").not().isEmpty(),
    check("category", "Product category is required").not().isEmpty(),
    check("brand", "Product brand is required").not().isEmpty(),
    check("model", "Product model is required").not().isEmpty(),
    check("description", "Product description is required").not().isEmpty(),
    check("price", "Product price must be a number").isNumeric(),
    check("stock", "Product stock must be a number").isNumeric(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { name, category, brand, model, description, price, stock, date } = req.body;

      const newProduct = new Product({
        name,
        category,
        brand,
        model,
        description,
        price,
        stock,
        date,
      });

      await newProduct.save();
      res.json({ message: "Product added successfully", product: newProduct });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

//get single product from the database

router.get("/get/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);

    if (!product) {
      // If product with the given ID is not found
      return res.status(404).json({ status: "Product not found" });
    }

    // If product is found, return it in the response
    res.status(200).json({ status: "Product Fetched", product: product });
  } catch (err) {
    // Handle errors during product retrieval
    console.error(err.message);
    res.status(500).json({ status: "Error with getting product" });
  }
});

// @route   GET api/products
// @desc    Get all products
// @access  Public
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/products/update/:id
// @desc    Update a product by ID
// @access  Public
router.put("/update/:id", async (req, res) => {
  try {
    const { name, category, brand, model, description, price, stock, date } = req.body;
    const productId = req.params.id;

    const updatedProduct = {
      name,
      category,
      brand,
      model,
      description,
      price,
      stock,
      date,
    };

    const product = await Product.findByIdAndUpdate(productId, updatedProduct, {
      new: true,
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product updated successfully", product });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   DELETE api/products/delete/:id
// @desc    Delete a product by ID
// @access  Public
router.delete("/delete/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/products/feedback
// @desc    PUT a product feedback
// @access  Private

router.put('/addstock/:productId', async (req, res) => {
  const { productId } = req.params;
  const { stock } = req.body;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Update the stock and date
    product.stock += stock;
    product.date = Date.now(); // Update date to current timestamp
    const updatedProduct = await product.save();


    res.status(200).json({ message: 'Stock updated successfully', updatedProduct: product });
  } catch (error) {
    console.error('Error updating stock:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.put(
  "/feedback/:id",
  [
    [
      check("userName", "Name is required").not().isEmpty(),
      check("email", "Email is required").not().isEmpty(),
      check("comment", "Feedback is required").not().isEmpty(),
      check("rating", "Rating is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const pID = req.params.id;

    const { userName, email, comment, rating } = req.body;

    const newFeedback = {
      userName,
      email,
      comment,
      rating,
    };

    try {
      const product = await Product.findById(pID);

      product.feedback.unshift(newFeedback);

      await product.save();

      res.json(product);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error!!");
    }
  }
);

// @route   DELETE api/products/:p_ID/feedback:fb_id
// @desc    Delete a product feedback
// @access  Private
router.delete("/feedback/:p_ID/:fb_id", async (req, res) => {
  const pID = req.params.p_ID;

  try {
    const product = await Product.findById(pID);

    // Get remove index of feedback
    const removeIndex = product.feedback
      .map((item) => item.id)
      .indexOf(req.params.fb_id);

    product.feedback.splice(removeIndex, 1);
    await product.save();

    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error!");
  }
});

module.exports = router;
