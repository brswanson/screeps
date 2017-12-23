var aiSpawner = {
    run: function (room, spawn, max) {
        const Utilities = require('utilities');

        const MAX_WORKERS = max;
        const PayloadWorker = [WORK, CARRY, MOVE, MOVE];
        const PayloadCost = Utilities.creepCost(PayloadWorker);
        const RoomAvailableEnergy = room.energyAvailable;

        // Gather all creeps in the current room
        var CREEPS = room.find(FIND_MY_CREEPS);
        var currentTotalCreeps = Utilities.hashTotal(CREEPS);

        if (currentTotalCreeps <= MAX_WORKERS && RoomAvailableEnergy >= PayloadCost) {
            var creepName = 'Creep_' + Utilities.newGuid();
            spawn.spawnCreep(PayloadWorker, creepName);

            console.log('[' + room.name + '] spawned creep [' + currentTotalCreeps + '/' + MAX_WORKERS + '] ' + creepName)
        }
    }
}

module.exports = aiSpawner;