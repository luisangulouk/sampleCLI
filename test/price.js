const expect = require('chai').expect;
var Price = require('../lib/price');

describe('Price: produces annual cost by existing plans', () => {
  var samplePlans = [
    {'supplier': 'eon', 'plan': 'variable', 'rates': [{'price': 13.5, 'threshold': 100}, {'price': 10}]}
  ];
  var pricer = new Price(samplePlans);

  describe('Check valid params', () => {
    it('Returns: undefined if args or plans are not present', () => {
        var pricerWithNoPlans = new Price();
        expect(pricerWithNoPlans.getDeals()).to.equal(undefined);
    });
  });

  describe('Check type validity', () => {
    it('Returns: undefined if annualkwhVat is not a number', () => {
      var args = 'Some Value';

      expect(pricer.getDeals(args)).to.equal(undefined);
    });
  });

  describe('Check valid case', () => {
    it('Produces a list of plans including supplier, name of plan and annual cost', () => {
      expect(pricer.getDeals(1000)).to.be.true;

    });
  });

});