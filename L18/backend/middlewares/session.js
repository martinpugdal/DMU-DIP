function session(req, res, next) {
	const sessionID = req.session.sessionID;
	console.log("SessionID: " + sessionID);
	const pagesAllowedWithoutSession = ["lobby", "error", "rooms", "public"];
	if (sessionID || pagesAllowedWithoutSession.includes(req.params.page)) {
		next();
	} else {
		res.status(403).json({ message: "Du er ikke logget ind" });
	}
}

export default session;
