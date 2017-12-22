module.exports.loop = function () {
    const CREEP_SPAWN_COST = 500;
    const MAX_ROOM_CREEPS = 12;
    const MAX_ROOM_CREEP_MINERS = 6;
    // TODO: Handle the current room dynamically. Only works when hardcoded to one room you're operating in.
    const ROOM_NAME = 'W5N8';

    // TODO: Should create a function for evaluating payload cost
    const PayloadWorker = [WORK, WORK, WORK, MOVE, CARRY, CARRY, CARRY];

    const Utilities = require('utilities');
    const RoleBuilder = require('roleBuilder');
    const RoleHarvester = require('roleHarvester');
    const RoleUpgrader = require('roleUpgrader');

    var MEMORY = Game.Memory;
    var CREEPS = Game.creeps;
    // TODO: Should get this programatically
    var SPAWN = Game.spawns['Spawn1'];

    // cull(CREEPS, PayloadWorker.length);

    var creepCount = 0;
    for (var i in CREEPS) {
        var creep = CREEPS[i];

        var constructionTargetsExist = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);

        if (creepCount < MAX_ROOM_CREEP_MINERS) {
            RoleHarvester.run(creep, SPAWN);
        }
        else {
            if (!constructionTargetsExist || creepCount % 2 == 0)
                RoleUpgrader.run(creep);
            else if (constructionTargetsExist)
                RoleBuilder.run(creep);
        }

        // Default to harvesting if no job is assigned
        if (creep.memory.job === undefined) {
            console.log('Assigning to default role');
            RoleHarvester.run(creep, SPAWN);
        }

        creepCount++;
    }

    if (creepTotal(CREEPS) <= MAX_ROOM_CREEPS && roomEnergyAvailable(ROOM_NAME) >= CREEP_SPAWN_COST) {
        console.log('Attempting to spawn creep: [' + creepTotal(CREEPS) + '/' + MAX_ROOM_CREEPS + ']')

        var creepName = 'Harvester_' + Utilities.newGuid();
        SPAWN.spawnCreep(PayloadWorker, creepName);

        console.log(SPAWN.name + ' spawned: [' + creepName + ']')
    }

    // Garbage collecting dead/unused creeps in memory
    for(var i in Memory.creeps) {
        if(!Game.creeps[i]) {
            delete Memory.creeps[i];
        }
    }
}

function creepTotal(creepHash) {
    return Object.keys(creepHash).length + 1;
}

function roomEnergyAvailable(room) {
    return Game.rooms[room].energyAvailable;
}

function isEnergyMax(spawn) {
    return spawn.energy === spawn.energyCapacity;
}

function cull(creeps, minParts) {
    for (var i in creeps) {
        if (creeps[i].body.length < minParts) {
            console.log(creeps[i].name + ': Goodbye o7');
            creeps[i].suicide();
        }
    }
}