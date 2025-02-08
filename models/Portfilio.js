const mongoose = require("mongoose");

const portfilioschema = new mongoose.Schema({
    name: String,
    Link: String,
    description: String,
    image: String,
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Portfilio", portfilioschema)