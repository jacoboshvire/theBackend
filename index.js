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
// app.use(Portfilio)
/**
 * ======================================
 * connecting mongoose to mongodb
 * ======================================
 */
mongoose.connect(`mongodb+srv://jacoshevire:${process.env.PASSWORD}@myportfiilio.evrnq.mongodb.net/`);
mongoose.Promise = Promise;



// home route
// ====================================
app.use("/api/portifilio", require("./Routes/routes.js"));


// creating the port
port = process.env.PORT,
    app.listen(port, function () {
        console.log(`app is running ${port}`)
    }) 