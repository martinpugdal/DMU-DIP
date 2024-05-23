import express from "express";
const app = express();
import { dirname } from "path";
import { fileURLToPath } from "url";
import { get, getAPIURL, post } from "./public/js/httpsUtil.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/static/", express.static(__dirname + "/public"));

app.get("/", (req, res) => {
    // lazy redirect to real main page
    res.redirect("rooms");
});

app.get("/:view", (req, res) => {
    const page = req.params.view;
    if (page === "favicon.ico") {
        res.end();
        return;
    }

    if (page === "") {
        res.render("error", { error: "404 - Page not found" });
        return;
    }
    console.log("VIEW GET /" + page);

    const apiReqURL = getAPIURL() + "/" + page;
    get(apiReqURL)
        .then((values) => {
            values.post = post;
            values.get = get;
            values.apiURL = getAPIURL();
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
            if (
                values.message !== undefined &&
                values?.success === undefined &&
                values?.success !== true
            ) {
                console.log(values.message);
                res.render("error", { error: values.message });
                return;
            }
            values.post = post;
            values.get = get;
            values.apiURL = getAPIURL();
            res.render("room", values);
        })
        .catch((err) => {
            res.render("error", { error: err });
        });
});

app.get("/room/:roomID/game", async (req, res) => {
    console.log("GET /room/:roomID/game");
    const roomID = req.params.roomID;
    if (roomID === "") {
        res.render("error", { error: "404 - Room not found" });
        return;
    }

    const apiReqURL = getAPIURL() + "/rooms/" + roomID + "/validate";
    const sessionID = req.query?.sessionID;
    const respons = await post(apiReqURL, {}, sessionID);
    if (respons.success === true) {
        res.sendFile(__dirname + "/public/html/index.html");
    } else {
        res.render("error", { error: respons.message });
    }
});

const dev = true; // change it to false when we want to deploy (for other people to see)
const port = dev ? 3000 : process.env.PORT;
const host = dev ? "localhost" : process.env.HOST;
app.listen(port, host, () => {
    console.log(`Server running on http://${host}:${port}`);
});
