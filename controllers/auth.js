const { log } = require("node:console");
const userModel = require("../models/user");
const registerValidator = require("../validators/register");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    const validatorResult = registerValidator(req.body);

    if (validatorResult !== true) {
        return res.status(422).json(validatorResult);
    }

    const { name, email, password } = req.body;

    const userExists = await userModel.findOne({ email });

    if (userExists) {
        return res.status(422).json({ message: "this email is already in use !" });
    }

    const hashedPass = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        name,
        email,
        password: hashedPass
    });

    const userOBJ = user.toObject();
    Reflect.deleteProperty(userOBJ, "password");

    const accessToken = await jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "30d" });

    return res.status(201).json({ userOBJ, accessToken })
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
        return res.status(409).json({ message: "email not found !" });
    }

    const passwordValid = await bcrypt.compare(password, user.password);

    if (!passwordValid) {
        return res.status(409).json({ message: "password is invalid !" });
    }

    const userOBJ = user.toObject();
    Reflect.deleteProperty(userOBJ, "password");

    const accessToken = await jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "30d" });

    return res.status(200).json({ userOBJ, accessToken });
};

exports.getOne = async (req, res) => {
    const authHeader = req.headers.authorization;

    const token = authHeader.split(" ")[1];

    const payload = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findOne({ _id: payload.id }, "-password");

    return res.status(200).json({ user })
};