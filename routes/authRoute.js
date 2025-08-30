const express = require('express');
const { registerController, loginController, testController, forgotPasswordController } = require('../controllers/authController');
const { requireSignIn, isAdmin } = require('../middlewares/authMiddleware');

//ROUTER OBJECT
const router = express.Router();

//ROUTING
// REGISTER || METHOD POST
router.post('/register', registerController)

//LOGIN || POST
router.post('/login', loginController);

//FORGOT PASSWORD || POST
router.post('/forgot-password', forgotPasswordController)

//TEST
router.get('/test', requireSignIn, isAdmin, testController);

//PROTECTED ROUTE AUTH
router.get('/user-auth', requireSignIn, (req, res) => {
    res.status(200).send({ ok: true });
})

module.exports = router;
