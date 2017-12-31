// TODO: These values need to be re-calculated based on the strenght of Harvester bodies
// Assuming 5 WORK parts and 1 CARRY part, it takes 5 ticks to fill a Carrier
const HARVESTER_MINING_TIME = 5;
// Current harvester path cost on roads is 1/2 (empty/full). Overall cost of traversing in both states once is 3.
const HARVESTER_TILE_COST = 2;
// TODO: Hard-coding this since the room inits with 1500 capacity. Once claimed, it increases to 3000. This won't be an issue until Source Keeper or remote harvesting is implemented.
const SOURCE_ENERGY_CAPACITY = 3000;

var aiRoomSurveyor = {
    run: function (room) {
        // TODO: Once the AI is able to generate multiple spawns per room, this may need to be updated
        let spawn = room.find(FIND_MY_SPAWNS)[0];

        cacheRoomSources(room, spawn);

        return spawn;
    }
}

function cacheRoomSources(room, spawn) {
    // init Room memory if it doesn't exist
    let roomMemory = Memory.rooms;
    if (roomMemory === undefined)
        Memory.rooms = {};

    let memory = Memory.rooms[room.name];
    if (memory === undefined) {
        memory = { sources: room.find(FIND_SOURCES_ACTIVE), controller: room.controller };

        // Iterate over all Sources in the room, assigning a direct path from them to the Spawner as we go
        for (let i in memory.sources) {
            let source = memory.sources[i];

            // Set path from Source to Spawn
            if (spawn !== undefined) {
                source.pathToSpawn = PathFinder.search(
                    new RoomPosition(source.pos.x, source.pos.y, source.pos.roomName)
                    , new RoomPosition(spawn.pos.x, spawn.pos.y, spawn.pos.roomName)
                    , { swampCost: 1, plainCost: 1 })
                    .path;

                // Set Carrier capacity based on distance from Source to Spawn
                source.carrierCapacity = Math.floor((source.pathToSpawn.length * HARVESTER_TILE_COST) / HARVESTER_MINING_TIME);
                // Set the amount of WORK body parts that are needed to optimally drop-harvest this Source
                source.optimalWorkBody = (SOURCE_ENERGY_CAPACITY / ENERGY_REGEN_TIME) / 2;
            }

            // Set Harvester capacity (number of open tiles)
            source.harvestingLocations = global.Utilities.findAvailableHarvestingLocations(memory.sources[i]);
            source.harvesterCapacity = Math.min(source.harvestingLocations.length, Math.ceil(source.optimalWorkBody / 2));
        }

        // Set path from Controller to Spawn
        if (memory.controller !== undefined && spawn !== undefined) {
            memory.controller.pathToSpawn = PathFinder.search(
                new RoomPosition(memory.controller.pos.x, memory.controller.pos.y, memory.controller.pos.roomName)
                , new RoomPosition(spawn.pos.x, spawn.pos.y, spawn.pos.roomName)
                , { swampCost: 1, plainCost: 1 })
                .path;
        }

        Memory.rooms[room.name] = memory;
    }
}

module.exports = aiRoomSurveyor;