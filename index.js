const express = require("express");
const app = express();

app.get("/", function (req, res) {
    res.send("home page");
    console.log("home page")
})

// creating the port
port = process.env.Port || 8080,
    app.listen(port, function () {
        console.log(`app is running ${port}`)
    })