const expect = require('chai').expect;
var Usage = require('../lib/usage');

describe('Usage: produces the annual consumption(Kwh) based on a refernce plan', () => {
  var samplePlans = [
    {'supplier': 'eon', 'plan': 'variable', 'rates': [{'price': 13.5, 'threshold': 100}, {'price': 10}]}
  ];
  var taskUsage = new Usage(samplePlans);

  describe('Check valid params', () => {
    it('Returns: undefined if args or plans are not present', () => {
        var taskUsageWithNoPlans = new Usage();
        expect(taskUsageWithNoPlans.getUsage()).to.equal(undefined);
    });
  });

  describe('Check type validity', () => {
    it('Returns: undefined if any of the expected arguments are not present', () => {
      var args = ['eon','plan'];

      expect(taskUsage.getUsage(args)).to.equal(undefined);
    });
  });

  describe('Check valid case', () => {
    it('Produces an ammount(Kwh) on a given plan spec', () => {
      expect(taskUsage.getUsage(['eon','variable',1000])).to.be.true;
    });
  });

});