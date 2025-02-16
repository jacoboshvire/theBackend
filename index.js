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
mongoose.connect(`mongodb+srv://${process.env.MONGODBUSER}:${process.env.PASSWORD}@${process.env.DATABASE}.710qv.mongodb.net/`);
mongoose.Promise = Promise;



// home route
// ====================================
app.use("/api/portifilio", require("./Routes/routes.js"));

app.get("/", (req, res) => {
    // if (Error) {
    //     return res.status(500).send("error")
    // }
    return res.status(200).send("hello")
})


// creating the port
const port = process.env.PORT || 4000;
app.listen(port, function () {
    console.log(`app is running ${port}`)
}) 