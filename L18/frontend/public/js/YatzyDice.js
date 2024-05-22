export class YatzyDice {
	constructor() {
		this.values = [0, 0, 0, 0, 0];
		this.throwCount = 0;
		this.sum = 0;
		this.bonus = 50;
		this.total = 0;
	}

	getRandom() {
		return Math.floor(Math.random() * 6) + 1;
	}

	getValues() {
		return this.values;
	}

	setValues(values) {
		this.values = values;
	}

	getSum() {
		return this.sum;
	}

	setSum(sum) {
		this.sum = sum;
	}

	getBonus() {
		return this.bonus;
	}

	getTotal() {
		return this.total;
	}

	setTotal(total) {
		this.total = total;
	}

	getThrowCount() {
		return this.throwCount;
	}

	resetThrowCount() {
		this.throwCount = 0;
	}

	throwDice(diceNumbersToSkip = []) {
		for (let i = 0; i < 5; i++) {
			if (diceNumbersToSkip.includes(i)) {
				continue;
			}
			this.values[i] = this.getRandom();
		}
		this.throwCount++;
	}

	getResults() {
		const results = [].fill(0, 0, 14);
		for (let i = 0; i < 6; i++) {
			results[i] = this.sameValuePoints(i);
		}
		results[6] = this.onePairPoints();
		results[7] = this.twoPairPoints();
		results[8] = this.threeSamePoints();
		results[9] = this.fourSamePoints();
		results[10] = this.fullHousePoints();
		results[11] = this.smallStraightPoints();
		results[12] = this.largeStraightPoints();
		results[13] = this.chancePoints();
		results[14] = this.yatzyPoints();
		return results;
	}

	frequency() {
		const frequency = [0, 0, 0, 0, 0, 0];
		for (const value of this.values) {
			frequency[value - 1]++;
		}
		return frequency;
	}

	sameValuePoints(value) {
		return this.frequency()[value] * (value + 1);
	}

	onePairPoints() {
		let pairPoints = 0;
		const frequency = this.frequency();
		for (let i = 0; i < frequency.length; i++) {
			if (frequency[i] >= 2 && frequency[i] < 4) {
				pairPoints = i + 1;
			}
		}
		return pairPoints * 2;
	}

	twoPairPoints() {
		let points = 0;
		const pair1Points = this.onePairPoints() / 2;
		const frequency = this.frequency();
		for (let i = 0; i < pair1Points - 1; i++) {
			if (frequency[i] >= 2 && frequency[i] < 4) {
				points = pair1Points * 2 + (i + 1) * 2;
			}
		}
		return points;
	}

	threeSamePoints() {
		let threeSamePoints = 0;
		const frequency = this.frequency();
		for (let i = 0; i < frequency.length; i++) {
			if (frequency[i] >= 3) {
				threeSamePoints = (i + 1) * 3;
			}
		}
		return threeSamePoints;
	}

	fourSamePoints() {
		let fourSamePoints = 0;
		const frequency = this.frequency();
		for (let i = 0; i < frequency.length; i++) {
			if (frequency[i] >= 4) {
				fourSamePoints = (i + 1) * 4;
			}
		}
		return fourSamePoints;
	}

	fullHousePoints() {
		let fullHousePoints = 0;
		let threeSamePoints = 0;
		let pairPoints = 0;
		const frequency = this.frequency();
		for (let i = 0; i < frequency.length; i++) {
			if (frequency[i] >= 3) {
				threeSamePoints = i + 1;
			}
		}
		for (let i = 0; i < frequency.length; i++) {
			if (frequency[i] >= 2 && threeSamePoints !== i + 1) {
				pairPoints = i + 1;
			}
		}
		if (threeSamePoints !== 0 && pairPoints !== 0) {
			fullHousePoints = threeSamePoints * 3 + pairPoints * 2;
		}
		return fullHousePoints;
	}

	smallStraightPoints() {
		let smallStraightPoints = 0;
		const frequency = this.frequency();
		if (
			frequency[0] === 1 &&
			frequency[1] === 1 &&
			frequency[2] === 1 &&
			frequency[3] === 1 &&
			frequency[4] === 1
		) {
			smallStraightPoints = 1 + 2 + 3 + 4 + 5;
		}
		return smallStraightPoints;
	}

	largeStraightPoints() {
		let largeStraightPoints = 0;
		const frequency = this.frequency();
		if (
			frequency[1] === 1 &&
			frequency[2] === 1 &&
			frequency[3] === 1 &&
			frequency[4] === 1 &&
			frequency[5] === 1
		) {
			largeStraightPoints = 20;
		}
		return largeStraightPoints;
	}

	chancePoints() {
		let chancePoints = 0;
		for (const face of this.getValues()) {
			chancePoints += face;
		}
		return chancePoints;
	}

	yatzyPoints() {
		let yatzyPoints = 0;
		const frequency = this.frequency();
		for (const freqNum of frequency) {
			if (freqNum === 5) {
				yatzyPoints = 50;
			}
		}
		return yatzyPoints;
	}
}
