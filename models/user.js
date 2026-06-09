const mongoose = require("mongoose");
const { timeStamp } = require("node:console");
const { type } = require("node:os");

const schema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
}, { timestamps: true });

const userModel = mongoose.model("User", schema);

module.exports = userModel;