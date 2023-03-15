class Period {
    startDate;
    endDate;

    constructor(startDate, endDate) {
        this.startDate = startDate;
        this.endDate = endDate;
    }

    overlappingDays(budget) {
        let overlappingEnd = this.endDate.isBefore(budget.lastDay())
            ? this.endDate
            : budget.lastDay();
        let overlappingStart = this.startDate.isAfter(budget.firstDay())
            ? this.startDate
            : budget.firstDay();
        if (budget.yearMonth === this.startDate.format('YYYYMM')) {
            // overlappingEnd = budget.lastDay();
            // overlappingStart = this.startDate;
        } else if (budget.yearMonth === this.endDate.format('YYYYMM')) {
            // overlappingStart = budget.firstDay();
            // overlappingEnd = this.endDate;
        } else {
            // overlappingStart = budget.firstDay();
            // overlappingEnd = budget.lastDay();
        }
        return overlappingEnd.diff(overlappingStart, 'day') + 1;
    }

}

module.exports = Period;