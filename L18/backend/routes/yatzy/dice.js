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
        dice.throwDice();
    } else if (action === "reset") {
        dice.resetThrowCount();
    }
});
export default router;
