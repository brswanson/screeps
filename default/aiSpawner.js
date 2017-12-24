var aiSpawner = {
    run: function (room, spawn, maxCivilains, maxWarriors) {
        const Utilities = require('utilities');

        const PayloadWorker = [WORK, CARRY, MOVE, MOVE];
        const PayloadWarrior = [ATTACK, MOVE];
        const PayloadWorkerCost = Utilities.creepCost(PayloadWorker);
        const PayloadWarriorCost = Utilities.creepCost(PayloadWarrior);
        const RoomAvailableEnergy = room.energyAvailable;

        var creeps = room.find(FIND_MY_CREEPS);
        var totalCivilains = Utilities.hashLength(creeps.filter(creep => creep.memory.class === global.ClassCivilain));
        var totalWarriors = Utilities.hashLength(creeps.filter(creep => creep.memory.class === global.ClassWarrior));

        if (totalCivilains <= maxCivilains && RoomAvailableEnergy >= PayloadWorkerCost && !spawn.spawning) {
            var creepName = 'Creep_' + Utilities.newGuid();
            var success = spawn.spawnCreep(PayloadWorker, creepName, { memory: { class: global.ClassCivilain } });

            if (success >= 0) {
                console.log('[' + room.name + '] spawned ' + global.ClassCivilain + ' creep [' + totalCivilains + '/' + maxCivilains + '] ' + creepName);
            }
            else {
                console.log('[' + room.name + '] FAILED to spawn ' + global.ClassCivilain + ' creep [' + totalCivilains + '/' + maxCivilains + '] ' + creepName);
            }
        }
        
        // Always attempting to spawn civilains before warriors
        if (totalCivilains >= maxCivilains && totalWarriors <= maxWarriors && RoomAvailableEnergy >= PayloadWarriorCost && !spawn.spawning) {
            var creepName = 'Creep_' + Utilities.newGuid();
            var success = spawn.spawnCreep(PayloadWarrior, creepName, { memory: { class: global.ClassWarrior } });

            if (success >= 0) {
                console.log('[' + room.name + '] spawned ' + global.ClassWarrior + ' creep [' + totalWarriors + '/' + maxWarriors + '] ' + creepName);
            }
            else {
                console.log('[' + room.name + '] FAILED to spawn ' + global.ClassWarrior + ' creep [' + totalWarriors + '/' + maxWarriors + '] ' + creepName);
            }
        }
    }
}

module.exports = aiSpawner;