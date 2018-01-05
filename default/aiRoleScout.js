const Role = require('roleScout');
const RoleName = global.RoleScout;
const RoleSymbol = '🔭';

var aiRoleScout = {
    run: function (room) {
        // Gather all creeps in the current room applied to this job
        let creeps = room.find(FIND_MY_CREEPS, {
            filter: function (s) { return s.memory.class === global.ClassWarrior && s.memory.job === RoleScout }
        });

        assignRoles(creeps);
    }
}

function assignRoles(creeps, target) {
    for (let i in creeps) {
        let creep = creeps[i];

        Role.run(creep);

        if (global.Debug)
            creep.say(RoleSymbol);
    }
}

module.exports = aiRoleScout;