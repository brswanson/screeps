var garbageCollector = {
    run: function (memory, game) {
        const Utilities = require('utilities');

        // Garbage collecting dead/unused creeps in memory
        if (Utilities.hashTotal(memory.creeps) > Utilities.hashTotal(game.creeps)) {
            for (var i in memory.creeps) {
                if (!game.creeps[i]) {
                    delete memory.creeps[i];
                }
            }
        }
    }
}

module.exports = garbageCollector;