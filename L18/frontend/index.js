import express from "express";
import sessions from "express-session";
const app = express();
import { dirname } from "path";
import { fileURLToPath } from "url";
import { get, getAPIURL, post } from "./httpsUtil.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/static/", express.static(__dirname + "/public"));

app.get("/", (req, res) => {
    // lazy redirect to real main page
    res.redirect("/rooms");
});

app.get("/:view", (req, res) => {
    const page = req.params.view;
    if (page === "favicon.ico" || page === "httpsUtil.js") {
        res.end();
        return;
    }

    if (page === "") {
        res.render("error", { error: "404 - Page not found" });
        return;
    }
    console.log(page);

    const apiReqURL = getAPIURL() + "/view/" + page;
    get(apiReqURL)
        .then((values) => {
            // console.log(values);
            res.render(page, values);
        })
        .catch((err) => {
            res.render("error", { error: err });
        });
});

app.get("/room/:roomID", (req, res) => {
    const roomID = req.params.roomID;
    if (roomID === "") {
        res.render("error", { error: "404 - Room not found" });
        return;
    }

    const apiReqURL = getAPIURL() + "/rooms/" + roomID;
    get(apiReqURL)
        .then((values) => {
            values.post = post;
            values.apiURL = getAPIURL();
            res.render("room", values);
        })
        .catch((err) => {
            res.render("error", { error: err });
        });
});

app.listen(3000, () => console.log("running"));
