import express from "express";
const app = express();
import cors from "cors";
import sessions from "express-session";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { Room } from "./Room.js";
import { Player } from "./Player.js";
import { URL } from "url";
import fs from "fs";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Array to store all rooms
const rooms = [];

app.use(
	sessions({
		secret: "yatzysecret2024",
		saveUninitialized: true,
		cookie: {
			sameSite: "none",
			secure: false,
			httpOnly: true,
			maxAge: 1000 * 60 * 60,
		}, // 24 hours
		resave: true,
	})
);

app.use(express.json());
app.use(
	cors({
		origin: true,
		credentials: true,
		optionsSuccessStatus: 200,
	})
);
app.use(express.urlencoded({ extended: true }));

/*
 * Load all routes from the routes folder
 * This will load all files in the routes folder and use them as routes.
 */
function loadRoutes(dir, routePrefix = "") {
	fs.readdirSync(dir, { withFileTypes: true }).forEach((file) => {
		const fullPath = path.join(dir, file.name);

		if (file.isDirectory()) {
			loadRoutes(fullPath, `${routePrefix}/${file.name}`);
		} else if (
			file.isFile() &&
			path.extname(file.name) === ".js" &&
			file.name !== "index.js"
		) {
			let routerPath = `${routePrefix}/${path.basename(
				file.name,
				".js"
			)}`;

			const moduleURL = new URL("file://" + fullPath.replace(/\\/g, "/")); // a fix since its not a es module
			import(moduleURL)
				.then((route) => {
					// if file is named index.js then its a root route
					if (routerPath === "") {
						routerPath = "/";
					}
					app.use(routerPath, route.default);
				})
				.catch((error) => {
					console.error(
						`Error importing module '${fullPath}':`,
						error
					);
				});
		} else if (file.isFile() && file.name === "index.js") {
			const moduleURL = new URL("file://" + fullPath.replace(/\\/g, "/"));

			import(moduleURL)
				.then((route) => {
					app.use(routePrefix, route.default);
				})
				.catch((error) => {
					console.error(
						`Error importing module '${fullPath}':`,
						error
					);
				});
		}
	});
}

loadRoutes(path.join(__dirname, "routes"));

// app.get("/view/:page", (req, response) => {
// 	const values = getValue(req);
// 	if (values) {
// 		response.json(values);
// 	} else {
// 		response.status(404).json({ message: "Page not found" });
// 	}
// });

app.listen(8000, () => console.log("running"));

//DEBUG values for rooms and players
for (let i = 0; i <= 15; i++) {
	const room = new Room(i.toString());
	rooms.push(room);
	const randomNumberOfPlayers = Math.floor(Math.random() * 5);
	for (let j = 0; j < randomNumberOfPlayers; j++) {
		const session = Math.floor(Math.random() * 1000000);
		const player = new Player(`Player ${j + 1}`, "session." + session);
		player.getYatzyDice().setTotal(Math.floor(Math.random() * 100) + 1);
		room.addPlayer(player);
	}

	const randomStatus = Math.floor(Math.random() * 3);
	if (randomStatus === 1) {
		room.setStatus("STARTED");
	}
	if (randomStatus === 2) {
		room.setStatus("FINISHED");
	}
}

function createRoom() {
	// if there is 5 rooms where the status is not started, then dont create a new room
	if (rooms.filter((room) => room.getStatus() !== "STARTED").length >= 5) {
		return null;
	}
	// id should be unique, so we need to find the highest id and add 1
	const newID = rooms
		.reduce((prev, current) =>
			prev.getId() > current.getId() ? prev : current
		)
		.getId();
	const room = new Room(newID + 1);
	rooms.push(room);
	return room;
}

// export data to be used in routes
export { rooms, createRoom };
