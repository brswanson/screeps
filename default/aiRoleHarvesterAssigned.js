const Role = require('roleHarvesterAssigned');
const RoleName = 'harvester';
const RoleSymbol = '⛏';

var aiRoleHarvesterAssigned = {
    run: function (room) {
        // Gather all creeps in the current room without a job
        var creeps = room.find(FIND_MY_CREEPS, {
            filter: function (s) { return s.memory.job === RoleName || s.memory.job === undefined }
        });

        // TODO: Allocate creeps such that dying creeps do not disrupt or shuffle the allocation of existing creeps
        var sources = room.find(FIND_SOURCES_ACTIVE);
        var sourceMax = global.Utilities.hashLength(sources) - 1;
        var sourceIndex = 0;
        var creepCount = 0;

        for (var i in creeps) {
            // TODO: Cache this in memory instead of calculating it each run
            var harvestingSites = global.Utilities.findAvailableMiningLocations(sources[sourceIndex]).length;

            if (creepCount === harvestingSites) {
                sourceIndex++;
                creepCount = 0;
            }
            if (sourceIndex >= sourceMax)
                break;

            assignRole(creeps[i], sources[sourceIndex]);
            creepCount++;
        }
    }
}
function assignRole(creep, source) {
    Role.run(creep, source);

    if (global.Debug)
        creep.say(RoleSymbol);

    // console.log('[' + room.name + '] ' + creepCount + '/' + MAX_WORKERS + ' active ' + RoleName);
}

module.exports = aiRoleHarvesterAssigned;