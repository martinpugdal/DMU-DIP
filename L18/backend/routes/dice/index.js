import express from "express";
const router = express.Router();
import { rooms } from "../../index.js";

router.get("/", (req, res) => {
	const sessionID = req.query?.sessionID;
	if (sessionID === undefined || sessionID === "") {
		res.status(400).send({ message: "Session ID missing" });
		return;
	}
	const roomID = req.query?.roomID;
	if (roomID === undefined || roomID === "") {
		res.status(400).send({ message: "Room ID missing" });
		return;
	}
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
	res.send({
		success: true,
		dice: player.getYatzyDice().toMap(),
	});
});

router.post("/:action", (req, res) => {
	const sessionID = req.body?.sessionID;
	if (sessionID === undefined || sessionID === "") {
		res.status(400).send({ message: "Session ID missing" });
		return;
	}
	const room = rooms.find((room) => room.getId() === req.body.roomID);
	if (room === undefined) {
		res.status(404).send({ message: "Room not found" });
		return;
	}
	const player = room.getPlayerBySessionID(sessionID);
	if (player === undefined) {
		res.status(404).send({ message: "Player not found" });
		return;
	}
	const dice = player.getYatzyDice();
	const action = req.params.action;
	if (action === "roll") {
		if (dice.getThrowCount() >= 3) {
			res.status(400).send({ message: "Maximum throw count reached" });
			return;
		}
		const locked = req.body?.locked;
		if (locked === undefined) {
			res.status(400).send({ message: "Locked missing" });
			return;
		}
		for (let i = 0; i < locked.length; i++) {
			if (typeof locked[i] !== "boolean") {
				res.status(400).send({ message: "Invalid locked" });
				return;
			}
		}
		for (let i = 0; i < locked.length; i++) {
			if (locked[i] === true) {
				dice.lockDie(i);
			} else {
				dice.unlockDie(i);
			}
		}
		dice.throwDice();
		res.send({
			success: true,
			dice: dice.toMap(),
		});
	} else if (action === "score") {
		const index = req.body?.field;
		if (index === undefined) {
			res.status(400).send({ message: "Index missing" });
			return;
		} else if (
			typeof index !== "number" ||
			index < 0 ||
			index > dice.getResults().length
		) {
			res.status(400).send({ message: "Invalid index" });
			return;
		}
		const score = dice.chooseField(index);
		if (score === false) {
			res.status(400).send({
				message: "Field already taken",
			});
		} else {
			dice.resetThrowCount();
			res.send({
				success: true,
				dice: dice.toMap(),
			});
		}
	}
});
export default router;
