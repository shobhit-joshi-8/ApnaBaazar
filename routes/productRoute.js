const express = require('express');
const { requireSignIn, isAdmin } = require('../middlewares/authMiddleware');
const { createProductController, getAllProductController, getProductController, getProductPhotoController, deleteProductController, updateProductController } = require('../controllers/productController');
const formidable = require('express-formidable');

const router = express.Router();

//ROUTES
//CREATE PRODUCT
router.post('/create-product', requireSignIn, isAdmin, formidable(), createProductController);

//GET ALL PRODUCTS
router.get('/get-allProducts', getAllProductController);

//GET SINGLE PRODUCT
router.get('/get-product/:slug', getProductController);

//GET PRODUCT PHOTO
router.get('/get-product-photo/:pid', getProductPhotoController)

//DELETE PRODUCT
router.delete('/delete-product/:pid', requireSignIn, isAdmin, deleteProductController);

//UPDATE PRODUCT
router.put('/update-product/:pid', requireSignIn, isAdmin, formidable(), updateProductController);

module.exports = router;