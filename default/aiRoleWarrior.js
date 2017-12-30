const Role = require('roleWarrior');
const RoleName = global.RoleWarrior;
const RoleSymbol = '⚔';

var aiRoleWarrior = {
    run: function (room, target) {
        // Gather all creeps in the current room without a job or applied to this job
        var creeps = room.find(FIND_MY_CREEPS, {
            filter: function (s) { return s.memory.class === global.ClassWarrior && s.memory.job === RoleName }
        });

        assignRoles(creeps, target);
    }
}

function assignRoles(creeps, target) {
    var creepCount = 0;
    for (var i in creeps) {
        var creep = creeps[i];

        Role.run(creep, target);

        // Disabled to allow clearer vision during battles
        // if (global.Debug)
        //     creep.say(RoleSymbol);

        creepCount++;
    }
}

module.exports = aiRoleWarrior;