import express from "express";
const app = express();
import sessions from "express-session";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { Room } from "./Room.js";
import { Player } from "./Player.js";
import { URL } from "url";
import fs from "fs";
import path from "path";
import router from "./routes/lobby.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const rooms = [];

app.use(
	sessions({
		secret: "yatzysecret2024",
		saveUninitialized: true,
		cookie: { maxAge: 1000 * 60 * 5 }, // 5 minutter
		resave: false,
	})
);

app.use(express.static(join(__dirname, "/public")));
app.use(express.json());
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

app.get("/view/:page", (req, response) => {
	const values = getValue(req);
	if (values) {
		response.json(values);
	} else {
		response.status(404).json({ message: "Page not found" });
	}
});

app.listen(8000, () => console.log("running"));

//DEBUG values for rooms and players
for (let i = 0; i < 25; i++) {
	const room = new Room(i.toString());
	rooms.push(room);
	const randomNumberOfPlayers = Math.floor(Math.random() * 4) + 1;
	for (let j = 0; j < randomNumberOfPlayers; j++) {
		const player = new Player(`Player ${j + 1}`);
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

function getValue(req) {
	const page = req.params.page;

	let resValues = {};

	switch (page) {
		case "lobby":
			resValues = {};
			const room = rooms[0];
			const players = room.getPlayers();
			const playerValues = players.map((player) => {
				return {
					name: player.getName(),
				};
			});
			resValues = {
				id: room.getId(),
				players: playerValues,
				maxPlayers: room.getMaxPlayers(),
				status: room.getStatus(),
			};
			console.log(resValues);
			break;
		case "rooms":
			resValues = rooms.map((room) => {
				return {
					id: room.getId(),
					players: room.getPlayers().map((player) => {
						return {
							name: player.getName(),
						};
					}),
					maxPlayers: room.getMaxPlayers(),
					status: room.getStatus(),
				};
			});
			resValues = { rooms: resValues };
			break;
	}

	return resValues;
}
