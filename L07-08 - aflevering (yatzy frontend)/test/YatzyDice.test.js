import { assert } from 'chai';
import { expect } from 'chai';
import { YatzyDice } from '../src/scripts/YatzyDice.js';
import { it } from 'mocha';

describe('When using the YatzyDice class', () => {
    
    let dice = new YatzyDice();
    
    it('should return a number between 1 and 6', () => {
        let random = dice.getRandom();
        
        //BDD
        expect(random).to.be.a('number');
        //TDD
        assert.isNumber(random);
        assert.isAbove(random, 0);
        assert.isBelow(random, 7);
    })
    
    it('should return an array of 5 elements', () => {
        let values = dice.getValues();
        
        //BDD
        expect(values).to.be.an('array');
        expect(values).to.have.lengthOf(5);
        //TDD
        assert.isArray(values);
        assert.lengthOf(values, 5);
    })
    
    it('should set the values of the dice', () => {
        let values = [1, 2, 3, 4, 5];
        dice.setValues(values);
        
        //BDD
        expect(dice.getValues()).to.eql(values);
        //TDD
        assert.deepEqual(dice.getValues(), values);
    })
    
    it('should return the sum of the dice values', () => {
        let sum = 15;
        dice.setSum(sum);
        
        //BDD
        expect(dice.getSum()).to.equal(sum);
        //TDD
        assert.equal(dice.getSum(), sum);
    })
    
    it('should set the total of the dice values', () => {
        let total = 50;
        dice.setTotal(total);
        
        //BDD
        expect(dice.getTotal()).to.equal(total);
        //TDD
        assert.equal(dice.getTotal(), total);
    })
    
    it('should return the throw count', () => {
        let throwCount = 3;
        dice.resetThrowCount();
        
        //BDD
        expect(dice.getThrowCount()).to.equal(0);
        //TDD
        assert.equal(dice.getThrowCount(), 0);
    })
    
    it('should throw the dice', () => {
        dice.throwDice();
        
        //BDD
        expect(dice.getThrowCount()).to.equal(1);
        //TDD
        assert.equal(dice.getThrowCount(), 1);
    })
    
    it('should throw the dice and skip the first dice', () => {
        dice.throwDice([0]);
        
        //BDD
        expect(dice.getThrowCount()).to.equal(2);
        //TDD
        assert.equal(dice.getThrowCount(), 2);
    })
    
    it('should throw the dice and skip the first and second dice', () => {
        dice.throwDice([0, 1]);
        
        //BDD
        expect(dice.getThrowCount()).to.equal(3);
        //TDD
        assert.equal(dice.getThrowCount(), 3);
    })
    
    it('should throw the dice and skip the first, second and third dice', () => {
        dice.throwDice([0, 1, 2]);
        
        //BDD
        expect(dice.getThrowCount()).to.equal(4);
        //TDD
        assert.equal(dice.getThrowCount(), 4);
    })
    
    it('should throw the dice and skip the first, second, third and fourth dice', () => {
        dice.throwDice([0, 1, 2, 3]);
        
        //BDD
        expect(dice.getThrowCount()).to.equal(5);
        //TDD
        assert.equal(dice.getThrowCount(), 5);
    })
    
    it('should throw the dice and skip the first, second, third, fourth and fifth dice', () => {
        dice.throwDice([0, 1, 2, 3, 4]);
        
        //BDD
        expect(dice.getThrowCount()).to.equal(6);
        //TDD
        assert.equal(dice.getThrowCount(), 6);
    })
    
    it('should return the frequency of the dice values', () => {
        let values = [1, 2, 3, 4, 5];
        dice.setValues(values);
        let frequency = dice.frequency();
        
        //BDD
        expect(frequency).to.eql([1, 1, 1, 1, 1, 0]);
        //TDD
        assert.deepEqual(frequency, [1, 1, 1, 1, 1, 0]);
    })
    
    it('should return the total value of the dice values', () => {
        let values = [1, 2, 3, 4, 5]; // 15
        dice.setValues(values);
        let sum = dice.getValues().map((value) => value).reduce((a, b) => a + b);
        
        //BDD
        expect(sum).to.equal(15);
        //TDD
        assert.equal(sum, 15);
    })
    
    it('should return the one pair points', () => {
        let values = [1, 1, 2, 3, 4];
        dice.setValues(values);
        let onePairPoints = dice.onePairPoints();
        
        //BDD
        expect(onePairPoints).to.equal(2);
        //TDD
        assert.equal(onePairPoints, 2);
    })
    
    it('should return the two pair points', () => {
        let values = [1, 1, 2, 2, 3];
        dice.setValues(values);
        let twoPairPoints = dice.twoPairPoints();
        
        //BDD
        expect(twoPairPoints).to.equal(6);
        //TDD
        assert.equal(twoPairPoints, 6);
    })
    
    it('should return the three same points', () => {
        let values = [1, 1, 1, 2, 3];
        dice.setValues(values);
        let threeSamePoints = dice.threeSamePoints();
        
        //BDD
        expect(threeSamePoints).to.equal(3);
        //TDD
        assert.equal(threeSamePoints, 3);
    })
    
    it('should return the four same points', () => {
        let values = [1, 1, 1, 1, 2];
        dice.setValues(values);
        let fourSamePoints = dice.fourSamePoints();
        
        //BDD
        expect(fourSamePoints).to.equal(4);
        //TDD
        assert.equal(fourSamePoints, 4);
    })
    
    it('should return the full house points', () => {
        let values = [1, 1, 2, 2, 2];
        dice.setValues(values);
        let fullHousePoints = dice.fullHousePoints();
        
        //BDD
        expect(fullHousePoints).to.equal(8);
        //TDD
        assert.equal(fullHousePoints, 8);
    })
    
    it('should return the small straight points', () => {
        let values = [1, 2, 3, 4, 5];
        dice.setValues(values);
        let smallStraightPoints = dice.smallStraightPoints();
        
        //BDD
        expect(smallStraightPoints).to.equal(15);
        //TDD
        assert.equal(smallStraightPoints, 15);
    })
    
    it('should return the large straight points', () => {
        let values = [2, 3, 4, 5, 6];
        dice.setValues(values);
        let largeStraightPoints = dice.largeStraightPoints();
        
        //BDD
        expect(largeStraightPoints).to.equal(20);
        //TDD
        assert.equal(largeStraightPoints, 20);
    })
    
    it('should return the chance points', () => {
        let values = [1, 2, 3, 4, 5];
        dice.setValues(values);
        let chancePoints = dice.chancePoints();
        
        //BDD
        expect(chancePoints).to.equal(15);
        //TDD
        assert.equal(chancePoints, 15);
    })
    
    it('should return the yatzy points', () => {
        let values = [1, 1, 1, 1, 1];
        dice.setValues(values);
        let yatzyPoints = dice.yatzyPoints();
        
        //BDD
        expect(yatzyPoints).to.equal(50);
        //TDD
        assert.equal(yatzyPoints, 50);
    })
})