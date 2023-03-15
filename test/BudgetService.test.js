const BudgetService = require('../src/BudgetService');

describe('Budget Service', function () {
    let budgetService;
    beforeEach(() => {
        budgetService = new BudgetService();
    });
    it('should return 0 when invalid date', function () {
        const result = budgetService.query('20230302', '20230301');
        expect(result).toBe(0);
    });

    it('should return 0 when budget data is empty', function () {
        const result = budgetService.query('20230401', '20230402');
        expect(result).toBe(0);
    });

    it('should return 310', function () {
        const result = budgetService.query('20230101', '20230131');
        expect(result).toBe(310);
    });

    it('cross 2 months', function () {
        const result = budgetService.query('20230131', '20230202');
        expect(result).toBe(50);
    });

    it('cross 3 months', function () {
        const result = budgetService.query('20230131', '20230302');
        expect(result).toBe(560 + 10 + 60);
    });
});