const Role = require('roleWarrior');
const RoleName = global.RoleWarrior;
const RoleSymbol = '⚔';

var aiRoleWarrior = {
    run: function (room, target) {
        // Gather all creeps in the current room applied to this job
        let creeps = room.find(FIND_MY_CREEPS, {
            filter: function (s) { return s.memory.class === global.ClassWarrior && s.memory.job === RoleName }
        });

        assignRoles(creeps, target);
    }
}

function assignRoles(creeps, target) {
    for (let i in creeps) {
        let creep = creeps[i];

        Role.run(creep, target);

        // Disabled to allow clearer vision during battles
        // if (global.Debug)
        //     creep.say(RoleSymbol);
    }
}

module.exports = aiRoleWarrior;