const Role = require('roleCarrier');
const RoleName = global.RoleCarrier;
const RoleSymbol = '🛒';

var aiRoleCarrier = {
    run: function (room) {
        // Gather all creeps in the current room applied to this job
        let creeps = room.find(FIND_MY_CREEPS, {
            filter: function (s) { return s.memory.class === global.ClassCivilain && s.memory.job === RoleName }
        });

        // Cache the current room's Sources then return them ordered by distance to the room's Spawner
        let roomSources = getRoomCache(room).sources.sort(function (a, b) { return (b.pathToSpawn.length < a.pathToSpawn.length) });
        let maxCarriers = 0;

        // Count the already assigned Carriers on each source
        for (let s in roomSources) {
            roomSources[s].capacityUsed = creeps.filter(c => c.memory.sourceId === roomSources[s].id).length;
            // TODO: maxCarriers may need to be re-calculated. We have a constant drop Harvester running now instead of each Creep harvesting its own Energy
            maxCarriers += roomSources[s].capacity;
        }

        // Assign Source IDs to unassigned Creeps
        let unassignedCreeps = creeps.filter(c => c.memory.sourceId === undefined);
        for (let c in unassignedCreeps) {
            let creep = unassignedCreeps[c];

            for (let s in roomSources) {
                let source = roomSources[s];

                if (source.capacityUsed < source.capacity) {
                    creep.memory.sourceId = source.id;
                    creep.memory.source = source;
                    source.capacityUsed += 1;

                    break;
                }
            }
        }

        // Execute harvester job for all creeps against their assigned source if it exists
        let assignedCreeps = creeps.filter(c => c.memory.sourceId !== undefined);
        for (let c in assignedCreeps) {
            let creep = assignedCreeps[c];

            assignRole(creep, creep.memory.source);
        }

        return maxCarriers;
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

module.exports = aiRoleCarrier;