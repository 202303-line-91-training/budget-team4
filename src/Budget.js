const dayjs = require('dayjs');
const Period = require("./Period");

class Budget {
    constructor(yearMonth, amount) {
        this.yearMonth = yearMonth;
        this.amount = amount;
    }

    overlappingAmount(period) {
        return period.overlappingDays(this.#createPeriod()) * this.#dayBudget();
    }

    #dayBudget() {
        return this.amount / dayjs(this.yearMonth).daysInMonth();
    }

    #createPeriod() {
        return new Period(this.#firstDay(), this.#lastDay());
    }

    #firstDay() {
        return dayjs(this.yearMonth).startOf('month');
    }

    #lastDay() {
        return dayjs(this.yearMonth).endOf('month');
    }
}

module.exports = Budget;