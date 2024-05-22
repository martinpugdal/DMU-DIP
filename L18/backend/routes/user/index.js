import express from "express";
const router = express.Router();
import { rooms } from "../../index.js";

router.get("/", (req, res) => {
    const sessionID = req.session.sessionID;
    const roomID = req.query.roomID;

    console.log("GET /user");
    console.log("Session ID: " + sessionID);

    if (roomID === undefined) {
        const room = rooms.find(
            (room) => room.getPlayerBySessionID(sessionID) !== undefined
        );
        if (room === undefined) {
            res.status(404).json({ message: "Room not found" });
        }
        res.status(200).json(room);
    } else {
        const room = rooms.find((room) => room.getId() === roomID);
        if (room === undefined) {
            res.status(404).json({ message: "Room not found" });
        } else if (room.getPlayerBySessionID(sessionID) === undefined) {
            res.status(403).json({ message: "Player not in room" });
        }
        res.status(200).json(room);
    }
});

export default router;
