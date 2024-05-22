import express from "express";
const router = express.Router();
import { rooms } from "../../index.js";

router.get("/", (req, res) => {
	const sessionID = req.query.sessionID;
	const roomID = req.query.roomID;
	if (sessionID === undefined) {
		res.status(403).json({ message: "SessionID not provided" });
		return;
	}

	if (roomID === undefined) {
		const room = rooms.find(
			(room) => room.getPlayerBySessionID(sessionID) !== undefined
		);
		if (room === undefined) {
			res.status(404).json({ message: "Room not found" });
		} else {
			const player = room.getPlayerBySessionID(sessionID);
			if (player === undefined) {
				res.status(403).json({ message: "Player not in room" });
				return;
			}
			res.status(200).json({
				room: room.toMap(),
				player: player.toMap(),
				success: true,
			});
		}
	} else {
		const room = rooms.find((room) => room.getId() === roomID);
		if (room === undefined) {
			res.status(404).json({ message: "Room not found" });
		} else {
			const player = room.getPlayerBySessionID(sessionID);
			if (player === undefined) {
				console.log("Player not in room");
				res.status(403).json({ message: "Player not in room" });
				return;
			}
			res.status(200).json({
				room: room.toMap(),
				player: player.toMap(),
				success: true,
			});
		}
	}
});

export default router;
