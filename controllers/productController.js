const slugify = require("slugify");
const productModel = require("../models/productModel");
const fs = require('fs');

//CREATE PRODUCT CONTROLLER
const createProductController = async (req, res) => {
    try {
        const { name, slug, description, price, category, quantity, shipping } = req.fields;
        const { photo } = req.files;

        if (!name) {
            return res.status(400).send({
                success: false,
                message: "Name is Required",
            });
        } else if (!description) {
            return res.status(400).send({
                success: false,
                message: "Description is Required",
            });
        } else if (!price) {
            return res.status(400).send({
                success: false,
                message: "Price is Required",
            });
        } else if (!category) {
            return res.status(400).send({
                success: false,
                message: "Category is Required",
            });
        } else if (!quantity) {
            return res.status(400).send({
                success: false,
                message: "Quantity is Required",
            });
        } else if (photo && photo.size > 1000000) {
            return res.status(400).send({
                success: false,
                message: "Photo is required and should be less than 1MB",
            });
        }

        const product = new productModel({ ...req.fields, slug: slugify(name) });

        if (photo) {
            product.photo.data = fs.readFileSync(photo.path);
            product.photo.contentType = photo.type;
        }

        await product.save();
        return res.status(201).send({
            success: true,
            message: "Product created successfully",
            product
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error in create product API",
        })
    }
}

//GET ALL PRODUCT CONTROLLER
const getAllProductController = async (req, res) => {
    try {
        const allProducts = await productModel.find({}).populate("category").select("-photo").limit(12).sort({ createdAt: -1 });

        if (!allProducts) {
            return res.status(404).send({
                success: false,
                message: "No product found",
            })
        }

        return res.status(200).send({
            success: true,
            total: allProducts.length,
            message: "Get all products successfull",
            allProducts,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in get all products API",
        })
    }
}

const getProductController = async (req, res) => {
    try {
        const product = await productModel.findOne({ slug: req.params.slug }).select("-photo").populate("category");

        if (!product) {
            return res.status(404).send({
                success: true,
                message: "Product not found",
            })
        }
        else {
            return res.status(200).send({
                success: true,
                message: "Get single product",
                product
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in get product API",
        })
    }
}

const getProductPhotoController = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.pid).select("photo");

        console.log(product)

        if (product.photo.data) {
            res.set('Content-type', product.photo.contentType)
            return res.status(200).send({
                success: true,
                message: "Product photos",
                photos: product.photo.data,
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error in get Product Photo API"
        })
    }
}

const deleteProductController = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.pid);

        if (!product) {
            return res.status(404).send({
                success: false,
                message: "Product Not found"
            })
        }

        await productModel.findByIdAndDelete(req.params.pid).select("-photo");

        return res.status(200).send({
            success: true,
            message: "Product deleted successfully"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error in delete product API"
        })
    }
}

const updateProductController = async (req, res) => {
    try {
        const { name, slug, description, price, category, quantity, shipping } = req.fields;
        const { photo } = req.files;

        if (!name) {
            return res.status(400).send({
                success: false,
                message: "Name is Required",
            });
        } else if (!description) {
            return res.status(400).send({
                success: false,
                message: "Description is Required",
            });
        } else if (!price) {
            return res.status(400).send({
                success: false,
                message: "Price is Required",
            });
        } else if (!category) {
            return res.status(400).send({
                success: false,
                message: "Category is Required",
            });
        } else if (!quantity) {
            return res.status(400).send({
                success: false,
                message: "Quantity is Required",
            });
        } else if (photo && photo.size > 1000000) {
            return res.status(400).send({
                success: false,
                message: "Photo is required and should be less than 1MB",
            });
        }

        const product = await productModel.findByIdAndUpdate(req.params.pid, {...req.fields, slug: slugify(name)}, {new: true})

        if (photo) {
            product.photo.data = fs.readFileSync(photo.path);
            product.photo.contentType = photo.type;
        }

        await product.save();
        return res.status(201).send({
            success: true,
            message: "Product updated successfully",
            product
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error in update product API"
        })

    }
}

module.exports = { createProductController, getAllProductController, getProductController, getProductPhotoController, deleteProductController, updateProductController };