const Role = require('roleBuilder');
const RoleName = global.RoleBuilder;
const RoleSymbol = '🔨';

var aiRoleBuilder = {
    run: function (room) {
        // Gather all creeps in the current room applied to this job
        let creeps = room.find(FIND_MY_CREEPS, {
            filter: function (s) { return s.memory.class === global.ClassCivilain && s.memory.job === RoleName }
        });

        assignRoles(creeps);
    }
}

function assignRoles(creeps) {
    for (let i in creeps) {
        let creep = creeps[i];

        Role.run(creep);

        if (global.Debug)
            creep.say(RoleSymbol);
    }
}

module.exports = aiRoleBuilder;