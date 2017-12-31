var garbageCollector = {
    run: function (memory, game) {
        const Utilities = require('utilities');

        // Garbage collecting dead/unused creeps in memory
        if (Utilities.hashLength(memory.creeps) > Utilities.hashLength(game.creeps)) {
            for (let i in memory.creeps) {
                if (!game.creeps[i]) {
                    delete memory.creeps[i];
                }
            }
        }
    }
}

module.exports = garbageCollector;