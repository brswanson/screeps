var aiRoleUpgrader = {
    run: function (room, max) {
        const Utilities = require('utilities');
        const Role = require('roleUpgrader');
        const RoleName = 'upgrader';

        const MAX_WORKERS = max;

        // Gather all creeps in the current room without a job
        var CREEPS = room.find(FIND_MY_CREEPS, {
            filter: function (s) { return s.memory.job === RoleName || s.memory.job === undefined }
        });

        // TODO: Intelligently assign creeps according to the specifications of the room. Currently they select sources and destinations on their own.
        var creepCount = 0;
        for (var i in CREEPS) {
            var creep = CREEPS[i];
            
            if (creepCount >= MAX_WORKERS) {
                if (creep.memory.job === RoleName) {
                    Utilities.unemploy(creep);
                }

                continue;
            }

            Role.run(creep);

            if (global.Debug)
                creep.say('u');

            creepCount++;
        }
        
        // console.log('[' + room.name + '] ' + creepCount + '/' + MAX_WORKERS + ' active ' + RoleName);
    }
}

module.exports = aiRoleUpgrader;