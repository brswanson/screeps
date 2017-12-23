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

        if (currentTotalCreeps <= MAX_WORKERS && RoomAvailableEnergy >= PayloadCost && !spawn.spawning) {
            var creepName = 'Creep_' + Utilities.newGuid();
            var success = spawn.spawnCreep(PayloadWorker, creepName);

            if (success >= 0)
                console.log('[' + room.name + '] spawned creep [' + currentTotalCreeps + '/' + MAX_WORKERS + '] ' + creepName);
            else
                console.log('[' + room.name + '] FAILED to spawn  creep [' + currentTotalCreeps + '/' + MAX_WORKERS + '] ' + creepName);
        }
    }
}

module.exports = aiSpawner;