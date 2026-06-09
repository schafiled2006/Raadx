const mongoose = require("mongoose");
const app = require("./app");
const { log } = require("node:console");
require("dotenv").config();

const port = process.env.PORT;

(async () => {
    mongoose.connect(process.env.MONGO_URL);
    console.log("database connected");
})()

app.listen(port, () => {
    console.log(`srver runnin on port ${port}`);
})
