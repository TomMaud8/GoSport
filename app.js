//IMPORTING MODULES
import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import axios from "axios";
import bodyParser from "body-parser";


//DECLARING CONSTANT VARIABLES
const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;
//Ticketmaster API URL & key
const TICKETMASTERURL = "https://app.ticketmaster.com/discovery/v2/"; 
const TICKETMASTERKEY = "hPGH31HmTxubOYDB8LmbiZcBRi2UHLhG";

//ENABLING MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: true}));
//Serve the static files from the public folder location using the built-in static middleware
app.use(express.static("public"));

//In this case just retreiving request response from root path
app.get("/", async (req, res) => {
    try {
        const result = await axios.get(TICKETMASTERURL + "/events.json", {
            params: {
                countryCode: "CZ",
                classificationName: "sport",
                apikey: TICKETMASTERKEY,
            },
        });
        console.log(JSON.stringify(result.data));
        res.send(`<h1>${JSON.stringify(result.data)}</h1>`);
    } catch (error) {
        res.status(404).send("Error", error.message);
    }
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
