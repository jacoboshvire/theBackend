const express = require("express"),
    Joi = require("joi"),
    Uidesign = require("../models/uidesign.js"),
    cloudinary = require("../utils/cloudinary.js"),
    upload = require("../utils/mutler.js"),
    path = require("path")

// setting router to router
const router = express.Router()

router.use(express.json());

// the routers for the api 

router.get("/", (req, res) => {
    Uidesign.find().then((Uidesign) => {
        res.status(200).json({ Uidesign })
    }).catch(e => {
        res.status(500).json(e.message)
    })
})

// post routes for graphic 
//---------------------------------------------

router.post("/", upload.single("image"), async (req, res) => {
    //connecting to cloudinary
    const fileresult = await cloudinary.uploader.upload(req.file.path)
    const arraytool = req.body.tools.split(",")

    //paramsing the data to create new one
    const uidesigns = {
        name: req.body.name,
        description: req.body.description,
        figmalink: req.body.figmalink,
        image: fileresult.secure_url, //image = file secure url at cloudinary
        imagewidth: fileresult.width,
        imageheight: fileresult.height,
        tools: arraytool
    };

    // variable for error
    let result

    //creating new portfilios
    const uidesign = new Uidesign(uidesigns)

    // error validation
    const schema = Joi.object({
        name: Joi.string().min(2).required(),
        description: Joi.string().min(200).max(3000).required(),
        image: Joi.string(),
        tools: Joi.string(),
        figmalink: Joi.string().uri().label("figma link").required().allow(''),
    });

    //setting result to the schema for the error validation above
    result = schema.validate(req.body);
    if (result.error) {
        return res.status(400).json(result.error.details[0].message);
    };


    if (!uidesigns.image.match(/\.(jpg|jpeg|png|gif|dmp|webp|ico|tiff|xbm|tif|pjp|pjpeg|jfif)$/i)) {    //checking for error in the newing created post

        // error message
        return res.status(400).json({
            "error": "file type don't match"
        })

    }


    uidesign.save().then((uidesign) => {
        return res.status(200).json({ uidesign })
    })    //if no error save the post to monogodb
        .catch((e) => {
            return res.status(400).json(e.message)
        })
})

// find by id
// ------------------------------------------------
router.get("/:_id", (req, res) => {
    // find post by id
    Uidesign.findById(req.params._id).then((foundUidesign) => {
        // display post found with that id
        res.status(200).json({ foundUidesign })

    }).catch(e => {
        res.status(404).json({ Error }) //handling error
    })

});


// delete by id
//-------------------------------------------------
router.delete('/:_id', (req, res) => {
    // find the portfilio
    const uidesigns = Uidesign.findById(req.params._id)

    //if the post is not existing return 404 error
    if (!uidesigns) return res.status(404).send("you have entered a wrong page")

    //delete the portfilio if it exist
    Uidesign.findByIdAndDelete(req.params._id).then((uidesigns) => {
        return res.status(200).json({
            //return success message
            "success": "portfilio has being successfully deleted",
            uidesigns
        });
    }).catch(e => res.status(400).json(e.message))


})


// exporting router
module.exports = router