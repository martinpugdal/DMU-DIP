import { assert } from 'chai'
import { add } from '../logic.js'

describe('When add numbers', () => {
  it('Should return correct result', () => {
    const result = add(1,2)
    //chai TDD
    assert.equal(result, 3)
    // havde jeg brugt should: BDD
    //result.should.be.equal(3)
  })
  it('Should return another correct result', () => {
    const result = add(1,3)
    assert.equal(result,4)
  })
  it('negative x', () => {
    const result = add(-3,3)
    assert.equal(result,6)
  })

})