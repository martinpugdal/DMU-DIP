import express from "express";
const router = express.Router();
import { rooms } from "../../index.js";
import { Player } from "../../Player.js";

router.post("/", (req, res) => {
    const { username, roomID } = req.body;
    const room = rooms.find((room) => room.getId() === roomID);
    if (room === undefined) {
        res.status(404).json({ message: "Room not found" });
    } else if (room.getStatus() !== "WAITING") {
        res.status(403).json({ message: "Room not waiting" });
    } else if (room.getPlayers().length >= room.getMaxPlayers()) {
        res.status(403).json({ message: "Room full" });
    } else if (
        room.getPlayerByName(username) !== undefined ||
        username === ""
    ) {
        res.status(403).json({ message: "Username already in use" });
    } else {
        let sessionID_ = req.body?.sessionID;
        console.log("Session ID: " + sessionID_);
        if (sessionID_ !== undefined) {
            let currentRoomID = -1;
            let sessionFound = false;
            rooms.forEach((room) => {
                room.getPlayers().forEach((player) => {
                    if (player.getSession() === sessionID_) {
                        if (room.getStatus() !== "WAITING") {
                            room.removePlayer(player);
                            console.log(
                                "Player removed: " +
                                    player.getName() +
                                    " from room " +
                                    roomID +
                                    " due to game is done/started"
                            );
                        } else {
                            sessionFound = true;
                        }
                        currentRoomID = room.getId();
                    }
                });
            });
            console.log("Current room ID: " + currentRoomID);
            if (currentRoomID !== -1 || sessionFound === true) {
                res.status(403).json({
                    message:
                        "Already logged in with this sessionID in room " +
                        currentRoomID,
                });
                return;
            }
        }
        sessionID_ = roomID + "_yatzy_" + username;
        room.addPlayer(new Player(username, sessionID_));
        console.log("Player added: " + username);
        res.send({
            message: "Success, player added",
            sessionID: sessionID_,
        });
    }
});

export default router;
