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
        return overlappingEnd.diff(overlappingStart, 'day') + 1;
    }

}

module.exports = Period;