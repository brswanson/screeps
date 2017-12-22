module.exports.loop = function () {
    const CREEP_SPAWN_COST = 300;
    const MAX_ROOM_CREEPS = 14;
    const MAX_ROOM_CREEP_MINERS = 7;

    const Utilities = require('utilities');
    const RoleBuilder = require('roleBuilder');
    const RoleHarvester = require('roleHarvester');
    const RoleUpgrader = require('roleUpgrader');

    // TODO: Should create a function for evaluating payload cost
    const PayloadWorker = [WORK, WORK, CARRY, MOVE];

    var spawn1 = Game.spawns['Spawn1'];
    var creepCount = 0;

    for (var i in Game.creeps) {
        if (creepCount >= MAX_ROOM_CREEP_MINERS) {
            if (creepCount % 2 == 0)
                RoleUpgrader.run(Game.creeps[i]);
            else
                RoleBuilder.run(Game.creeps[i]);
        }
        else
            RoleHarvester.run(Game.creeps[i], Game.spawns['Spawn1']);

        creepCount++;
    }

    if (creepCount <= MAX_ROOM_CREEPS && spawn1.energy >= CREEP_SPAWN_COST) {
        console.log('Attempting to spawn creep: [' + creepCount + ']')

        var creepName = 'Harvester_' + Utilities.newGuid();
        spawn1.spawnCreep(PayloadWorker, creepName);

        console.log('Creep spawned: [' + creepName + ']')
    }
}

function isEnergyMax(spawn) {
    return spawn.energy == spawn.energyCapacity;
}

// http://docs.screeps.com/global-objects.html
// http://docs.screeps.com/api/#Memory