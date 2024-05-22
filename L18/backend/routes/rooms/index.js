import express from "express";
const router = express.Router();
import { rooms } from "../../index.js";

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
            score: player.getYatzyDice().getTotal(),
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

export default router;
