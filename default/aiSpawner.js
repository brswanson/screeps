var aiSpawner = {
    run: function (room, spawn, maxHarvesters, maxBuilders, maxUpgraders, maxWarriors) {
        const PayloadHarvester = [WORK, WORK, MOVE, CARRY]; // 300 cost, 400 hits
        const PayloadBuilder = [MOVE, WORK, MOVE, CARRY, CARRY]; // 300 cost, 500 hits
        const PayloadUpgrader = [MOVE, WORK, MOVE, CARRY, CARRY]; // 300 cost, 500 hits
        const PayloadWarrior = [TOUGH, MOVE, MOVE, ATTACK]; // 190 cost, 400 hits

        var creeps = room.find(FIND_MY_CREEPS);
        // TODO: Could create an object of role to count instead of calling this four times.
        var totalHarvesters = global.Utilities.hashLength(creeps.filter(creep => creep.memory.class === global.ClassCivilain && creep.memory.job === global.RoleHarveser)) + 1;
        var totalBuilders = global.Utilities.hashLength(creeps.filter(creep => creep.memory.class === global.ClassCivilain && creep.memory.job === global.RoleBuilder)) + 1;
        var totalUpgraders = global.Utilities.hashLength(creeps.filter(creep => creep.memory.class === global.ClassCivilain && creep.memory.job === global.RoleUpgrader)) + 1;
        var totalWarriors = global.Utilities.hashLength(creeps.filter(creep => creep.memory.class === global.ClassWarrior && creep.memory.job === global.RoleWarrior)) + 1;

        // Miners
        if (totalHarvesters <= maxHarvesters) {
            spawnCreepWithProperties(totalHarvesters, maxHarvesters, PayloadHarvester, global.ClassCivilain, global.RoleHarveser, room, spawn);
        }
        // Builders
        else if (totalBuilders <= maxBuilders) {
            spawnCreepWithProperties(totalBuilders, maxBuilders, PayloadBuilder, global.ClassCivilain, global.RoleBuilder, room, spawn);
        }
        // Upgraders
        else if (totalUpgraders <= maxUpgraders) {
            spawnCreepWithProperties(totalUpgraders, maxUpgraders, PayloadUpgrader, global.ClassCivilain, global.RoleUpgrader, room, spawn);
        }
        // Warriors
        else if (totalWarriors <= maxWarriors) {
            spawnCreepWithProperties(totalWarriors, maxWarriors, PayloadWarrior, global.ClassWarrior, global.RoleWarrior, room, spawn);
        }
    }
}

function spawnCreepWithProperties(total, max, payload, className, roleName, room, spawn) {
    if (total <= max) {
        // Dynamically upgrade the passed in payload by duplicating it as much as the room's energy capacity can support
        var payloadCost = global.Utilities.creepCost(payload);
        var maxPayloadCopies = Math.floor(room.energyCapacityAvailable / payloadCost);
        payloadCost *= maxPayloadCopies;

        if (room.energyAvailable >= payloadCost && !spawn.spawning) {
            // Re-build the payload as needed
            if (maxPayloadCopies > 1)
                for (var i = 0; i < maxPayloadCopies; i++)
                    payload.push.apply(payload, payload.splice(0));

            var creepName = room.name + '_' + roleName + '_' + global.Utilities.newGuid();
            var success = spawn.spawnCreep(payload, creepName, { memory: { class: className, job: roleName } });

            if (success >= 0)
                console.log('[' + room.name + '] spawned ' + className + ' creep [' + total + '/' + max + '] ' + creepName);
            else
                console.log('[' + room.name + '] FAILED to spawn ' + className + ' creep [' + total + '/' + max + '] ' + creepName);
        }
    }
}

module.exports = aiSpawner;