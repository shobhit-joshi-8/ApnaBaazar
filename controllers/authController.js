const { hashPassword, comparePassword } = require('../helpers/authHelper');
const userModel = require('../models/userModel');
const JWT = require('jsonwebtoken');

//USER REGISTER CONTROLLER
const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address, answer } = req.body;

        //VALIDATIONS
        if (!name) {
            return res.status(400).send({
                success: false,
                message: "Name is required",
            })
        }

        if (!email) {
            return res.status(400).send({
                success: false,
                message: "Email is required",
            })
        }

        if (!password) {
            return res.status(400).send({
                success: false,
                message: "Password is required",
            })
        }

        if (!phone) {
            return res.status(400).send({
                success: false,
                message: "Phone is required",
            })
        }

        if (!address) {
            return res.status(400).send({
                success: false,
                message: "Address is required",
            })
        }

        if (!answer) {
            return res.status(400).send({
                success: false,
                message: "Answer is required",
            })
        }

        //CHECK USER
        const existingUser = await userModel.findOne({ email });

        //EXISTING USER
        if (existingUser) {
            return res.status(200).send({
                success: false,
                message: "User already registered"
            });
        }

        //REGISTER USER
        const hashedPassword = await hashPassword(password);

        //SAVE
        const user = await new userModel({ name, email, phone, address, password: hashedPassword, answer }).save();

        return res.status(201).send({
            success: true,
            message: "User registered successfully",
            user
        })

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error in Register API",
            error
        })
    }
}

//LOGIN CONTROLLER
const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        //VALIDATIONS
        if (!email) {
            return res.status(400).send({
                success: false,
                message: "Email is required",
            })
        }

        if (!password) {
            return res.status(400).send({
                success: false,
                message: "Password is required",
            })
        }

        //CHECK USER
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Invalid credentials",
            });
        }

        const match = await comparePassword(password, user.password);

        if (!match) {
            return res.status(200).send({
                success: false,
                message: "Invalid credentials",
            });
        }

        //TOKEN
        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: "7d" });

        return res.status(200).send({
            success: true,
            message: "User Login Successfully",
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role,
            },
            token,
        })


    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error in Login API",
        })
    }
}

//TEST CONTROLLER
const testController = async (req, res) => {
    try {
        return res.status(200).send({
            success: true,
            message: "Protected Route",
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: "Error in test API",
        })
    }
}

//FORGOT PASSWORDCONTROLLER
const forgotPasswordController = async (req, res) => {
    try {
        const { email, answer, newPassword} = req.body;

        //VALIDATIONS
        if (!email) {
            return res.status(400).send({
                success: false,
                message: "Email is required",
            })
        }

        if (!answer) {
            return res.status(400).send({
                success: false,
                message: "Answer is required",
            })
        }

        if (!newPassword) {
            return res.status(400).send({
                success: false,
                message: "New Password is required",
            })
        }

        //CHECK
        const user = await userModel.findOne({email, answer});

        if(!user){
            res.status(404).send({
                success: false,
                message: "Wrong email or answer",
            })
        }

        const hashed = await hashPassword(newPassword);
        await userModel.findByIdAndUpdate(user._id, {password: hashed});
        res.status(200).send({
            success: true,
            message: "Password reset successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Forgot password API"
        })
    }
}

module.exports = { registerController, loginController, testController, forgotPasswordController };