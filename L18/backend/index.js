import express from "express";
const app = express();
import sessions from "express-session";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { Room } from "./Room.js";
import { Player } from "./Player.js";

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

function checkSession(req, res, next) {
	const sessionID = req.session.sessionID;
	console.log("SessionID: " + sessionID);
	const pagesAllowedWithoutSession = ["lobby", "error", "rooms", "public"];
	if (sessionID || pagesAllowedWithoutSession.includes(req.params.page)) {
		next();
	} else {
		res.status(403).json({ message: "Du er ikke logget ind" });
	}
}

/*
 * GET /
 * Simpel route der render siden med værdierne.
 */
app.get("/view/:page", checkSession, (req, response) => {
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
