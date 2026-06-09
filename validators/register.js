const Validator = require("fastest-validator");
const V = new Validator();

const schema = {
    name: {
        type: "string",
        min: 3,
        max: 12
    },
    email: {
        type: "string",
    },
    password: {
        type: "string",
        min: 8,
    },
    $$strict: true
};

const check = V.compile(schema);

module.exports = check;
