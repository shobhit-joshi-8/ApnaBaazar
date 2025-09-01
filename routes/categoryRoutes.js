const express = require('express');
const { requireSignIn, isAdmin } = require('../middlewares/authMiddleware');
const { createCategoryController, updateCategoryController, getAllCategoriesController, getSingleCategoryController, deleteCategoryController } = require('../controllers/categoryController');

const router = express.Router();

//ROUTES
//CREATE CATEGORY
router.post('/create-category', requireSignIn, isAdmin, createCategoryController);

//UPDATE CATEGORY
router.put('/update-category/:id', requireSignIn, isAdmin, updateCategoryController);

//GET ALL CATEGORY
router.get('/all-categories', getAllCategoriesController);

//GET SINGLE CATEGORY
router.get('/single-category/:slug', getSingleCategoryController);

//DELETE CATEGORY
router.delete('/delete-category/:id', requireSignIn, isAdmin, deleteCategoryController);


module.exports = router;