import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
//Midlewear tool for parsing data
import bodyParser from "body-parser";
import morgan from "morgan";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

//Custom middlewear function
function logger(req, res, next) {
    console.log("Request Method: ", req.method);
    console.log("Request Method: ", req.url);
    next();
}

//Enabling the middlewear
//app.use(bodyParser.urlencoded({ extended: true}));
//app.use(morgan("tiny"));
app.use(logger);

//Use static partials from the public folder
app.use(express.static("public"));

//In this case just retreiving request response from root path
app.get("/", (req, res) => {
    //res.sendFile(__dirname + "/index.html");
    res.render("index.ejs", {
        title: "GoSport", 
        creator: "Tom Maudling",
    });
});

app.get("/Czechia", (req, res) => {
    res.send("<h1>Czechia</h1>");
});

app.get("/Japan", (req, res) => {
    res.send("<h1>Japan</h1>");
});

//Create Server
//Port - location on server (like a door) where we are going to listen from requests from the client side
//Port that we are listening on and the callback function (anonymous function)
app.listen(port, () => {
    console.log(`Server running on port ${port}.`);
});
