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
            const overlappingDays = this.overlappingDays(budget, period);
            totalBudget += overlappingDays * budget.dayBudget();
        });
        return totalBudget;
    }

    overlappingDays(budget, period) {
        let overlappingEnd;
        let overlappingStart;
        if (budget.yearMonth === period.startDate.format('YYYYMM')) {
            overlappingEnd = budget.lastDay();
            overlappingStart = period.startDate;
        } else if (budget.yearMonth === period.endDate.format('YYYYMM')) {
            overlappingStart = budget.firstDay();
            overlappingEnd = period.endDate;
        } else {
            overlappingStart = budget.firstDay();
            overlappingEnd = budget.lastDay();
        }
        return overlappingEnd.diff(overlappingStart, 'day') + 1;
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