const Role = require('roleHarvesterDrop');
const RoleName = global.RoleHarvester;
const RoleSymbol = '⛏';

var aiRoleHarvester = {
    run: function (room) {
        // Gather all creeps in the current room applied to this job
        let creeps = room.find(FIND_MY_CREEPS, {
            filter: function (s) { return s.memory.class === global.ClassCivilain && s.memory.job === RoleName }
        });

        // Cache the current room's Sources then return them ordered by distance to the room's Spawner
        let roomSources = getRoomCache(room).sources.sort(function (a, b) { return (b.pathToSpawn.length < a.pathToSpawn.length) });
        let maxHarvesters = 0;

        // Set the Harvester max to one for each Source
        for (let s in roomSources) {
            roomSources[s].capacityUsed = creeps.filter(c => c.memory.sourceId === roomSources[s].id).length;
            maxHarvesters++;
        }

        // Assign Source IDs to unassigned Creeps
        let unassignedCreeps = creeps.filter(c => c.memory.sourceId === undefined);
        for (let c in unassignedCreeps) {
            let creep = unassignedCreeps[c];
            // TODO: Should allocate the amount of WORK parts needed to fully harvest a Source before each refresh
            // let creepWorkBodyCount = creep.body.filter(c => c.type === WORK).length;

            for (let s in roomSources) {
                let source = roomSources[s];

                if (source.capacityUsed < 1) {
                    creep.memory.sourceId = roomSources[s].id;
                    source.capacityUsed += 1;

                    break;
                }
            }
        }

        // Execute harvester job for all creeps against their assigned source if it exists
        let assignedCreeps = creeps.filter(c => c.memory.sourceId !== undefined);
        for (let c in assignedCreeps) {
            let creep = assignedCreeps[c];
            let source = Game.getObjectById(creep.memory.sourceId);

            assignRole(creep, source);
        }

        return maxHarvesters;
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