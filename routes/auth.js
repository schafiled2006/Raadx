const express = require("express");
const router = express.Router();

const userController = require("../controllers/auth");

router
    .route("/register").
    post(userController.register);

router
    .route("/login").
    post(userController.login);

router
    .route("/profile").
    get(userController.getOne);

module.exports = router;