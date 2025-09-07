const express = require('express');
const { requireSignIn, isAdmin } = require('../middlewares/authMiddleware');
const { createProductController, getAllProductController, getProductController, getProductPhotoController, deleteProductController, updateProductController, filterProductController, productCountController, productListController, searchProductController, similarProductController, getProductsByCategoryController } = require('../controllers/productController');
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

//FILTER PRODUCT
router.post('/filter-product', filterProductController);

//PRODUCT COUNT
router.get('/product-count', productCountController );

//PRODUCT PER PAGE
router.get('/product-list/:page', productListController);

//SEARCH PRODUCT
router.get('/search-product/:keyword', searchProductController)

//SIMILAR PRODUCT
router.get('/similar-products/:pid/:cid', similarProductController);

//FETCH PRODUCT BY CATEGORY
router.get('/product-category/:slug', getProductsByCategoryController)

module.exports = router;