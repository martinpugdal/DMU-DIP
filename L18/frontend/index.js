import express from "express";
const app = express();
import { dirname } from "path";
import { fileURLToPath } from "url";
import { get, getAPIURL, validSession } from "./httpsUtil.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
	// lazy redirect to real main page
	res.redirect("/lobby");
});

app.get("/:view", (req, res) => {
	const page = req.params.view;
	if (page === "favicon.ico") return;

	if (page === "") {
		res.render("error", { error: "404 - Page not found" });
		return;
	}
	console.log(page);

	if (page !== "lobby" && page !== "error" && page !== "rooms") {
		// console.log("Checking session");
		if (
			req.session?.sessionID === undefined ||
			!validSession(req.session.sessionID)
		) {
			res.render("error", { error: "403 - Forbidden, not logged in" });
			return;
		}
	}

	//TODO: get values from backend and render page
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

app.listen(3000, () => console.log("running"));
