const Role = require('roleHarvester');
const RoleName = global.RoleHarveser;
const RoleSymbol = '⛏';

var aiRoleHarvester = {
    run: function (room) {
        // Gather all creeps in the current room without a job or applied to this job
        var creeps = room.find(FIND_MY_CREEPS, {
            filter: function (s) { return s.memory.class === global.ClassCivilain && s.memory.job === RoleName }
        });

        // Cache the current room's sources then return them ordered by distance to the room's spawn.
        // TODO: Pull sources from memory instead of room.find(). Right now, Harvesters won't harvest from the sources in memory.
        var roomSources = getRoomCache(room).sources.sort(function (a, b) { return (b.pathToSpawn.length < a.pathToSpawn.length) });
        var sources = room.find(FIND_SOURCES_ACTIVE);
        var maxMiners = 0;

        // Update current worker counts for all sources
        for (var s in roomSources) {
            roomSources[s].capacityUsed = creeps.filter(c => c.memory.sourceId === roomSources[s].id).length;
            maxMiners += roomSources[s].capacity;
        }

        // Assign source ids to unassigned creeps
        var unassignedCreeps = creeps.filter(c => c.memory.sourceId === undefined);
        for (var c in unassignedCreeps) {
            var creep = unassignedCreeps[c];

            for (var s in roomSources) {
                var source = roomSources[s];

                if (source.capacityUsed < source.capacity) {
                    creep.memory.sourceId = roomSources[s].id;
                    source.capacityUsed += 1;

                    break;
                }
            }
        }

        // Execute harvester job for all creeps against their assigned source if it exists
        var assignedCreeps = creeps.filter(c => c.memory.sourceId !== undefined);
        for (var c in assignedCreeps) {
            var creep = assignedCreeps[c];
            var source = sources.find(s => s.id === creep.memory.sourceId);

            assignRole(creep, source);
        }

        return maxMiners;
    }
}

function assignRole(creep, source) {
    Role.run(creep, source);

    if (global.Debug)
        creep.say(RoleSymbol);
}

function getRoomCache(room) {
    return Memory.rooms[room.name];
}

module.exports = aiRoleHarvester;