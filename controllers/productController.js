const slugify = require("slugify");
const productModel = require("../models/productModel");
const categoryModel = require("../models/categoryModel");

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
            product.photo.ContentType = photo.type;
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

//GET SINGLE PRODUCT CONTROLLER
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

// GET PRODUCT PHOTO CONTROLLER
const getProductPhotoController = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.pid).select("photo");

        if (product.photo.data) {
            res.set('Content-type', product.photo.contentType)
            return res.status(200).send(product.photo.data)
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error in get Product Photo API"
        })
    }
}

// DELETE PRODUCT CONTROLLER
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

// UPDAT EPRODUCT CONTROLLER
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

        const product = await productModel.findByIdAndUpdate(req.params.pid, { ...req.fields, slug: slugify(name) }, { new: true })

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

// FILTER PRODUCT CONTROLLER
const filterProductController = async (req, res) => {
    try {
        const { categories, priceRange } = req.body;
        let args = {};
        if (categories.length > 0) {
            args.category = categories;
        }
        if (priceRange?.length) {
            args.price = { $gte: priceRange[0], $lte: priceRange[1] }
        }

        const products = await productModel.find(args).populate("category").select("-photo");

        return res.status(200).send({
            success: true,
            message: "All Filtered products",
            total: products.length,
            products
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error in filter product API",
        })
    }
}

const productCountController = async (req, res) => {
    try {
        const total = await productModel.find({}).estimatedDocumentCount();
        return res.status(200).send({
            success: true,
            message: "Total count fetched successfully",
            total
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error in Product count API"
        })
    }
}

//PRODUCT LIST BASED ON PAGE
const productListController = async (req, res) => {
    try {
        const perPage = 3;
        const page = req.params.page ? req.params.page : 1;
        const total = await productModel.find({}).countDocuments();
        const products = await productModel.find({}).select("-photo").skip((page - 1) * perPage).limit(perPage).sort({ createdAt: -1 });

        return res.status(200).send({
            success: true,
            totalProducts: total,
            productOnPage: products.length,
            message: "List of products",
            products,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error in Product per page API"
        })
    }
}

const searchProductController = async (req, res) => {
    try {
        const { keyword } = req.params;

        const results = await productModel.find({
            $or: [
                { name: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } }
            ]
        }).select("-photo");

        res.status(200).send({
            success: true,
            productFound: results.length,
            products: results
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error in Search Product API"
        })
    }
}

const similarProductController = async (req, res) => {
    try {
        const { pid, cid } = req.params;

        const products = await productModel.find({
            category: cid,
            _id: { $ne: pid },
        }).select("-photo").limit(4).populate("category");
        res.status(200).send({
            success: true,
            total: products?.length,
            message: "Similar products List",
            products,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error in Similar Product API"
        })
    }
}

const getProductsByCategoryController = async (req, res) => {
    try {
        const params = req.params;
        const category = await categoryModel.findOne({ slug: params.slug });
        const products = await productModel.find({ category }).populate("category").select("-photo");

        return res.status(200).send({
            success: true,
            total: products.length,
            message: "Products found successfull",
            category,
            products,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error in Similar Product API"
        })
    }
}

module.exports = { createProductController, getAllProductController, getProductController, getProductPhotoController, deleteProductController, updateProductController, filterProductController, productCountController, productListController, searchProductController, similarProductController, getProductsByCategoryController };