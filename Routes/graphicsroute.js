const express = require("express"),
    Joi = require("joi"),
    Portfilio = require("../models/Portfilio.js"),
    cloudinary = require("../utils/cloudinary.js"),
    upload = require("../utils/mutler.js")

// setting router to router
const router = express.Router()

router.use(express.json());

// the routers for the api 

// exporting router
module.exports = router