import express from "express";
const router = express.Router();
import { rooms, players } from "../../index.js";

router.get("/", (req, res) => {
    const objekt = {};
    const resValues = rooms.map((room) => {
        return {
            id: room.getId(),
            players: room.getPlayers().map((player) => player.toMap()),
            maxPlayers: room.getMaxPlayers(),
            status: room.getStatus(),
        };
    });
    const sessionID = req.query?.sessionID;
    if (sessionID !== undefined && sessionID !== "") {
        const room = rooms.find(
            (room) => room.getPlayerBySessionID(sessionID) !== undefined
        );
        if (room !== undefined) {
            objekt.currentRoom = room.toMap();
            objekt.player = room.getPlayerBySessionID(sessionID).toMap();
        }
    }
    objekt.rooms = resValues;
    res.send(objekt);
});

router.get("/:room", (req, res) => {
    const roomID = req.params.room;
    let resValues = {};
    const room = rooms.find((room) => room.id === roomID);
    if (room === undefined) {
        resValues = { message: "Room not found" };
        res.status(404).send(resValues);
        return;
    }
    const playerList = room.getPlayers();
    const playerValues = playerList.map((player) => {
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
    const sessionID = req.query?.sessionID;
    if (sessionID !== undefined && sessionID !== "") {
        const player = room.getPlayerBySessionID(sessionID);
        if (player !== undefined) {
            resValues.player = player.toMap();
        }
    }
    res.send(resValues);
});

router.post("/:room/:action", (req, res) => {
    const sessionID = req.body?.sessionID;
    if (sessionID === undefined || sessionID === "") {
        res.status(400).send({ message: "Session ID missing" });
        return;
    }
    const roomID = req.params.room;
    const room = rooms.find((room) => room.getId() === roomID);
    if (room === undefined) {
        res.status(404).send({ message: "Room not found" });
        return;
    }

    const actionsAllowedWithoutPlayer = ["joinRoom"];

    const player = actionsAllowedWithoutPlayer.includes(req.params.action)
        ? players.find((player) => player.getSession() === sessionID)
        : room.getPlayerBySessionID(sessionID);
    if (player === undefined) {
        res.status(404).send({ message: "Player not found" });
        return;
    }

    const action = req.params.action;
    if (action === "joinRoom") {
        // check if player have already joined a room
        const playerRoom = rooms.find(
            (room) => room.getPlayerBySessionID(sessionID) !== undefined
        );
        if (playerRoom !== undefined) {
            res.status(403).send({ message: "Player already joined a room" });
        } else if (room.getStatus() !== "WAITING") {
            res.status(403).send({ message: "Room not waiting" });
        } else if (room.getPlayers().length >= room.getMaxPlayers()) {
            res.status(403).send({ message: "Room full" });
        } else {
            room.addPlayer(player);
            res.status(200).send({ message: "Player joined room" });
        }
    } else if (action === "start") {
        room.setStatus("STARTED");
        res.status(200).send({ message: "Game started", success: true });
    } else if (action === "userStarted") {
        if (room.getStatus() !== "STARTED") {
            res.send({ message: "Game not started", success: false });
        } else if (player.getStarted() === true) {
            res.send({ message: "Player already started", success: false });
        } else {
            player.setStarted(true);
            res.send({ message: "Player started", success: true });
        }
    } else if (action === "validate") {
        res.send({ message: "All good", success: true });
    }
});

export default router;
