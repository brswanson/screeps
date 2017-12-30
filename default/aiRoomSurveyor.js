/*
Number of tiles needed to justify the allocation of an additional harvester.
Factors to consider:
    a) travel distance time
    b) mining speed
Calculation: Math.floor(TRAVEL_TICKS / HARVESTING_RATE )
    Example: Takes 30 ticks for a round trip. Takes 13 ticks to harvest.
    MIN(30 / 13) -> 2. In the time it takes for one harvester to leave and return, at least two other harvesters can finish mining.
TODO: This leaves some 'wasted' time where a harvester could be mining.
TODO: Maximum potential energy harvested in a span of time is also ignored here. The typical pace is 3k/300 (ENERGY_REGEN_TIME constant for regen time).
*/
// Current harvester path cost on roads is 1/2 (empty/full). Overall cost of traversing in both states once is 3.
const HARVESTER_MINING_TIME = 13;
const HARVESTER_TILE_COST = 3;

var aiRoomSurveyor = {
    run: function (room) {
        // TODO: Once the AI is able to generate multiple spawns per room, this will need to be updated
        var spawn = room.find(FIND_MY_SPAWNS)[0];

        cacheRoomSources(room, spawn);

        return spawn;
    }
}

function cacheRoomSources(room, spawn) {
    var memory = Memory.rooms[room.name];

    if (memory === undefined) {
        memory = { sources: room.find(FIND_SOURCES_ACTIVE), controller: room.controller };

        // Iterate over all Sources in the room, assigning a direct path from them to the Spawner as we go
        for (var i in memory.sources) {
            var source = memory.sources[i];

            // Set harvester capacity (number of open tiles)
            source.harvestingLocations = global.Utilities.findAvailableHarvestingLocations(memory.sources[i]);
            source.capacity = source.harvestingLocations.length;

            // Set path from Source to Spawn
            if (spawn !== undefined) {
                source.pathToSpawn = PathFinder.search(
                    new RoomPosition(source.pos.x, source.pos.y, source.pos.roomName)
                    , new RoomPosition(spawn.pos.x, spawn.pos.y, spawn.pos.roomName)
                    , { swampCost: 1, plainCost: 1 })
                    .path;

                // Allocate additional harvester capacity based on distance from source to spawn
                // TODO: This code will need to be tweaked once energy containers are incorporated. Right now, harvesters deliver to the nearest Spawner or Extension.
                source.capacity += Math.floor((source.pathToSpawn.length * HARVESTER_TILE_COST) / HARVESTER_MINING_TIME);
            }
        }

        // Set path from Controller to Spawn
        if (memory.controller !== undefined) {
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