const JWT = require('jsonwebtoken');
const userModel = require('../models/userModel')

// PROTECTED ROUTES TOKEN BASED
const requireSignIn = async (req, res, next) => {
    try {
        const token = req.headers.authorization;

        if (!token) {
            return res.status(401).send({
                success: false,
                message: "Authorization token is required"
            });
        }

        const decode = JWT.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decode;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).send({
            success: false,
            message: "Invalid or expired token"
        })
    }
}

//ADMIN ACCESS
const isAdmin = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user._id);

        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User Not Found"
            })
        }

        if (user.role !== 1) {
            return res.status(200).send({
                success: false,
                message: "Unauthorize Access",
            })
        } else {
            next();
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error in Admin Middleware"
        })
    }
}

//ADMIN ACCESS
const isUser = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user._id);

        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User Not Found"
            })
        }

        if (user.role !== 0) {
            return res.status(200).send({
                success: false,
                message: "Unauthorize Access",
            })
        } else {
            next();
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error in User Middleware"
        })
    }
}

module.exports = { requireSignIn, isAdmin, isUser };