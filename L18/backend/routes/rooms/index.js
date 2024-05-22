import express from "express";
const router = express.Router();
import { createRoom, rooms } from "../../index.js";

router.get("/", (req, res) => {
	const resValues = rooms.map((room) => {
		return {
			id: room.getId(),
			players: room.getPlayers().map((player) => player.toMap()),
			maxPlayers: room.getMaxPlayers(),
			status: room.getStatus(),
		};
	});
	res.send({ rooms: resValues });
});

router.get("/:room", (req, res) => {
	const roomID = req.params.room;
	let resValues = {};
	const room = rooms.find((room) => room.getId() === roomID);
	if (room === undefined) {
		resValues = { message: "Room not found" };
		res.status(404).send(resValues);
		return;
	}
	const players = room.getPlayers();
	const playerValues = players.map((player) => {
		return {
			name: player.getName(),
			started: player.getStarted(),
			finished: player.isFinished(),
			score: player.getScore(),
		};
	});
	resValues = {
		id: room.getId(),
		players: playerValues,
		maxPlayers: room.getMaxPlayers(),
		status: room.getStatus(),
	};
	res.send(resValues);
});

router.post("/:room/:action", (req, res) => {
	const sessionID = req.body?.sessionID;
	if (sessionID === undefined) {
		res.status(400).send({ message: "Session ID missing" });
		return;
	}
	const roomID = req.params.room;
	const room = rooms.find((room) => room.getId() === roomID);
	if (room === undefined) {
		res.status(404).send({ message: "Room not found" });
		return;
	}
	const player = room.getPlayerBySessionID(sessionID);
	if (player === undefined) {
		res.status(404).send({ message: "Player not found" });
		return;
	}
	const action = req.params.action;

	if (action === "start") {
		room.setStatus("STARTED");
		res.status(200).send({ message: "Game started", success: true });
	} else if (action === "throw") {
		const lockedDice = req.body?.lockedDice;
		if (lockedDice !== undefined) {
			for (let i = 0; i < 5; i++) {
				player.getYatzyDice().lockDie(i, lockedDice[i] === true);
			}
		}
		player.getYatzyDice().throwDice();
		res.send({ values: player.getYatzyDice().getValues() });
	} else if (action === "userStarted") {
		if (room.getStatus() !== "STARTED") {
			res.send({ message: "Game not started", success: false });
		} else if (player.getStarted() === true) {
			res.send({ message: "Player already started", success: false });
		} else {
			player.setStarted(true);
			res.send({ message: "Player started", success: true });
		}
	} else if (action === "createNewRoom") {
		const newRoom = createRoom();
		if (newRoom === null) {
			res.status(400).send({ message: "Max number of rooms reached" });
		} else {
			res.send({ roomID: newRoom.getId() });
		}
	} else if (action === "validate") {
		// this allows the player to join the game by the validation check of the sessionID
		res.send({ message: "All good", success: true });
	}
});

export default router;
