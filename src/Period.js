class Period {
    startDate;
    endDate;

    constructor(startDate, endDate) {
        this.startDate = startDate;
        this.endDate = endDate;
    }

    overlappingDays(budget) {
        const lastDay = budget.lastDay();
        const firstDay = budget.firstDay();
        let overlappingEnd = this.endDate.isBefore(lastDay)
            ? this.endDate
            : lastDay;
        let overlappingStart = this.startDate.isAfter(firstDay)
            ? this.startDate
            : firstDay;
        return overlappingEnd.diff(overlappingStart, 'day') + 1;
    }

}

module.exports = Period;