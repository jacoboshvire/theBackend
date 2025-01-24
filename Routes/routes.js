const express = require("express");

// setting router to router
const router = express.Router()


const portifilio = [
    { name: "giftedhand", link: "gifthand.com", description: "this was goated site trust me", id: 1 },
    { name: "newLink", link: "newLink.com", description: "new Link is great that a great site", id: 2 },
    { name: "something", link: "something.com", description: "i got something for you just guest it? 😉", id: 3 },
]

// the routers for the api


/*other router
===================================*/

router.get("/", (req, res) => {
    res.send(portifilio)
})

// for the veiw page
router.get("/:id", (req, res) => {
    const portifilios = portifilio.find(c => c.id == parseInt(req.params.id))
    if (!portifilios) res.status(404).send("you have entered a wrong page")
    res.send(portifilios)
})

// post route
router.post("/", (req, res) => {

    const schema = Joi.object({
        name: Joi.string().min(2).required(),
        Link: Joi.string().uri().label("site").required().allow(''),
        description: Joi.string().min(200).max(3000).required()
    });

    const result = schema.validate(req.body);
    console.log(result)

    if (result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
    }
    //variable for the date 
    let now = new Date();
    let day = now.getDay();
    let month = now.getMonth();
    let year = now.getFullYear();
    // date object
    const datenow = `${day}\ ${month}\ ${year}`;
    const portifiliois = {
        id: portifilio.length + 1,
        name: req.body.name,
        Link: req.body.Link,
        description: req.body.description,
        date: datenow
    };
    portifilio.push(portifiliois);
    res.send(portifilio)
})

//updating the post route
// =======================================
router.put("/:id", (req, res) => {
    const portifilios = portifilio.find(c => c.id == parseInt(req.params.id))
    if (!portifilios) return res.status(404).send("you have entered a wrong page")

    const schema = Joi.object({
        name: Joi.string().min(2).required(),
        Link: Joi.string().uri().label("site").required().allow(''),
        description: Joi.string().min(200).max(3000).required()
    });

    const result = schema.validate(req.body);
    console.log(result)

    if (result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
    }

    //variable for the date 
    let now = new Date();
    let day = now.getDay();
    let month = now.getMonth();
    let year = now.getFullYear();
    // date object
    const datenow = `edited ' ${day}\ ${month}\ ${year}'`;

    /*update the portfilio
    =========================================*/
    portifilios.name = req.body.name;
    portifilios.Link = req.body.Link;
    portifilios.description = req.body.description;
    portifilios.date = datenow

    // resend the updated portfilio
    // =========================================
    res.send(portifilios)
})

// delete router for portfilio
router.delete('/:id', (req, res) => {
    // find the portfilio
    const portifilios = portifilio.find(c => c.id == parseInt(req.params.id))

    //if the post is not existing return 404 error
    if (!portifilios) return res.status(404).send("you have entered a wrong page")

    //delete the portfilio if it exist
    const index = portifilio.indexOf(portifilios);
    portifilio.splice(index, 1);

    //back to portfilios
    res.send(portifilio)

})

// exporting router
module.exports = router