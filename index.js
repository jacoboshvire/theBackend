// required framework
const Joi = require("joi"),
    express = require("express"),
    app = express(),
    mongoose = require("mongoose")


app.use(express.json());

/**
 * ======================================
 * connecting mongoose to mongodb
 * ======================================
 */
// mongoose.connect("mongodb://localhost/myPortfilio");
// mongoose.Promise = Promise;

const portifilio = [
    { name: "giftedhand", link: "gifthand.com", description: "this was goated site trust me", id: 1 },
    { name: "newLink", link: "newLink.com", description: "new Link is great that a great site", id: 2 },
    { name: "something", link: "something.com", description: "i got something for you just guest it? 😉", id: 3 },
]

// the routers for the api

// home route
// ====================================
app.get("/", function (req, res) {
    res.send("home page");
    console.log("home page")
})

/*other router
===================================*/

app.get("/api/portifilio", (req, res) => {
    res.send(portifilio)
})

// for the veiw page
app.get("/api/portifilio/:id", (req, res) => {
    const portifilios = portifilio.find(c => c.id == parseInt(req.params.id))
    if (!portifilios) res.status(404).send("you have entered a wrong page")
    res.send(portifilios)
})

// post route
app.post("/api/portifilio", (req, res) => {

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
app.put("/api/portifilio/:id", (req, res) => {
    const portifilios = portifilio.find(c => c.id == parseInt(req.params.id))
    if (!portifilios) res.status(404).send("you have entered a wrong page")

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
    const datenow = `edited ' ${day}\ ${month}\ ${year} '`;

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




// creating the port
port = process.env.PORT || 8080,
    app.listen(port, function () {
        console.log(`app is running ${port}`)
    }) 