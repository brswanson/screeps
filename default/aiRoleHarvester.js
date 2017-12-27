const Role = require('roleHarvester');
const RoleName = global.RoleHarveser;
const RoleSymbol = '⛏';

var aiRoleHarvester = {
    run: function (room) {
        // Gather all creeps in the current room without a job or applied to this job
        var creeps = room.find(FIND_MY_CREEPS, {
            filter: function (s) { return s.memory.class === global.ClassCivilain && s.memory.job === RoleName }
        });

        assignRoles(creeps);
    }
}

function assignRoles(creeps) {
    var creepCount = 0;
    for (var i in creeps) {
        var creep = creeps[i];

        Role.run(creep);

        if (global.Debug)
            creep.say(RoleSymbol);

        creepCount++;
    }
}

module.exports = aiRoleHarvester;