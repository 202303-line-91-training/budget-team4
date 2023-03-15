class Period {
    startDate;
    endDate;

    constructor(startDate, endDate) {
        this.startDate = startDate;
        this.endDate = endDate;
    }

    overlappingDays(budget, anotherPeriod) {
        let overlappingEnd = this.endDate.isBefore(anotherPeriod.endDate)
            ? this.endDate
            : anotherPeriod.endDate;
        let overlappingStart = this.startDate.isAfter(anotherPeriod.startDate)
            ? this.startDate
            : anotherPeriod.startDate;
        return overlappingEnd.diff(overlappingStart, 'day') + 1;
    }

}

module.exports = Period;