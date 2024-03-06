
var Chef = function () {
  this.dishes = ['Dosa', 'Tea', 'Pokoras', 'Pav Bhaji'];
  this.customers = 5;
};

Chef.prototype.checkMenu = function () {
  //returns a string
  //returns a random dish from the dishes array
  let dish = this.dishes[Math.floor(Math.random() * this.dishes.length)];

  console.log("I will like to have:", dish);
  return dish;
};

Chef.prototype.customersFed = function () {

  if (this.customers == 1) {

    console.log("Customer fed with yummy food! No customers left");
    this.customers--;

  } else if (this.customers == 0) {
    console.log("All customers have been satisfied. Done for the day!");
  } else {
    this.customers--;
    console.log("Customer fed with yummy food!", this.customers, "more to go!");
  }

  return this.customers;
};

let chef = new Chef();

chef.checkMenu();
while (chef.customers>0) {
  chef.customersFed();
}

export default chef;
