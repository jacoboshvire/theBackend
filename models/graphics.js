const mongoose = require("mongoose");

const graphicSchema = new mongoose.Schema({
    name: String,
    image: String,
    imagewidth: Number,
    imageheight: Number,
    description: String,
    tools: {
        type: Array,
        dafault: [""]
    },
    date: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model("graphics", graphicSchema);