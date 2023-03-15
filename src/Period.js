class Period {
    startDate;
    endDate;

    constructor(startDate, endDate) {
        this.startDate = startDate;
        this.endDate = endDate;
    }
    overlappingDays(budget ) {
        let overlappingEnd;
        let overlappingStart;
        if (budget.yearMonth === this.startDate.format('YYYYMM')) {
            overlappingEnd = budget.lastDay();
            overlappingStart = this.startDate;
        } else if (budget.yearMonth === this.endDate.format('YYYYMM')) {
            overlappingStart = budget.firstDay();
            overlappingEnd = this.endDate;
        } else {
            overlappingStart = budget.firstDay();
            overlappingEnd = budget.lastDay();
        }
        return overlappingEnd.diff(overlappingStart, 'day') + 1;
    }

}

module.exports = Period;