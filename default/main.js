module.exports.loop = function () {
    const CREEP_SPAWN_COST = 200;
    const MAX_ROOM_CREEPS = 14;
    const MAX_ROOM_CREEP_MINERS = 6;

    const Utilities = require('utilities');
    const RoleBuilder = require('roleBuilder');
    const RoleHarvester = require('roleHarvester');
    const RoleHarvester2 = require('roleHarvester2');
    const RoleUpgrader = require('roleUpgrader');

    var spawn1 = Game.spawns['Spawn1'];
    var creepCount = 0;

    for (var i in Game.creeps) {
        if (creepCount >= MAX_ROOM_CREEP_MINERS) {
            if (creepCount % 2 == 0)
                RoleUpgrader.run(Game.creeps[i]);
            else
                RoleBuilder.run(Game.creeps[i]);
        }
        else {
            if (creepCount % 2 == 0)
                RoleHarvester.run(Game.creeps[i], Game.spawns['Spawn1']);
            else
                RoleHarvester2.run(Game.creeps[i], Game.spawns['Spawn1']);
        }

        creepCount++;
    }

    if (creepCount <= MAX_ROOM_CREEPS && spawn1.energy >= CREEP_SPAWN_COST) {
        console.log('Attempting to spawn creep: [' + creepCount + ']')

        var creepName = 'Harvester_' + Utilities.newGuid();
        spawn1.spawnCreep([WORK, CARRY, MOVE], creepName);

        console.log('Creep spawned: [' + creepName + ']')
    }
}

function isEnergyMax(spawn) {
    return spawn.energy == spawn.energyCapacity;
}

// http://docs.screeps.com/global-objects.html
// http://docs.screeps.com/api/#Memory