const Role = require('roleHarvester');
const RoleName = 'harvester';
const RoleSymbol = '⛏';

var aiRoleHarvester = {
    run: function (room, max) {
        // Gather all creeps in the current room without a job
        var creeps = room.find(FIND_MY_CREEPS, {
            filter: function (s) { return s.memory.class === global.ClassCivilain && (s.memory.job === RoleName || s.memory.job === undefined) }
        });

        // TODO: Intelligently assign creeps according to the specifications of the room. Currently they select sources and destinations on their own.
        assignRoles(creeps, max);
    }
}

function assignRoles(creeps, max) {
    var creepCount = 0;
    for (var i in creeps) {
        var creep = creeps[i];

        if (creepCount >= max) {
            if (creep.memory.job === RoleName) {
                global.Utilities.unemploy(creep);
            }

            continue;
        }

        Role.run(creep);

        if (global.Debug)
            creep.say(RoleSymbol);

        creepCount++;
    }

    // console.log('[' + room.name + '] ' + creepCount + '/' + MAX_WORKERS + ' active ' + RoleName);
}

module.exports = aiRoleHarvester;