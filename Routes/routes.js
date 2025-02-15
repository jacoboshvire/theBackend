const express = require("express"),
    Joi = require("joi"),
    Portfilio = require("../models/Portfilio.js"),
    cloudinary = require("../utils/cloudinary.js"),
    upload = require("../utils/mutler.js")

// setting router to router
const router = express.Router()

router.use(express.json());

// the routers for the api    


/*other router
===================================*/

router.get("/", (req, res) => {
    Portfilio.find().then((Portfilio) => {
        res.status(200).json({ Portfilio })
    }).catch(e => {
        res.status(500).json({ Error })
        console.log(Error)
    })

})

// for the veiw page
router.get("/:_id", (req, res) => {
    // find post by id
    Portfilio.findById(req.params._id).then((foundPortfilio) => {
        // display post found with that id
        res.status(200).json({ foundPortfilio })
    }).catch(e => {
        res.status(404).json({ Error }) //handling error
    })

})

// post route
router.post("/", (req, res) => {
    //paramsing the data to create new one
    const portifiliois = {
        name: req.body.name,
        Link: req.body.Link,
        description: req.body.description,
    };

    // variable for error
    let result

    //creating new portfilios
    const portfilio = new Portfilio(portifiliois)

    // error validation
    const schema = Joi.object({
        name: Joi.string().min(2).required(),
        Link: Joi.string().uri().label("site").required().allow(''),
        description: Joi.string().min(200).max(3000).required()
    });

    //setting result to the schema for the error validation above
    result = schema.validate(req.body);


    if (!result.error || e) {    //checking for error in the newing created post
        portfilio.save()    //if no error save the post to monogodb
        return res.status(200).json({ portfilio })
    } else {
        console.log(result)
        console.log(e.massege)
        // error message
        return res.status(400).json(result.error.details[0].message);
    }

})

//updating the post route
// =======================================
router.put("/:_id", (req, res) => {
    const portifilios = Portfilio.findById(req.body.params)
    if (!portifilios) return res.status(404).send("you have entered a wrong page")

    const schema = Joi.object({
        name: Joi.string().min(2).required(),
        Link: Joi.string().uri().label("site").required().allow(''),
        description: Joi.string().min(200).max(3000).required()
    });

    const result = schema.validate(req.body);
    console.log(result)

    if (result.error) {
        res.status(400).json(result.error.details[0].message);
        return;
    }

    /*update the portfilio
    // =========================================*/
    // portifilios.name = req.body.name;
    // portifilios.Link = req.body.Link;
    // portifilios.description = req.body.description;

    Portfilio.findByIdAndUpdate(req.params._id, req.body).then((portifilios, result) => {
        // resend the updated portfilio
        // =========================================
        res.status(200).json({ portifilios })
    })
        .catch((e) => {
            res.status(500).json(e.message)
        })


})

// delete router for portfilio
router.delete('/:_id', (req, res) => {
    // find the portfilio
    const portifilios = Portfilio.findById(req.params._id)

    //if the post is not existing return 404 error
    if (!portifilios) return res.status(404).send("you have entered a wrong page")

    //delete the portfilio if it exist
    Portfilio.findByIdAndDelete(req.params._id).then((portifiliois) => {
        return res.status(200).json({
            //return success message
            "success": "portfilio has being successfully deleted",
            portifiliois
        });
    }).catch(e => res.status(400).json(e.message))


})

// exporting router
module.exports = router