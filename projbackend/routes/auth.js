const express = require("express");
const router = express.Router();
const { check, validationResult } = require('express-validator');
const {signout, signup, signin, isSignedIn} = require("../controllers/auth")

/**
 * References
 * routing :- https://expressjs.com/en/guide/routing.html
 */
router.post("/signup",[
    check("name").isLength({min:3}).withMessage('Name must be at least 3 chars long'),
    check("email").isEmail().withMessage('Email is required'),
    check("password").isLength({min: 8}).withMessage('Password should be at least 8 char'),
] , signup);

router.post("/signin",[
    check("email").isEmail().withMessage('Email is required'),
    check("password").isLength({min: 8}).withMessage('Password field is required'),
] , signin);

//For Testing Purpose
// router.get("/testroute",isSignedIn, (req, res) =>{
//     res.send("A protected route")
// })


router.get("/signout", signout);

module.exports = router;