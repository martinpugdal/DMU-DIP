export class Room {
	constructor(id) {
		this.id = id;
		this.players = [];
		this.maxPlayers = 4;
		this.status = "WAITING";
	}
	getId() {
		return this.id;
	}
	getMaxPlayers() {
		return this.maxPlayers;
	}
	getStatus() {
		return this.status;
	}
	setStatus(status) {
		if (
			status !== "WAITING" &&
			status !== "STARTED" &&
			status !== "FINISHED"
		) {
			throw new Error("Invalid status");
		}
		this.status = status;
	}
	addPlayer(player) {
		this.players.push(player);
	}
	getPlayers() {
		return this.players;
	}
	getPlayerByName(name) {
		return this.players.find((player) => player.getName() === name);
	}
	removePlayerByName(name) {
		this.players = this.players.filter(
			(player) => player.getName() !== name
		);
	}
	getPlayerBySessionID(sessionID) {
		return this.players.find((player) => player.getSession() === sessionID);
	}
	toMap() {
		return {
			id: this.id,
			players: this.players.map((player) => player.toMap()),
			maxPlayers: this.maxPlayers,
			status: this.status,
		};
	}
}
