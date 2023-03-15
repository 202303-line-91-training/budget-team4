const dayjs = require('dayjs');
const BudgetRepo = require('./BudgetRepo');
const Period = require("./Period");

class BudgetService {

    query(start, end) {
        const startDate = dayjs(start);
        const endDate = dayjs(end);
        if (endDate.isBefore(startDate)) {
            return 0;
        }
        let period = new Period(startDate, endDate);
        return new BudgetRepo().getAll()
            .map((budget) => budget.overlappingAmount(period))
            .reduce((previousValue, currentValue) => previousValue + currentValue, 0);
    }
}

module.exports = BudgetService;