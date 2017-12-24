const Role = require('roleHarvesterAssigned');
const RoleName = 'harvester';
const RoleSymbol = '⛏';

var aiRoleHarvesterAssigned = {
    run: function (room) {
        // Gather all creeps in the current room without a job or applied to this job
        var creeps = room.find(FIND_MY_CREEPS, {
            filter: function (s) { return s.memory.class === global.ClassCivilain && (s.memory.job === RoleName || s.memory.job === undefined) }
        });

        // Cache the current room's sources then return them
        var roomSources = cacheRoomSources(room);
        var sources = room.find(FIND_SOURCES_ACTIVE);

        // Update current worker counts for all sources
        for (var s in roomSources) {
            roomSources[s].capacityUsed = creeps.filter(c => c.memory.sourceId === roomSources[s].id).length;
            // console.log('Capacity: ' + roomSources[s].capacityUsed + '/' + roomSources[s].capacity);
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
    }
}

function assignRole(creep, source) {
    Role.run(creep, source);

    if (global.Debug)
        creep.say(RoleSymbol);

    // console.log('[' + room.name + '] ' + creepCount + '/' + MAX_WORKERS + ' active ' + RoleName);
}

function cacheRoomSources(room) {
    var memory = Memory.rooms[room.name];

    if (memory.sources === undefined) {
        memory.sources = room.find(FIND_SOURCES_ACTIVE);

        for (var i in memory.sources) {
            memory.sources[i].capacity = global.Utilities.findAvailableMiningLocations(memory.sources[i]).length;
        }
    }

    return memory.sources;
}

module.exports = aiRoleHarvesterAssigned;