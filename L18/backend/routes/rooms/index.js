import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
	res.send("Hello World!");
});

router.get("/:room", (req, res) => {
	res.send("Room " + JSON.stringify(req.params.room));
});

export default router;
