import { YatzyDice } from "./YatzyDice.js";

export class Player {
	constructor(name, session) {
		this.session = session;
		this.name = name;
		this.yatzyDice = new YatzyDice();
		this.started = false;
	}

	getName() {
		return this.name;
	}

	getSession() {
		return this.session;
	}

	getYatzyDice() {
		return this.yatzyDice;
	}

	getScore() {
		return this.yatzyDice.getTotal();
	}

	resetYatzyDice() {
		this.yatzyDice = new YatzyDice();
	}

	isFinished() {
		return this.yatzyDice.isFinished();
	}

	getStarted() {
		return this.started;
	}

	setStarted(started) {
		this.started = started;
	}

	toMap() {
		return {
			name: this.name,
			started: this.started,
			finished: this.isFinished(),
			score: this.getScore(),
		};
	}
}
