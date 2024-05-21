import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
	let resValues = {};
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
});

export default router;
