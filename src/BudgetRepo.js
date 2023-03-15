const Budget = require("./Budget");

class BudgetRepo {

    getAll() {
        return [
            new Budget('202302', 560)
            , new Budget('202301', 310)
            , new Budget('202303', 930)];
    }
}

module.exports = BudgetRepo;