const dayjs = require('dayjs');
const BudgetRepo = require('./BudgetRepo');

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
            if (budget.yearMonth === startDate.format('YYYYMM')) {
                const monthEnd = budget.lastDay();
                totalBudget += (monthEnd.diff(startDate, 'day') + 1) * budget.dayBudget();
            } else if (budget.yearMonth === endDate.format('YYYYMM')) {
                const monthStart = this.firstDay(budget);
                totalBudget += (endDate.diff(monthStart, 'day') + 1) * budget.dayBudget();
            } else {
                totalBudget += budget.amount;
            }
        });
        return totalBudget;
    }

    firstDay(budget) {
        return dayjs(budget.yearMonth).startOf('month');
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