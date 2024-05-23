import express from "express";
const router = express.Router();
import { rooms, players } from "../../index.js";
import { Player } from "../../Player.js";
import { randomBytes } from "crypto";

router.post("/", (req, res) => {
    const { username, sessionID } = req.body;

    if (username === undefined) {
        res.status(403).json({ message: "Username not provided" });
        return;
    }
    if (username === "") {
        res.status(403).json({ message: "Username cannot be empty" });
        return;
    }

    // already have an account
    if (sessionID !== undefined && sessionID !== "") {
        res.status(403).json({
            message: "Already logged in with this sessionID",
        });
        return;
    }

    // one username globally
    const playerExists = rooms.some((room) =>
        room
            .getPlayers()
            .some(
                (player) =>
                    player.getName().toLowerCase() === username.toLowerCase()
            )
    );
    if (playerExists === true) {
        res.status(403).json({ message: "Username already taken" });
        return;
    }

    // create new player
    const generatedID = randomBytes(20).toString("hex");
    const newPlayer = new Player(username, generatedID);
    players.push(newPlayer);
    res.send({
        message: "Success, player added",
        sessionID: generatedID,
    });
});

// router.post("/", (req, res) => {
//     const { username, roomID } = req.body;
//     const room = rooms.find((room) => room.getId() === roomID);
//     if (room === undefined) {
//         res.status(404).json({ message: "Room not found" });
//     } else if (room.getStatus() !== "WAITING") {
//         res.status(403).json({ message: "Room not waiting" });
//     } else if (room.getPlayers().length >= room.getMaxPlayers()) {
//         res.status(403).json({ message: "Room full" });
//     } else if (
//         room.getPlayerByName(username) !== undefined ||
//         username === ""
//     ) {
//         res.status(403).json({ message: "Username already taken" });
//     } else {
//         let sessionID_ = req.body?.sessionID;
//         console.log("Session ID: " + sessionID_);
//         if (sessionID_ !== undefined) {
//             let currentRoomID = -1;
//             let sessionFound = false;
//             rooms.forEach((room) => {
//                 room.getPlayers().forEach((player) => {
//                     if (player.getSession() === sessionID_) {
//                         if (room.getStatus() !== "WAITING") {
//                             room.removePlayerByName(player);
//                             console.log(
//                                 "Player removed: " +
//                                     player.getName() +
//                                     " from room " +
//                                     roomID +
//                                     " due to game is done/started"
//                             );
//                         } else {
//                             sessionFound = true;
//                         }
//                         currentRoomID = room.getId();
//                     }
//                 });
//             });
//             console.log("Current room ID: " + currentRoomID);
//             if (sessionFound === true) {
//                 res.status(403).json({
//                     message:
//                         "Already logged in with this sessionID in room " +
//                         currentRoomID,
//                 });
//                 return;
//             }
//         }
//         sessionID_ = roomID + "_yatzy_" + username;
//         room.addPlayer(new Player(username, sessionID_));
//         console.log("Player added: " + username);
//         res.send({
//             message: "Success, player added",
//             sessionID: sessionID_,
//         });
//     }
// });

export default router;
