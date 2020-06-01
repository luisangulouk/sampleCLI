
class Utils {

    numberRounder(value, decimals) {
        return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
    }
}

module.exports = Utils