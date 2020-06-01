const Utils = require('./utils');

class Usage {
    VAT = 5; // 5%
    constructor (plans) {
        this.plans = plans;
        this.utils = new Utils();
    }

    getUsage(params) {
            // params: set of params to execute command 'usage', all of them(3) are mandatory
            if(!params || params.length<3 || !this.plans) return;

            const commandProfile = {
                supplier: params[0],
                selectedPlan: params[1],
                monthlyConsumption: params[2]
            }

            const annualConsumptionKwh = this.getConsumptionKwh(commandProfile);

            // Produces an output as a number e.g. 40000
            console.log(annualConsumptionKwh.totalKwh);
            return annualConsumptionKwh.totalKwh ? true : false;
    }

    getConsumptionKwh(commandProfile){
        // commandProfile: must contain the name of the supplier, selected plan and monthly consumption.
        const {supplier, selectedPlan, monthlyConsumption} = commandProfile;

        const monthlyConsumptionExcVAT = (monthlyConsumption/(this.VAT+100)) * 100;

        // calculation should be based in annual consumption
        const annualConsumption = (((monthlyConsumptionExcVAT)*12) * 100);
        var totalKwh = 0;
        var reminingConsumption = annualConsumption;

        const supplierProfile = this.plans.filter(profile => profile.supplier===supplier && profile.plan===selectedPlan)[0];
        // if supplier profile not found, return 0
        if(!supplierProfile) return { totalKwh: totalKwh };

        if(supplierProfile.standing_charge){
            reminingConsumption -= ((supplierProfile.standing_charge*30.42)*12);
        }

        var prevThresholdPrice = 0;
        var rates = supplierProfile.rates;

        for(var r=0; r<rates.length; r++){
            reminingConsumption -= prevThresholdPrice;
            if(rates[r].threshold){
                if(reminingConsumption >= (rates[r].threshold * rates[r].price)){
                    totalKwh += rates[r].threshold;
                    prevThresholdPrice = rates[r].threshold * rates[r].price;
                }
            } else {
                totalKwh += reminingConsumption/rates[r].price;
            }
        }

        return {
            totalKwh: this.utils.numberRounder(totalKwh, 0)
        };

    }

}

module.exports = Usage