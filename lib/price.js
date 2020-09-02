const Utils = require('./utils');

class Price {
    VAT = 5; // 5%
    constructor (plans) {
        this.plans = plans;
        this.utils = new Utils();
    }

    getDeals(annualkwhVat) {
            // annualkwhVat: Annual comsumption in Kwh (inc VAT)
            if(!annualkwhVat || !this.plans || isNaN(annualkwhVat)) return;

            const pricedPlans = this.plans.map(plan => this.getFormattedDeal(plan, annualkwhVat));
            const pricesPlansSorted = pricedPlans.sort(this.compare);

            // Produces an output with supplier, plan and total e.g.  edf,fixed,200.50
            pricesPlansSorted.forEach(plan => {
                console.log(`${plan.supplier},${plan.plan},${plan.total}`);
            });

            return pricesPlansSorted ? true : false;
    }

    compare(a, b) {
        //Sorts PricePlan array by total (Ascending)
        const totalA = a.total;
        const totalB = b.total;
        
        let comparison = 0;
        if (totalA > totalB) {
            comparison = 1;
        } else if (totalA < totalB) {
            comparison = -1;
        }
        return comparison;
    }

    getFormattedDeal(plan, annualkwhVat){
        // plan: plan profile associated to a provider
        // annualkwhVat: annual comsumption in Kw/h

        // TO DO: plan validator should be implemented to guarantee the completion of this function

        var prevThreshold = 0;
        var rates = plan.rates;
        var reminingComsumption = annualkwhVat;
        var total = 0;

        for(var r=0; r<rates.length; r++){
            reminingComsumption -= prevThreshold;
            if(rates[r].threshold){
                if(reminingComsumption >= rates[r].threshold){
                    total += rates[r].threshold * rates[r].price;
                    prevThreshold = rates[r].threshold;
                }
            } else {
                total += reminingComsumption * rates[r].price;
            }
        }

        // if standing charge applied, this should be calculated based on the average number 
        // of days(30.42) in a month and multiply by 12 to bring it to an annual escale
        if(plan.standing_charge){
            total += (plan.standing_charge*30.42)*12;
        }

        const totalCostVAT = (total/100) * (this.VAT/100);
        const totalCost = (total/100) + totalCostVAT;

        return {
            supplier: plan.supplier,
            plan: plan.plan,
            total: this.utils.numberRounder(totalCost, 2)
        }

    }

    getValueExcVat(amountVat) {
        return (amountVat / (this.VAT+100)) * 100;
    }
}

module.exports = Price