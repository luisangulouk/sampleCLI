const Price = require('./price');
const Usage = require('./usage');

const actions = {
    PRICE: 'price',
    USAGE: 'usage',
    EXIT: 'exit'
};

class Dispatcher {
    constructor (plans) {
        this.priceRunner = new Price(plans);
        this.usageRunner = new Usage(plans);
    }
  
    validate(args) {
        if(!args) return;

        var dispatchedAction;
        const action = args[0];
        var params = [];
        switch(action){
            case actions.PRICE :    params = args.slice(1);
                                    dispatchedAction = this.priceRunner.getDeals(params);
                                    break;
            case actions.USAGE :    params = args.slice(1);
                                    dispatchedAction = this.usageRunner.getUsage(params);
                                    break;
            case actions.EXIT :     process.exit(0);
            default:                console.log('Unknown action detected!');
                                    break

        }

        return dispatchedAction;
    }
}
  
module.exports = Dispatcher