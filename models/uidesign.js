const mongoose = require("mongoose");

const uidesignSchema = new mongoose.Schema({
    name: String,
    description: String,
    imagewidth: Number,
    imageheight: Number,
    image: String,
    figmalink: String,
    tools: {
        type: Array,
        default: [""]
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("uidesign", uidesignSchema)