const expect = require('chai').expect;
var Dispatcher = require('../lib/dispatcher');

describe('Dispatcher: dispatches actions with its params', () => {
  var samplePlans = [
    {'supplier': 'eon', 'plan': 'variable', 'rates': [{'price': 13.5, 'threshold': 100}, {'price': 10}]}
  ];
  var dispatcher = new Dispatcher(samplePlans);

  describe('Check valid commands', () => {
    it('Returns: undefined if args are not present', () => {

      expect(dispatcher.validate()).to.equal(undefined);
    });
  });

  describe('Check valid commands', () => {
    it('Sends a message when invalid command provided', () => {
      var args = ['something']

      expect(dispatcher.validate(args)).to.equal(console.log('Unknown action detected!'));
    });
  });

  describe('Check valid commands', () => {
    it('Dispatches action when valid command provided', () => {
      expect(dispatcher.validate(['price',1000])).to.be.true;
      expect(dispatcher.validate(['usage','eon','variable',300])).to.be.true;

    });
  });

});