import express from "express";
const router = express.Router();
import { rooms, players } from "../../index.js";

router.post("/", (req, res) => {
    const { sessionID } = req.body;

    if (sessionID === undefined || sessionID === "") {
        res.status(403).json({ message: "SessionID not provided" });
        return;
    }

    const player = players.find((player) => player.getSession() === sessionID);
    if (player === undefined) {
        res.status(403).json({ message: "Player not found" });
        return;
    }

    const room = rooms.find(
        (room) => room.getPlayerBySessionID(sessionID) !== undefined
    );
    if (room !== undefined) {
        room.removePlayerByName(player);
    }

    players.splice(players.indexOf(player), 1); // remove player from global list
    res.send({
        hadRoom: room !== undefined,
        success: true,
    });
});

export default router;
