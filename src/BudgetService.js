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
        const budgetRepo = new BudgetRepo();
        const budgets = budgetRepo.getAll();
        const yearMonthsBetweenPeriod = this.getYearMonthsBetweenPeriod(startDate, endDate);
        const matchBudgets = budgets.filter((budget) => {
            return yearMonthsBetweenPeriod.includes(budget.yearMonth);
        });
        if (matchBudgets.length === 0) {
            return 0;
        }
        if (startDate.format('YYYYMM') === endDate.format('YYYYMM')) {
            const days = endDate.diff(startDate, 'day') + 1;
            return matchBudgets[0].dayBudget() * days;
        }
        let totalBudget = 0;
        matchBudgets.forEach((budget) => {
            let period = new Period(startDate, endDate);
            let anotherPeriod = budget.createPeriod();
            const overlappingDays = period.overlappingDays(anotherPeriod);
            totalBudget += overlappingDays * budget.dayBudget();
        });
        return totalBudget;
    }

    getYearMonthsBetweenPeriod(startDate, endDate) {
        startDate = startDate.startOf('month');
        endDate = endDate.startOf('month');
        let result = [];
        while (endDate.unix() >= startDate.unix()) {
            result.push(startDate.format('YYYYMM'));
            startDate = startDate.add(1, 'month');
        }
        return result;
    }
}

module.exports = BudgetService;