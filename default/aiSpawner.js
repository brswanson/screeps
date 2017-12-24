var aiSpawner = {
    run: function (room, spawn, max) {
        const Utilities = require('utilities');

        const PayloadWorker = [WORK, CARRY, MOVE, MOVE];
        const PayloadCost = Utilities.creepCost(PayloadWorker);
        const RoomAvailableEnergy = room.energyAvailable;

        // Gather all creeps in the current room
        var CREEPS = room.find(FIND_MY_CREEPS);
        var currentTotalCreeps = Utilities.hashLength(CREEPS);

        if (currentTotalCreeps <= max && RoomAvailableEnergy >= PayloadCost && !spawn.spawning) {
            var creepName = 'Creep_' + Utilities.newGuid();
            var success = spawn.spawnCreep(PayloadWorker, creepName);

            if (success >= 0) {
                console.log('[' + room.name + '] spawned creep [' + currentTotalCreeps + '/' + max + '] ' + creepName);
            }
            else {
                console.log('[' + room.name + '] FAILED to spawn  creep [' + currentTotalCreeps + '/' + max + '] ' + creepName);
            }
        }
    }
}

module.exports = aiSpawner;