// required framework
const Joi = require("joi"),
    express = require("express"),
    app = express(),
    mongoose = require("mongoose"),
    Portfilio = require("./models/Portfilio"),
    dotenv = require("dotenv")

//environment variable
dotenv.config();


app.use(express.json());

/**
 * ======================================
 * connecting mongoose to mongodb
 * ======================================
 */
mongoose.connect(`mongodb+srv://${process.env.MONGODBUSER}:${process.env.PASSWORD}@${process.env.DATABASE}.evrnq.mongodb.net/`);
mongoose.Promise = Promise;



// home route
// ====================================
app.use("/api/portifilio", require("./Routes/routes.js"));

app.get("/", (req, res) => {
    if (err) {
        return res.status(500).send("error", err)
    }
    return res.status(200).send("hello")
})


// creating the port
port = process.env.PORT || 8080,
    app.listen(port, function () {
        console.log(`app is running ${port}`)
    }) 