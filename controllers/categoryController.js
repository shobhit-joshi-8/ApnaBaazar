const categoryModel = require("../models/categoryModel");
const slugify = require('slugify');

// CREATE CATEGORY CONTROLLER
const createCategoryController = async (req, res) => {
    try {
        const { name } = req.body;

        // VALIDATION
        if (!name) {
            return res.status(400).send({
                success: false,
                message: "Name is required",
            })
        }

        const existingCategory = await categoryModel.findOne({ name });

        if (existingCategory) {
            return res.status(200).send({
                success: false,
                message: "Category Already exists",
            })
        }

        const newCategory = await new categoryModel({ name, slug: slugify(name) }).save();
        return res.status(201).send({
            success: true,
            message: "Category created successfully",
            newCategory
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in create category API",
        })
    }
}

//UPDATE CATEGORY CONTROLLER
const updateCategoryController = async (req, res) => {
    try {
        const { name } = req.body;
        const { id } = req.params;
        const category = await categoryModel.findByIdAndUpdate(id, { name, slug: slugify(name) }, { new: true });

        return res.status(200).send({
            success: true,
            message: "Category Updated successfully"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error in update category API",
        })
    }
}

//GET ALL CATEGORIES CONTROLLER
const getAllCategoriesController = async (req, res) => {
    try {
        const categories = await categoryModel.find({});
        return res.status(200).send({
            success: true,
            message: "All categories lists",
            categories,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error in get all category API",
        })
    }
}

//GET SINGLE CATEGORY
const getSingleCategoryController = async (req, res) => {
    try {
        const category = await categoryModel.findOne({ slug: req.params.slug });
        if (!category) {
            return res.status(404).send({
                success: false,
                message: "Category not found"
            })
        }
        return res.status(200).send({
            success: true,
            message: "Get single category successfull",
            category,
        })

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error in get single category API",
        })
    }
}

//DELETE CATEGORY CONTROLLER
const deleteCategoryController = async (req, res) => {
    try {
        const { id } = req.params;
        await categoryModel.findByIdAndDelete(id);

        return res.status(200).send({
            success: false,
            message: "Category deleted successfully",
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error in delete category API",
        })
    }
}

module.exports = { createCategoryController, updateCategoryController, getAllCategoriesController, getSingleCategoryController, deleteCategoryController };