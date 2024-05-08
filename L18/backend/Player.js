import { YatzyDice } from "./YatzyDice.js";

export class Player {
	constructor(name, session) {
		this.session = session;
		this.name = name;
		this.yatzyDice = new YatzyDice();
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

	resetYatzyDice() {
		this.yatzyDice = new YatzyDice();
	}
}
