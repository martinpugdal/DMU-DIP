import { assert } from 'chai';
import { expect } from 'chai';
import Chef from '../app.js';

describe('Chef test', function(){
   
    let chef = Chef;
    
    it('check the dish has valid name.', function(){
        assert.isString(chef.checkMenu(), 'string');
        //TDD
        assert.isTrue(chef.dishes.includes(chef.checkMenu()));
        //BDD
        expect(chef.dishes.includes(chef.checkMenu())).to.be.to.be.to.be.true;
    })
    
    it('check for a dish in menu.', function (){
        let dish= chef.checkMenu();
        assert.oneOf(dish, chef.dishes)
    });

    it('make sure the chef can feed more.', function(){

      for(var i=0; i<6; i++){
          chef.customersFed();
          assert.isAtLeast(chef.customers, 0); 
      }
      
  });
    
});