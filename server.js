const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const express = require("express");
const app = express();
const userRoute = require("./routes/userRoute");
const employeeRoute = require("./routes/employeeRoute");

const PORT_NUMBER = 8081;
const DB_URL =
    "mongodb+srv://maitri14:maitri@cluster0.anxyfzf.mongodb.net/comp3123_assignment1?retryWrites=true&w=majority";
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

mongoose.Promise = global.Promise;

mongoose
    .connect(DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log(
            "Successfully connected to the database mongoDB Atlas Server"
        );
    })
    .catch((err) => {
        console.log("Could not connect to the database. Exiting now...", err);
        process.exit();
    });
    
app.route("/").get((req, res) => {
    res.send(
        "<h1>Assignment-01 of COMP3123</h1>"
    );
});

app.use("/api/emp", employeeRoute);
app.use("/api/user", userRoute)


app.listen(PORT_NUMBER, () => {
    console.log(
        `Server is listening on port ${PORT_NUMBER}. https://localhost:${PORT_NUMBER}`
    );
});
