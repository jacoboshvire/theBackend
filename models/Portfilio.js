const mongoose = require("mongoose");

const portfilioschema = new mongoose.Schema({
    name: String,
    Link: String,
    description: String,
    tools: {
        type: Array,
        default: []
    },
    image: String,
    imagewidth: Number,
    imageheight: Number,
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Portfilio", portfilioschema)